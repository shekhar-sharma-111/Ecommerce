const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productName: {
    type: String,
    // required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity cannot be less than 1."],
  },
  itemPrice: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  items: [orderItemSchema],
  shippingPrice: {
    type: Number,
    required: true,
    default: 30,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },

},
{ timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = {Order};
