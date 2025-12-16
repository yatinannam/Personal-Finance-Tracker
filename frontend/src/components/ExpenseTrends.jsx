import { useEffect, useState } from "react";
import api from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function ExpenseTrends({ year }) {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTrends = async () => {
      const res = await api.get(`/analytics/trends?year=${year}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const formatted = res.data.map((d) => ({
        month: MONTHS[d.month - 1],
        expense: d.expense,
      }));

      setData(formatted);
    };

    fetchTrends();
  }, [year]);

  // Check if at least 2 months have expenses
  const meaningfulData = data.filter((d) => d.expense > 0);

  if (meaningfulData.length < 2) {
    return (
      <div style={{ marginTop: "20px", color: "#666" }}>
        <h3>Expense Trend ({year})</h3>
        <p>
          Expense trend will appear once you have data for multiple months.
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Expense Trend ({year})</h3>

      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="expense"
          stroke="#ff6b35"
          strokeWidth={3}
          dot={{ r: 4 }}
        />
      </LineChart>
    </div>
  );
}

export default ExpenseTrends;
