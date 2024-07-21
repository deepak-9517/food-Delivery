const mongoose = require("mongoose");
const url = process.env.DB_URL;
const ConnectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Database Connected Successfully..!");
  } catch (error) {
    console.log("Database not Connected");
  }
};

module.exports = { ConnectDB };
