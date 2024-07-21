const jwt = require("jsonwebtoken");

const jwtVerify = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token.split(" ")[1]) {
    return res.json({
      status: 400,
      message: "Please login first",
    });
  }
  try {
    const tokenDecode = jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRETKEY
    );
    req.body.userId = tokenDecode.id;
    next();
  } catch (error) {
    console.log("Error in jwtverify()", error.message);
    return res.status(400).json({ message: "Internal server error" });
  }
};

module.exports = jwtVerify;
