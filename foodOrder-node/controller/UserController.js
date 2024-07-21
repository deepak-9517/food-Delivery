const User = require("../model/UserSchema");
const jwt = require("jsonwebtoken");
const validation = require("validator");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        status: 400,
        message: "Enter valid email",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({
        status: 400,
        message: "Invalid credentials",
      });
    }
    const token = genrateJWTToken(user._id);
    return res.status(200).json({
      status: 200,
      data: user,
      token: token,
      message: "Login Successfully",
    });
  } catch (error) {
    console.log("error in login()", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        status: 400,
        message: "Email already exists",
      });
    }
    if (!validation.isEmail(email)) {
      return res.json({
        status: 400,
        message: "Invalid email",
      });
    }
    if (password.length < 5) {
      return res.json({
        status: 400,
        message: "Please enter strong password",
      });
    }
    const hashPwd = await bcrypt.hash(password, 10);
    const data = await User.create({
      name: name,
      email: email,
      password: hashPwd,
    });
    const token = genrateJWTToken(data._id);
    return res.status(200).json({
      status: 200,
      message: "User register successfully",
      token: token,
      data: data,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

const genrateJWTToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRETKEY);
  return token;
};

module.exports = { login, register };
