const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getSellerProducts,
} = require("../controllers/product.Controller");

const upload = require("../middlewares/upload.middleware");
console.log("Upload middleware:", upload);
router.route("/getproducts").get(getAllProducts);
router.route("/getsellerproducts").get(getSellerProducts);
router.route("/registerproducts").post(upload.single("image"),createProduct);

module.exports = router;