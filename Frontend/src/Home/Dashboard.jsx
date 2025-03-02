import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

function Dashboard() {
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(authUser?.username || "User");

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Dummy transactions data (dates in YYYY-MM-DD)
  const allTransactions = [
    { id: 1, date: "2025-01-01", title: "Salary", amount: 3000, type: "Income", category: "Job" },
    { id: 2, date: "2025-02-05", title: "Groceries", amount: 150, type: "Expense", category: "Food" },
    { id: 3, date: "2025-03-10", title: "Stocks", amount: 500, type: "Income", category: "Investments" },
    { id: 4, date: "2025-04-15", title: "Car Repair", amount: 200, type: "Expense", category: "Auto" },
    { id: 5, date: "2025-05-18", title: "Freelance", amount: 800, type: "Income", category: "Job" },
    { id: 6, date: "2025-06-12", title: "Rent", amount: 1000, type: "Expense", category: "Housing" },
    { id: 7, date: "2025-07-25", title: "Bonus", amount: 1200, type: "Income", category: "Job" },
    { id: 8, date: "2025-08-08", title: "Dining Out", amount: 100, type: "Expense", category: "Food" },
    { id: 9, date: "2025-09-10", title: "Investment Return", amount: 700, type: "Income", category: "Investments" },
    { id: 10, date: "2025-10-22", title: "Gym Membership", amount: 50, type: "Expense", category: "Health" },
    { id: 11, date: "2025-11-05", title: "Gift", amount: 200, type: "Expense", category: "Other" },
    { id: 12, date: "2025-12-31", title: "Year-end Bonus", amount: 1500, type: "Income", category: "Job" }
  ];

  // States for filters and chart view
  const [frequency, setFrequency] = useState("all"); // "3", "6", "12", or "all"
  const [transactionType, setTransactionType] = useState("All"); // 'All', 'Income', 'Expense'
  const [chartView, setChartView] = useState("line"); // 'line', 'bar', or 'pie'

  const filterTransactions = () => {
    const now = new Date();
    let filtered = [...allTransactions];
    if (frequency !== "all") {
      const months = parseInt(frequency, 10);
      const pastDate = new Date(now.getFullYear(), now.getMonth() - months, now.getDate());
      filtered = filtered.filter((transaction) => {
        const transDate = new Date(transaction.date);
        return transDate >= pastDate && transDate <= now;
      });
    }
    if (transactionType !== "All") {
      filtered = filtered.filter((t) => t.type === transactionType);
    }
    return filtered;
  };

  const filteredTransactions = filterTransactions();

  // Prepare chart data grouped by month (MM) and sum incomes and expenses
  const prepareChartData = () => {
    const dataMap = {};
    filteredTransactions.forEach((t) => {
      const month = t.date.slice(5, 7);
      if (!dataMap[month]) {
        dataMap[month] = { month, income: 0, expense: 0 };
      }
      if (t.type === "Income") {
        dataMap[month].income += t.amount;
      } else {
        dataMap[month].expense += t.amount;
      }
    });
    return Object.values(dataMap).sort((a, b) => a.month - b.month);
  };

  const chartData = prepareChartData();

  // Pie chart data aggregation
  const pieChartData = (() => {
    let incomeTotal = 0;
    let expenseTotal = 0;
    filteredTransactions.forEach((t) => {
      if (t.type === "Income") incomeTotal += t.amount;
      else expenseTotal += t.amount;
    });
    return [
      { name: "Income", value: incomeTotal },
      { name: "Expense", value: expenseTotal }
    ];
  })();

  const COLORS = ["#8884d8", "#82ca9d"];

  const handleLogout = () => {
    localStorage.removeItem("userName");
    logout();
    navigate("/login");
  };

  const handleAddNew = () => {
    alert("Add New Transaction button clicked (no backend yet)!");
  };

  const handleAction = (id) => {
    alert(`Action clicked for transaction ID: ${id}`);
  };

  // Debug: log chartData to console
  useEffect(() => {
    console.log("Chart Data:", chartData);
  }, [chartData]);

  return (
    <motion.div
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="dashboard-header">
        <h2>Welcome, {user}</h2>
      </div>

      <div className="dashboard-filters card">
        <div className="row">
          <div className="col-md-3 mb-2">
            <label>Frequency</label>
            <select
              className="form-select"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="3">Last 3 Months</option>
              <option value="6">Last 6 Months</option>
              <option value="12">Last 12 Months</option>
              <option value="all">All</option>
            </select>
          </div>
          <div className="col-md-3 mb-2">
            <label>Type</label>
            <select
              className="form-select"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <div className="col-md-3 mb-2">
            <label>Chart View</label>
            <select
              className="form-select"
              value={chartView}
              onChange={(e) => setChartView(e.target.value)}
            >
              <option value="line">Line Chart</option>
              <option value="bar">Bar Chart</option>
              <option value="pie">Pie Chart</option>
            </select>
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button className="btn btn-primary w-100" onClick={handleAddNew}>
              Add New
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-graph card">
        <h5>Analytics Overview</h5>
        {/* Set a fixed height container for the chart */}
        <div style={{ width: "100%", height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            {chartView === "line" ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="expense" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            ) : chartView === "bar" ? (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#8884d8" />
                <Bar dataKey="expense" fill="#82ca9d" />
              </BarChart>
            ) : (
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dashboard-table card">
        <h5>Transactions</h5>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.title}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.category}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleAction(transaction.id)}
                    >
                      Action
                    </button>
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <button className="btn btn-danger fixed-logout" onClick={handleLogout}>
        Logout
      </button>

      <footer className="dashboard-footer">
        <p>&copy; 2025 Personal Finance Manager. All rights reserved.</p>
      </footer>
    </motion.div>
  );
}

export default Dashboard;