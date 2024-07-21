const express = require("express");
const multer = require("multer");
const {
  FoodInsert,
  FoodList,
  FoodDelete,
  FoodEdit,
} = require("../controller/FoodController");
const uploads = require("../middleware/uploadImg");
const router = express.Router();

router.post("/add", uploads.single("image"), FoodInsert);
router.get("/food-list", FoodList);
router.delete("/food-delete/:id", FoodDelete);
router.patch("/food-edit/:id", FoodEdit);

module.exports = router;
