import { useEffect, useState } from "react";
import api from "../services/api";

function Transactions({ month, year, onChange }) {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    const res = await api.get("/categories", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCategories(res.data);
    if (!category && res.data.length > 0) {
      setCategory(res.data[0].name);
    }
  };

  const fetchTransactions = async () => {
    const res = await api.get(
      `/transactions?month=${month}&year=${year}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchCategories();
    fetchTransactions();
  }, [month, year]);

  const submit = async () => {
    if (!amount || !category) return;

    const payload = {
      type,
      amount: Number(amount),
      category,
      description,
      month,
      year,
    };

    if (editingId) {
      await api.put(`/transactions/${editingId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await api.post("/transactions", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    resetForm();
    fetchTransactions();
    onChange && onChange();
  };

  const startEdit = (t) => {
    setEditingId(t._id);
    setType(t.type);
    setAmount(t.amount);
    setCategory(t.category);
    setDescription(t.description || "");
  };

  // confirm removed (as requested)
  const deleteTransaction = async (id) => {
    await api.delete(`/transactions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchTransactions();
    onChange && onChange();
  };

  const resetForm = () => {
    setEditingId(null);
    setType("expense");
    setAmount("");
    setDescription("");
  };

  return (
    <div>
      <h3>{editingId ? "Edit Transaction" : "Add Transaction"}</h3>

      {/* Form */}
      <div style={{ display: "grid", gap: "8px", marginBottom: "16px" }}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div>
          <button onClick={submit}>
            {editingId ? "Update" : "Add"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="secondary"
              style={{ marginLeft: "8px" }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <hr />

      <h3>Your Transactions</h3>

      {transactions.length === 0 && (
        <p style={{ color: "#6b7280" }}>
          No transactions for this month
        </p>
      )}

      {/* ONLY layout fix here: grid instead of flex */}
      {transactions.map((t) => (
        <div
          key={t._id}
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr auto",
            alignItems: "center",
            background: "#f9fafb",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          <div>
            <strong>{t.category}</strong>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>
              {t.type.toUpperCase()}
            </div>
          </div>

          {/* aligned amount column */}
          <div style={{ textAlign: "left", fontWeight: "600" }}>
            ₹{t.amount}
          </div>

          <div>
            <button
              onClick={() => startEdit(t)}
              className="secondary"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTransaction(t._id)}
              className="danger"
              style={{ marginLeft: "6px" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Transactions;
