const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getMonthlyAnalytics,
  getExpenseTrends,
} = require("../controllers/analyticsController");

const router = express.Router();

router.get("/monthly", protect, getMonthlyAnalytics);
router.get("/trends", protect, getExpenseTrends);

module.exports = router;
