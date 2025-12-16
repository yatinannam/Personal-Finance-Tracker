import { useEffect, useState } from "react";
import api from "../services/api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

function Analytics({ month, year, refresh }) {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await api.get(
        `/analytics/monthly?month=${month}&year=${year}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(res.data);
    };
    fetchAnalytics();
  }, [month, year, refresh]);

  if (!data) return null;

  const pieData = Object.entries(data.categories || {}).map(
    ([name, value]) => ({ name, value })
  );

return (
    <div>
      {/* SUMMARY BAR */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>Income</div>
          <div style={{ fontSize: "20px", fontWeight: "600", color: "#16a34a" }}>
            ₹{data.income}
          </div>
        </div>

        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>Expense</div>
          <div style={{ fontSize: "20px", fontWeight: "600", color: "#dc2626" }}>
            ₹{data.expense}
          </div>
        </div>

        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>Balance</div>
          <div style={{ fontSize: "20px", fontWeight: "600" }}>
            ₹{data.balance}
          </div>
        </div>
      </div>

      {/* PIE CHART */}
      <h3>Expense Breakdown</h3>

      {pieData.length === 0 ? (
        <p style={{ color: "#6b7280" }}>No expenses for this month</p>
      ) : (
        <PieChart width={350} height={250}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
}

export default Analytics;
