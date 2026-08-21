const express = require("express");
const router = express.Router();
const {
  addFunds,
  addShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");

router.post("/wallet/add", protect, addFunds);
router.post("/address", protect, addShippingAddress);
router.put("/address/:addressId", protect, updateShippingAddress);
router.delete("/address/:addressId", protect, deleteShippingAddress);

module.exports = router;
