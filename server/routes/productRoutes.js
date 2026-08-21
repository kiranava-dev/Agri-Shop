const express = require("express");
const router = express.Router();
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
  searchProducts,
  getProductById,
} = require("../controllers/productController");
const { protect, requireRole } = require("../middleware/auth");
const upload = require("../middleware/upload");

// Public
router.get("/", searchProducts);
router.get("/:id", getProductById);

// Farmer only
router.post("/", protect, requireRole("farmer"), upload.array("images", 5), addProduct);
router.put("/:id", protect, requireRole("farmer"), upload.array("images", 5), updateProduct);
router.delete("/:id", protect, requireRole("farmer"), deleteProduct);
router.get("/farmer/mine", protect, requireRole("farmer"), getMyProducts);

module.exports = router;
