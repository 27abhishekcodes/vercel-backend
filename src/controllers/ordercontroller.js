// controllers/orderController.js
const  Order  = require("../models/order.model.js")
const Product = require("../models/products.model.js");

exports.createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingCostCents,
      taxCents,
      totalCostCents,
      paymentMethod,
    } = req.body;  

    // 1️⃣ Validate items exist
    if (!items || items.length === 0) {
      return res.status(400).json({
        message: 'No order items provided',
      });
    }

    // 2️⃣ Recalculate totals on server (DO NOT trust frontend)
    let calculatedProductCostCents = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.product}`,
        });
      }

      calculatedProductCostCents +=
        product.priceCents * item.quantity;
    }

    const calculatedShipping =
      calculatedProductCostCents > 5000 ? 0 : 500;

    const calculatedBeforeTax =
      calculatedProductCostCents + calculatedShipping;

    const calculatedTax = Math.round(
      calculatedBeforeTax * 0.1
    );

    const calculatedTotal =
      calculatedBeforeTax + calculatedTax;
    
    
    // 3️⃣ Optional security check
    // if (calculatedTotal !== totalCostCents) {
    //   return res.status(400).json({
    //     message: 'Order total mismatch. Please refresh cart.',
    //   });
    // }

    // 4️⃣ Create order
    // .map((item) => ({
    //     product: item.product,
    //     name: item.name,
    //     priceCents: item.priceCents,
    //     quantity: item.quantity,
    //     image: item.image,
    //   }))
    const order = new Order({
      user: req.user._id,
      items: items,
      shippingCostCents: shippingCostCents,
      taxCents: taxCents,
      totalCostCents: totalCostCents,
      paymentMethod,
      status: 'pending',
    });

    const createdOrder = await order.save();

    // 5️⃣ Send response
    res.status(201).json({
      message: 'Order created successfully',
      order: createdOrder,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error while creating order',
    });
  }
};


//fetch order function

// ✅ 2. VIEW CART
exports.fetchorder = async (req, res) => {
  try {
    const userId = req.user.id; // comes from auth middleware

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .lean();

    // Format response for frontend
    const formattedOrders = orders.map(order => ({
      id: order._id,
      placedAt: order.placedAt,
      totalCostCents: order.totalCostCents,
      status: order.status,
      items: order.items.map(item => ({
        id: item._id,
        productId: item.product,
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        priceCents: item.priceCents
      }))
    }));

    res.json(formattedOrders);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};