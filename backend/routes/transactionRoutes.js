const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/", protect, addTransaction);
router.get("/", protect, getTransactions);
router.put("/:id", protect, updateTransaction); // ✨ edit
router.delete("/:id", protect, deleteTransaction);

module.exports = router;
