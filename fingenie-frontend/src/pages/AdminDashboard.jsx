import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import TransactionsTableOnly from "../components/TransactionsTableOnly";
import LoanTableOnly from "../components/LoanTableOnly";
import InvestmentsTableOnly from "../components/InvestmentsTableOnly";
import FraudTableOnly from "../components/FraudTableOnly";

import { getUsers } from "../services/userService";

function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("transactions");

  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setUsers([]);
      }

    } catch (error) {
      console.error(error);
      setUsers([]);
    }
  };

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin-login");
  };

  return (
    <>
      <style>{`

        body {
          margin: 0;
        }

        /* MAIN LAYOUT */
        .admin-main {
          display: flex;
          height: 100vh;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #eaf1ff, #f8fbff);
        }

        /* SIDEBAR */
        .sidebar {
          width: 260px;
          background: linear-gradient(180deg,#141e30,#243b55);
          color: white;
          display: flex;
          flex-direction: column;
          padding: 25px;
          box-shadow: 2px 0 15px rgba(0,0,0,0.2);
        }

        .logo {
          font-weight: 700;
          margin-bottom: 40px;
          font-size: 22px;
          text-align: center;
          letter-spacing: 1px;
        }

        .sidebar button {
          background: transparent;
          border: none;
          color: #cbd5e1;
          padding: 14px;
          margin-bottom: 12px;
          border-radius: 12px;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 15px;
        }

        .sidebar button:hover {
          background: rgba(255,255,255,0.1);
          transform: translateX(5px);
          color: #fff;
        }

        .sidebar .active {
          background: linear-gradient(90deg,#00c6ff,#0072ff);
          color: white;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        /* CONTENT */
        .content {
          flex: 1;
          padding: 25px;
          overflow-y: auto;
        }

        /* HEADER */
        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          padding: 18px 30px;
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);

          margin-bottom: 25px;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .topbar h2 {
          margin: 0;
          color: #2c3e50;
          font-weight: 700;
        }

        .logout-btn {
          background: linear-gradient(45deg,#ff416c,#ff4b2b);
          border: none;
          padding: 10px 28px;
          color: white;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .logout-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 8px 20px rgba(255,0,0,0.3);
        }

        /* STAT CARD */
        .stat-card {
          background: linear-gradient(135deg,#ffffff,#f4f7ff);
          padding: 25px;
          border-radius: 18px;
          width: 270px;
          margin-bottom: 25px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          transition: 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .stat-card h5 {
          margin: 0;
          color: #888;
        }

        .stat-card h1 {
          margin-top: 10px;
          font-size: 36px;
          font-weight: bold;
          color: #007bff;
        }

        /* TABLE SECTION */
        .table-section {
          background: white;
          padding: 25px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.12);
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

      `}</style>

      <div className="admin-main">

        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="logo">🏦 FinGenie</div>

          <button
            className={activeTab === "transactions" ? "active" : ""}
            onClick={() => setActiveTab("transactions")}
          >
            💳 Transactions
          </button>

          <button
            className={activeTab === "investments" ? "active" : ""}
            onClick={() => setActiveTab("investments")}
          >
            📈 Investments
          </button>

          <button
            className={activeTab === "loans" ? "active" : ""}
            onClick={() => setActiveTab("loans")}
          >
            🏦 Loans
          </button>

          <button
            className={activeTab === "fraud" ? "active" : ""}
            onClick={() => setActiveTab("fraud")}
          >
            🚨 Fraud Alerts
          </button>
        </div>

        {/* CONTENT */}
        <div className="content">

          {/* HEADER */}
          <div className="topbar">
            <h2>Admin Dashboard</h2>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>

          {/* USERS CARD */}
          <div className="stat-card">
            <h5>Total Users</h5>
            <h1>{users.length}</h1>
          </div>

          {/* TABLE */}
          <div className="table-section">
            {activeTab === "transactions" && <TransactionsTableOnly />}
            {activeTab === "investments" && <InvestmentsTableOnly />}
            {activeTab === "loans" && <LoanTableOnly />}
            {activeTab === "fraud" && <FraudTableOnly />}
          </div>

        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
