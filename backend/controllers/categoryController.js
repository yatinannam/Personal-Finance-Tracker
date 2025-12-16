const Category = require("../models/Category");

const DEFAULT_CATEGORIES = [
  "Food",
  "Rent",
  "Travel",
  "Shopping",
  "Bills",
  "Entertainment",
  "Salary",
  "Other",
];

// Get categories (auto-create defaults)
exports.getCategories = async (req, res) => {
  let categories = await Category.find({ user: req.user });

  if (categories.length === 0) {
    const docs = DEFAULT_CATEGORIES.map((name) => ({
      user: req.user,
      name,
    }));
    await Category.insertMany(docs);
    categories = await Category.find({ user: req.user });
  }

  res.json(categories);
};

// Add category
exports.addCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "Name required" });

  const exists = await Category.findOne({
    user: req.user,
    name,
  });

  if (exists) {
    return res.status(400).json({ message: "Category already exists" });
  }

  const category = await Category.create({
    user: req.user,
    name,
  });

  res.status(201).json(category);
};

// Delete category
exports.deleteCategory = async (req, res) => {
  await Category.findOneAndDelete({
    _id: req.params.id,
    user: req.user,
  });

  res.json({ message: "Category deleted" });
};
