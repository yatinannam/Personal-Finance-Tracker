const Transaction = require("../models/Transaction");
const generateCSV = require("../utils/generateCSV");
const generatePDF = require("../utils/generatePDF");

// CSV EXPORT
exports.exportCSV = async (req, res) => {
  try {
    const userId = req.user;
    const { month, year } = req.query;

    const m = month ? parseInt(month) : new Date().getMonth();
    const y = year ? parseInt(year) : new Date().getFullYear();

    const start = new Date(y, m, 1);
    const end = new Date(y, m + 1, 0, 23, 59, 59);

    const transactions = await Transaction.find({
      user: userId,
      date: { $gte: start, $lte: end },
    });

    const csv = generateCSV(transactions);

    res.header("Content-Type", "text/csv");
    res.attachment("finance-report.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.exportPDF = async (req, res) => {
  try {
    const userId = req.user;
    const { month, year } = req.query;

    const m = month ? parseInt(month) : new Date().getMonth();
    const y = year ? parseInt(year) : new Date().getFullYear();

    const start = new Date(y, m, 1);
    const end = new Date(y, m + 1, 0, 23, 59, 59);

    const transactions = await Transaction.find({
      user: userId,
      date: { $gte: start, $lte: end },
    });

    generatePDF(res, transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};