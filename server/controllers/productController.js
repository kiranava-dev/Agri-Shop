const Product = require("../models/Product");

// Farmer: add product
exports.addProduct = async (req, res, next) => {
  try {
    const { name, category, description, price, quantity, unit, locality, shippingCharge } = req.body;
    if (!name || !category || !price || !quantity || !locality) {
      return res.status(400).json({ message: "Missing required product fields" });
    }
    const images = (req.files || []).map((f) => `/uploads/${f.filename}`);
    const product = await Product.create({
      farmer: req.user.id,
      name,
      category,
      description,
      price,
      quantity,
      unit,
      locality,
      shippingCharge: shippingCharge || 0,
      images,
    });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// Farmer: update product
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, farmer: req.user.id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const fields = ["name", "category", "description", "price", "quantity", "unit", "locality", "shippingCharge", "isActive"];
    fields.forEach((f) => {
      if (req.body[f] !== undefined) product[f] = req.body[f];
    });

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((f) => `/uploads/${f.filename}`);
      product.images.push(...newImages);
    }

    await product.save();
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Farmer: delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, farmer: req.user.id });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};

// Farmer: list own products
exports.getMyProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ farmer: req.user.id }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Public: search/browse products
exports.searchProducts = async (req, res, next) => {
  try {
    const { q, category, locality, minPrice, maxPrice } = req.query;
    const filter = { isActive: true };

    if (q) filter.$text = { $search: q };
    if (category) filter.category = category;
    if (locality) filter.locality = new RegExp(locality, "i");
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter).populate("farmer", "name locality phone").sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Public: single product details
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("farmer", "name locality phone");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
};
