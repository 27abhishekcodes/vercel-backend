const express = require("express");
const router = express.Router();
const { createOrder ,fetchorder} = require('../controllers/ordercontroller');
const authMiddleware = require("../middlewares/auth.Middleware");

router.post("/makeorder", authMiddleware, createOrder);
router.get("/fetchorder", authMiddleware, fetchorder);

module.exports = router;