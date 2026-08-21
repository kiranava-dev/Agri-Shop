const express = require("express");
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeCartItem } = require("../controllers/cartController");
const { protect, requireRole } = require("../middleware/auth");

router.use(protect, requireRole("buyer"));

router.get("/", getCart);
router.post("/", addToCart);
router.put("/", updateCartItem);
router.delete("/:productId", removeCartItem);

module.exports = router;
