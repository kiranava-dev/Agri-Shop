const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getMyOrders,
  getFarmerOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, requireRole } = require("../middleware/auth");

router.post("/", protect, requireRole("buyer"), placeOrder);
router.get("/mine", protect, requireRole("buyer"), getMyOrders);
router.get("/farmer", protect, requireRole("farmer"), getFarmerOrders);
router.put("/:id/status", protect, requireRole("farmer"), updateOrderStatus);

module.exports = router;
