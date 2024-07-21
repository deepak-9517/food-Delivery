const express = require("express");
const jwtVerify = require("../middleware/authMiddleware");
const router = express.Router();
const {
  placeOrder,
  paymentVerify,
  getUserOrders,
  getAllOrders,
  changeOrderStatus,
} = require("../controller/OrderController");

router.post("/place-order", jwtVerify, placeOrder);
router.post("/verify", paymentVerify);
router.get("/user-order", jwtVerify, getUserOrders);
router.get("/all-orders", getAllOrders);
router.get("/status", changeOrderStatus);

module.exports = router;
