const User = require("../models/User");

exports.addFunds = async (req, res, next) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than 0" });
    }
    const user = await User.findById(req.user.id);
    user.walletBalance += Number(amount);
    await user.save();
    res.json({ walletBalance: user.walletBalance });
  } catch (err) {
    next(err);
  }
};

exports.addShippingAddress = async (req, res, next) => {
  try {
    const { label, addressLine, city, state, pincode, phone } = req.body;
    if (!addressLine || !city || !pincode || !phone) {
      return res.status(400).json({ message: "Missing address fields" });
    }
    const user = await User.findById(req.user.id);
    user.shippingAddresses.push({ label, addressLine, city, state, pincode, phone });
    await user.save();
    res.status(201).json(user.shippingAddresses);
  } catch (err) {
    next(err);
  }
};

exports.updateShippingAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const addr = user.shippingAddresses.id(req.params.addressId);
    if (!addr) return res.status(404).json({ message: "Address not found" });

    ["label", "addressLine", "city", "state", "pincode", "phone"].forEach((f) => {
      if (req.body[f] !== undefined) addr[f] = req.body[f];
    });

    await user.save();
    res.json(user.shippingAddresses);
  } catch (err) {
    next(err);
  }
};

exports.deleteShippingAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    user.shippingAddresses = user.shippingAddresses.filter(
      (a) => a._id.toString() !== req.params.addressId
    );
    await user.save();
    res.json(user.shippingAddresses);
  } catch (err) {
    next(err);
  }
};
