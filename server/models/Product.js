const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    unit: { type: String, default: "kg" },
    locality: { type: String, required: true },
    shippingCharge: { type: Number, default: 0 },
    images: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", category: "text", locality: "text" });

module.exports = mongoose.model("Product", productSchema);
