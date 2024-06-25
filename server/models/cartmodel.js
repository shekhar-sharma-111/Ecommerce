const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity cannot be less than 1."],
    default: 1,
  },
  itemPrice: {
    type: Number,
    default: 0,
    required: true,
  },
});

const cartSchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,  // Include _id here
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart };
