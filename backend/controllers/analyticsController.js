const Transaction = require("../models/Transaction");

// Monthly summary + category breakdown
exports.getMonthlyAnalytics = async (req, res) => {
  try {
    const { month, year } = req.query;

    const m = parseInt(month) - 1;
    const y = parseInt(year);

    const start = new Date(y, m, 1);
    const end = new Date(y, m + 1, 0, 23, 59, 59);

    const transactions = await Transaction.find({
      user: req.user,
      date: { $gte: start, $lte: end },
    });

    let income = 0;
    let expense = 0;
    const categories = {};

    transactions.forEach((t) => {
      if (t.type === "income") {
        income += t.amount;
      }
      if (t.type === "expense") {
        expense += t.amount;
        categories[t.category] =
          (categories[t.category] || 0) + t.amount;
      }
    });

    res.json({
      month,
      year,
      income,
      expense,
      balance: income - expense,
      categories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📈 Expense trend for whole year
exports.getExpenseTrends = async (req, res) => {
  try {
    const { year } = req.query;

    const trends = [];

    for (let m = 0; m < 12; m++) {
      const start = new Date(year, m, 1);
      const end = new Date(year, m + 1, 0, 23, 59, 59);

      const result = await Transaction.aggregate([
        {
          $match: {
            user: req.user,
            type: "expense",
            date: { $gte: start, $lte: end },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ]);

      trends.push({
        month: m + 1,
        expense: result[0]?.total || 0,
      });
    }

    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
