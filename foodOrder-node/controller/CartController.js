const User = require("../model/UserSchema");

const addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const cartData = user.cartData;
    if (!cartData[req.body.id]) {
      cartData[req.body.id] = 1;
    } else {
      cartData[req.body.id] += 1;
    }
    const data = await User.findByIdAndUpdate(req.body.userId, {
      cartData: cartData,
    });
    return res.json({ status: 200, message: "add cart successfully" });
  } catch (error) {
    console.log("Error in addtocart()", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const cartData = user.cartData;
    if (cartData[req.body.id] > 0) {
      cartData[req.body.id] -= 1;
    }
    const data = await User.findByIdAndUpdate(req.body.userId, {
      cartData: cartData,
    });
    return res.json({ status: 200, message: "remove cart successfully" });
  } catch (error) {
    console.log("Error in removeFromCart()", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};

const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const cartData = user.cartData;
    return res.status(200).json({ cartData });
  } catch (error) {
    console.log("Error in removeFromCart()", error);
    return res.status(400).json({ message: "Internal server error" });
  }
};

module.exports = { addToCart, removeFromCart, getCart };
