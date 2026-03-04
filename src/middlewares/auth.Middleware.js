
const jwt = require("jsonwebtoken");
const User = require("../models/user.model"); // adjust path if needed

const authMiddleware = async (req, res, next) => {
  try {
    // 1️⃣ Get token from header
    
    const authHeader = req.headers.authorization;
      console.log("AUTH HEADER:", authHeader); 


    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided."
      });
    }

    // 2️⃣ Extract token
    const token = authHeader.split(" ")[1];

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Find user in DB (optional but recommended)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    // 5️⃣ Attach user to request
    req.user = user;

    next(); // move to controller

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

module.exports = authMiddleware;