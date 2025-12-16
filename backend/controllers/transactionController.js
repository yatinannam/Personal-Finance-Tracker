const Transaction = require("../models/Transaction");

// ADD transaction (FIXED)
exports.addTransaction = async (req, res) => {
  try {
    const { type, amount, category, description, month, year } = req.body;

    if (!type || !amount || !category || !month || !year) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // JS Date month is 0-based
    const date = new Date(year, month - 1, 1);

    const transaction = await Transaction.create({
      user: req.user,
      type,
      amount,
      category,
      description,
      date,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET transactions (FIXED)
exports.getTransactions = async (req, res) => {
  try {
    const { month, year } = req.query;

    const m = parseInt(month) - 1;
    const y = parseInt(year);

    const start = new Date(y, m, 1);
    const end = new Date(y, m + 1, 0, 23, 59, 59);

    const transactions = await Transaction.find({
      user: req.user,
      date: { $gte: start, $lte: end },
    }).sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE transaction (FIXED)
exports.updateTransaction = async (req, res) => {
  try {
    const { month, year } = req.body;

    const updates = { ...req.body };

    if (month && year) {
      updates.date = new Date(year, month - 1, 1);
    }

    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE transaction
exports.deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
