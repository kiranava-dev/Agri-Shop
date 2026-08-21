const mongoose = require("mongoose");

const shippingAddressSchema = new mongoose.Schema(
  {
    label: { type: String, default: "Home" },
    addressLine: String,
    city: String,
    state: String,
    pincode: String,
    phone: String,
  },
  { _id: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["farmer", "buyer"], required: true },
    locality: { type: String, required: true },
    walletBalance: { type: Number, default: 0 },
    shippingAddresses: [shippingAddressSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
