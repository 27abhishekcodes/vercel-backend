const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },
   
    address: {
      type: String,
      required: true,
      trim: true
    },

    role: {
      type: String,
      enum: ["buyer", "seller"],
      default: "buyer"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);