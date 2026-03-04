const Cart = require("../models/Cart");
const Product = require("../models/products.model");


// 🔹 Helper function to calculate total price
const calculateTotal = (items) => {
  return items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
};



// ✅ 1. ADD TO CART
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    // If cart does not exist, create one
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
      });
    }

    // Check if product already in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Product exists → increase quantity
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      // Add new product
      cart.items.push({
        product: productId,
        quantity: quantity || 1,
        price: product.price,
      });
    }

    // Recalculate total
    cart.totalPrice = calculateTotal(cart.items);

    await cart.save();

    res.status(200).json({
      message: "Product added to cart",
      cart,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ 2. VIEW CART
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ 3. UPDATE QUANTITY
exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    item.quantity = quantity;

    cart.totalPrice = calculateTotal(cart.items);

    await cart.save();

    res.status(200).json({
      message: "Cart updated",
      cart,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ 4. REMOVE ITEM FROM CART
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    cart.totalPrice = calculateTotal(cart.items);

    await cart.save();

    res.status(200).json({
      message: "Product removed",
      cart,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ 5. CLEAR CART
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();

    res.status(200).json({
      message: "Cart cleared",
      cart,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};