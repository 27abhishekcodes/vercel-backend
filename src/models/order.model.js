const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assumes you have a User model
    required: true,
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // assumes you have a Product model
        required: true,
      },
      name: { type: String, required: false }, // product name at time of order
      priceCents: { type: Number, required: false}, // price at purchase time
      quantity: { type: Number, required: false },
      image: { type: String }, // optional product image
    }
  ],

  shippingCostCents: { type: Number, required: true, default: 0 },
  taxCents: { type: Number, required: true, default: 0 },
  totalCostCents: { type: Number, required: true },

  paymentMethod: {
    type: String,
    enum: ['card', 'paypal', 'cod'],
    required: true,
  },

  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'completed', 'cancelled'],
    default: 'pending',
  },

  shippingAddress: {
    fullName: { type: String, required: false },
    addressLine1: { type: String, required: false },
    addressLine2: { type: String },
    city: { type: String, required: false },
    state: { type: String, required: false },
    postalCode: { type: String, required: false},
    country: { type: String, required: false},
  },

  placedAt: {
    type: Date,
    default: Date.now,
  },

  deliveredAt: Date,
}, {
  timestamps: true,
});

module.exports=  mongoose.model('Order', orderSchema);