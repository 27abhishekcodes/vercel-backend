const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartcontroller");
const authMiddleware = require("../middlewares/auth.Middleware");

router.post("/add", authMiddleware, cartController.addToCart);
router.get("/", authMiddleware, cartController.getCart);
router.put("/update", authMiddleware, cartController.updateCartItem);
router.delete("/remove/:productId", authMiddleware, cartController.removeFromCart);
router.delete("/clear", authMiddleware, cartController.clearCart);

module.exports = router;