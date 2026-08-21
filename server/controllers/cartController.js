const Cart = require("../models/Cart");
const Product = require("../models/Product");

async function getOrCreateCart(buyerId) {
  let cart = await Cart.findOne({ buyer: buyerId });
  if (!cart) cart = await Cart.create({ buyer: buyerId, items: [] });
  return cart;
}

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ buyer: req.user.id }).populate("items.product");
    res.json(cart || { buyer: req.user.id, items: [] });
  } catch (err) {
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId) return res.status(400).json({ message: "productId is required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const cart = await getOrCreateCart(req.user.id);
    const existingItem = cart.items.find((i) => i.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({ product: productId, quantity: quantity || 1 });
    }
    await cart.save();
    const populated = await cart.populate("items.product");
    res.json(populated);
  } catch (err) {
    next(err);
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ buyer: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.product.toString() !== productId);
    } else {
      item.quantity = quantity;
    }
    await cart.save();
    const populated = await cart.populate("items.product");
    res.json(populated);
  } catch (err) {
    next(err);
  }
};

exports.removeCartItem = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ buyer: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
    await cart.save();
    const populated = await cart.populate("items.product");
    res.json(populated);
  } catch (err) {
    next(err);
  }
};
