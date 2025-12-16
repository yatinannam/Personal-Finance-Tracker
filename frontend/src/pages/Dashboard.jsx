import { useState } from "react";
import Analytics from "../components/Analytics";
import Transactions from "../components/Transactions";
import Budgets from "../components/Budgets";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function Dashboard() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [refresh, setRefresh] = useState(false);

  return (
    <div style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "4px" }}>Dashboard</h2>
      <p style={{ color: "#6b7280", marginBottom: "16px" }}>
        Track your income, expenses and budgets
      </p>

      {/* Month / Year Selector */}
      <div className="card full-width">
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>

          <div style={{ display: "flex", gap: "10px" }}>
            <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
              {MONTHS.map((m, i) => (
                <option key={i} value={i + 1}>{m}</option>
              ))}
            </select>

            <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
              {[2023, 2024, 2025, 2026].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="dashboard-grid">
        {/* LEFT COLUMN */}
        <div>
          <div className="card">
            <Transactions
              month={month}
              year={year}
              onChange={() => setRefresh(!refresh)}
            />
          </div>

          <div className="card">
            <Budgets 
              month={month} 
              year={year}
              refresh={refresh}
            />
          </div>
        </div>

        {/* RIGHT COLUMN — SUMMARY */}
        <div>
          <div className="card">
            <Analytics month={month} year={year} refresh={refresh} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
