const mongoose = require("mongoose");

const foodschema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    image: { type: String, require: true },
    category: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const FoodSchema = mongoose.model("food", foodschema);
module.exports = FoodSchema;
