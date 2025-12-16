const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getCategories,
  addCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.get("/", protect, getCategories);
router.post("/", protect, addCategory);
router.delete("/:id", protect, deleteCategory);

module.exports = router;
