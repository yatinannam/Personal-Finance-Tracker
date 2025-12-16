const express = require("express");
const protect = require("../middleware/authMiddleware");
const { exportCSV, exportPDF } = require("../controllers/reportController");

const router = express.Router();

router.get("/csv", protect, exportCSV);
router.get("/pdf", protect, exportPDF);

module.exports = router;
