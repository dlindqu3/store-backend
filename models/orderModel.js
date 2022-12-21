const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    // user that is the purchaser
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    customer: {
      type: String, required: false
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: false,
          ref: "Product",
        },
        quantity: { type: Number, required: false },
      },
    ],
    totalCost: {
      type: Number,
      required: false,
    },
    shippingAddress: {
      type: Object,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema)
