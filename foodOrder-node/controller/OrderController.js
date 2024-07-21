const Order = require("../model/OrderSchema");
const User = require("../model/UserSchema");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:3001/";
  try {
    const newOrder = await Order.create({
      userId: req.body.userId,
      items: req.body.item,
      amount: req.body.amount,
      address: req.body.address,
    });
    await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.item.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery charge",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}verify?success=false&orderId=${newOrder._id}`,
    });
    return res.json({ status: 200, session_url: session.url });
  } catch (error) {
    console.log("Error in placeorder()", error);
    return res.json({
      status: 400,
      message: "Internal server error",
    });
  }
};

const paymentVerify = async (req, res) => {
  try {
    console.log(req.body);
    const success = req.body.success;
    const orderId = req.body.orderId;
    if (success == "true") {
      const data = await Order.findByIdAndUpdate(orderId, { payment: true });
      return res.json({
        status: 200,
        message: "payment successfully!",
      });
    } else {
      const data = await Order.findByIdAndDelete(orderId);
      return res.json({
        status: 400,
        message: "payment Failed!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Internal server error",
    });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const data = await Order.find({ userId: req.body.userId });
    return res.json({
      status: 200,
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Internal server error",
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const data = await Order.find({});
    return res.json({
      status: 200,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 200,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const changeOrderStatus = async (req, res) => {
  try {
    const status = req.query.status;
    const id = req.query.id;
    const data = await Order.findByIdAndUpdate(id, { status: status });
    if (data) {
      return res.json({
        status: 200,
        message: "success",
      });
    } else {
      return res.json({
        status: 400,
        message: "Record Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: 200,
      message: "Internal server error",
    });
  }
};
module.exports = {
  placeOrder,
  paymentVerify,
  getUserOrders,
  getAllOrders,
  changeOrderStatus,
};
