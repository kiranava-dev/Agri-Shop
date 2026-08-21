const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: String,
    price: Number,
    quantity: Number,
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    shippingAddress: {
      addressLine: String,
      city: String,
      state: String,
      pincode: String,
      phone: String,
    },
    totalAmount: { type: Number, required: true },
    shippingCharge: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["placed", "shipped", "delivered", "cancelled"],
      default: "placed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
