const Budget = require("../models/Budget");
const Transaction = require("../models/Transaction");

// Get budgets + spent amount
exports.getBudgets = async (req, res) => {
  const { month, year } = req.query;

  const budgets = await Budget.find({
    user: req.user,
    month,
    year,
  });

  const results = [];

  for (const b of budgets) {
    const spent = await Transaction.aggregate([
      {
        $match: {
          user: b.user,
          type: "expense",
          category: b.category,
          date: {
            $gte: new Date(year, month - 1, 1),
            $lte: new Date(year, month, 0, 23, 59, 59),
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    results.push({
      category: b.category,
      limit: b.limit,
      spent: spent[0]?.total || 0,
      remaining: b.limit - (spent[0]?.total || 0),
      exceeded: (spent[0]?.total || 0) > b.limit,
    });
  }

  res.json(results);
};

// Set or update budget
exports.setBudget = async (req, res) => {
  const { category, month, year, limit } = req.body;

  const budget = await Budget.findOneAndUpdate(
    { user: req.user, category, month, year },
    { limit },
    { upsert: true, new: true }
  );

  res.json(budget);
};

// Delete budget
exports.deleteBudget = async (req, res) => {
  const { category } = req.params;
  const { month, year } = req.query;

  await Budget.findOneAndDelete({
    user: req.user,
    category,
    month,
    year,
  });

  res.json({ message: "Budget deleted" });
};
