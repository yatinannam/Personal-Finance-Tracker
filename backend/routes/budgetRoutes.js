const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getBudgets,
  setBudget,
  deleteBudget,
} = require("../controllers/budgetController");

const router = express.Router();

router.get("/", protect, getBudgets);
router.post("/", protect, setBudget);
router.delete("/:category", protect, deleteBudget);

module.exports = router;
