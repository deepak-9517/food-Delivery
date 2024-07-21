const express = require("express");
const {
  addToCart,
  removeFromCart,
  getCart,
} = require("../controller/CartController");
const jwtVerify = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add", jwtVerify, addToCart);
router.post("/remove", jwtVerify, removeFromCart);
router.post("/get-cart", jwtVerify, getCart);

module.exports = router;
