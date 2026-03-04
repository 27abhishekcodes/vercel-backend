//product controller this contains all the functionality for product work fetching all the products for buyer and then for seller fetching the product of it only and adding the product to it

//code starts here//
const Product = require("../models/products.model");
const cloudinary = require("../services/storage.service")

// GET PRODUCTS OF LOGGED-IN SELLER

exports.getSellerProducts = async (req, res) => {
  try {

   const sellerId = req.body.user?.id;// from token

    const products = await Product.find({ seller: sellerId });

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    }); }
};

//add a product by seller side
exports.createProduct = async (req, res) => {
  try {

    const { title, description, price, category, stock ,id} = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);
    image=result.secure_url;
    const newProduct = new Product({
      title,
      description,
      price,
      category,
      stock,
      image,
      seller: id
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//get products for logged in buyer
// GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
  try {

    const products = await Product.find()
      .populate("seller", "name"); // optional

    res.status(200).json({
      success: true,
      products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};