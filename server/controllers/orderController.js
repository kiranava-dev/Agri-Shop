const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

// Buyer: place order from cart (pays via wallet)
exports.placeOrder = async (req, res, next) => {
  try {
    const { shippingAddress } = req.body;
    if (!shippingAddress || !shippingAddress.addressLine) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    const cart = await Cart.findOne({ buyer: req.user.id }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;
    let shippingCharge = 0;
    const orderItems = cart.items.map((i) => {
      const lineTotal = i.product.price * i.quantity;
      totalAmount += lineTotal;
      shippingCharge += i.product.shippingCharge || 0;
      return {
        product: i.product._id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        farmer: i.product.farmer,
      };
    });

    const grandTotal = totalAmount + shippingCharge;

    const buyer = await User.findById(req.user.id);
    if (buyer.walletBalance < grandTotal) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }

    // Deduct product stock
    for (const i of cart.items) {
      if (i.product.quantity < i.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${i.product.name}` });
      }
    }
    for (const i of cart.items) {
      await Product.findByIdAndUpdate(i.product._id, { $inc: { quantity: -i.quantity } });
    }

    buyer.walletBalance -= grandTotal;
    await buyer.save();

    const order = await Order.create({
      buyer: req.user.id,
      items: orderItems,
      shippingAddress,
      totalAmount: grandTotal,
      shippingCharge,
      status: "placed",
    });

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

// Buyer: view own orders
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ buyer: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// Farmer: view orders containing their products
exports.getFarmerOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ "items.farmer": req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// Farmer: update order status
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!["placed", "shipped", "delivered", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const order = await Order.findOne({ _id: req.params.id, "items.farmer": req.user.id });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    next(err);
  }
};
