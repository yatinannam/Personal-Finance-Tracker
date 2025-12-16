import { useEffect, useState } from "react";
import api from "../services/api";

function Budgets({ month, year, refresh }) {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch categories (same source as transactions)
  const fetchCategories = async () => {
    const res = await api.get("/categories", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCategories(res.data);
    if (!category && res.data.length > 0) {
      setCategory(res.data[0].name);
    }
  };

  const fetchBudgets = async () => {
    const res = await api.get(
      `/budgets?month=${month}&year=${year}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setBudgets(res.data);
  };

  useEffect(() => {
    fetchCategories();
    fetchBudgets();
  }, [month, year, refresh]);

  const saveBudget = async () => {
    if (!category || !limit) return;

    await api.post(
      "/budgets",
      { category, month, year, limit: Number(limit) },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    resetForm();
    fetchBudgets();
  };

  const startEdit = (b) => {
    setCategory(b.category);
    setLimit(b.limit);
    setEditingCategory(b.category);
  };

  const deleteBudget = async (cat) => {
    await api.delete(`/budgets/${cat}?month=${month}&year=${year}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchBudgets();
  };

  const resetForm = () => {
    setCategory(categories[0]?.name || "");
    setLimit("");
    setEditingCategory(null);
  };

  return (
    <div>
      <h3>Budgets</h3>

      {/* FORM */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <select
          value={category}
          disabled={editingCategory}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Monthly Limit"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />

        <button onClick={saveBudget}>
          {editingCategory ? "Update" : "Set"}
        </button>

        {editingCategory && (
          <button className="secondary" onClick={resetForm}>
            Cancel
          </button>
        )}
      </div>

      {/* LIST */}
      {budgets.length === 0 && (
        <p style={{ color: "#6b7280" }}>
          No budgets for this month
        </p>
      )}

      {budgets.map((b, i) => {
        const percent = Math.min((b.spent / b.limit) * 100, 100);

        return (
          <div
            key={i}
            style={{
              background: "#f9fafb",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong>{b.category}</strong>

              <div>
                <button
                  className="secondary"
                  onClick={() => startEdit(b)}
                >
                  Edit
                </button>
                <button
                  className="danger"
                  onClick={() => deleteBudget(b.category)}
                  style={{ marginLeft: "6px" }}
                >
                  Delete
                </button>
              </div>
            </div>

            <div style={{ fontSize: "13px", marginTop: "6px" }}>
              ₹{b.spent} spent of ₹{b.limit}
            </div>

            <div
              style={{
                height: "8px",
                background: "#e5e7eb",
                borderRadius: "6px",
                marginTop: "6px",
              }}
            >
              <div
                style={{
                  width: `${percent}%`,
                  height: "100%",
                  borderRadius: "6px",
                  background: percent >= 100 ? "#ef4444" : "#4f46e5",
                }}
              />
            </div>

            <div
              style={{
                fontSize: "12px",
                marginTop: "6px",
                color: percent >= 100 ? "#ef4444" : "#374151",
              }}
            >
              {percent >= 100
                ? "Over budget"
                : `₹${b.limit - b.spent} remaining`}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Budgets;
