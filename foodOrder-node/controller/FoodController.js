const FoodSchema = require("../model/FoodSchema");
const fs = require("fs");

const FoodInsert = async (req, res) => {
  try {
    const data = await FoodSchema.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.file.filename,
      category: req.body.category,
    });
    return res.status(200).json({
      message: "Food insert successfull.!",
      data,
    });
  } catch (error) {
    console.log("Error in FoodInsert()", error);
    return res.status(400).json({
      message: "Food not insert",
      error: error,
    });
  }
};

const FoodList = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = 12;
    let data = [];
    if (page) {
      const skip = (page - 1) * limit;
      data = await FoodSchema.find({})
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
    } else {
      data = await FoodSchema.find({}).sort({ createdAt: -1 });
    }
    const totalCount = await FoodSchema.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    return res.status(200).json({ data, totalPages });
  } catch (error) {
    console.log("Error in foodlist()", error);
    return res.status(400).json({ message: "error in foodlist" });
  }
};

const FoodDelete = async (req, res) => {
  try {
    // console.log(req.params.id, "dddd");
    const food = await FoodSchema.findById(req.params.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    const data = await FoodSchema.findByIdAndDelete(food._id);
    return res.status(200).json({ message: "Food deleted successfully", data });
  } catch (error) {
    console.log("Error in fooddelete()", error);
    return res.status(400).json({ message: "food not delete" });
  }
};

const FoodEdit = async (req, res) => {
  console.log(req.body.name);
  return res.status(200).json({
    status: 200,
    body: req.body,
  });
  // try {
  //   const id = req.params.id;
  //   console.log(req.body, "fooodddd");
  //   const food = await FoodSchema.find({ _id: id });
  //   if (!food) {
  //     return res.status(400).json({
  //       message: "Food item not found",
  //     });
  //   }
  //   const updateData = {
  //     name: req.body.name,
  //     description: req.body.description,
  //     category: req.body.category,
  //     price: req.body.price,
  //     image: req.body.image,
  //   };
  //   console.log(updateData, "djfkdjsk");
  //   const data = await FoodSchema.updateOne(
  //     { _id: id },
  //     { $set: updateData },
  //     { new: true }
  //   );
  //   if (data) {
  //     return res.status(200).json({
  //       message: "Food updated successfully",
  //       data,
  //     });
  //   }
  // } catch (error) {
  //   return res.status(500).json({
  //     message: "Internal server error",
  //   });
  // }
};

module.exports = { FoodInsert, FoodList, FoodDelete, FoodEdit };
