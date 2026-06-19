import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <style>{`

        body {
          margin: 0;
        }

        /* ✅ BACKGROUND */
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #eef2f7, #ffffff);
          padding: 30px;
          font-family: 'Segoe UI', sans-serif;
        }

        /* ✅ HEADER */
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 35px;
          padding: 18px 28px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.12);
        }

        .dashboard-title {
          font-size: 24px;
          font-weight: 700;
          color: #1f2d3d;
        }

        /* ✅ LOGOUT */
        .logout-btn {
          background: linear-gradient(45deg,#ff416c,#ff4b2b);
          color: white;
          padding: 10px 24px;
          border: none;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .logout-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 20px rgba(255,0,0,0.3);
        }

        /* ✅ GRID */
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px,1fr));
          gap: 25px;
        }

        /* ✅ CARD */
        .dashboard-card {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg,#ffffff,#f9fbff);
          border-radius: 20px;
          padding: 28px;
          border: 1px solid #e5eaf0;
          box-shadow: 0 12px 30px rgba(0,0,0,0.1);
          transition: all 0.35s ease;
          min-height: 170px;
        }

        /* ✅ HOVER EFFECT */
        .dashboard-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
        }

        /* ✅ GLOW BACKGROUND */
        .dashboard-card::before {
          content: "";
          position: absolute;
          top: -40%;
          left: -40%;
          width: 180%;
          height: 180%;
          background: radial-gradient(circle, rgba(0,123,255,0.1), transparent);
          transform: rotate(25deg);
          z-index: 0;
        }

        .dashboard-card > div {
          position: relative;
          z-index: 1;
        }

        /* ✅ ICON */
        .card-icon {
          font-size: 36px;
          margin-bottom: 12px;
          transition: 0.3s;
        }

        .dashboard-card:hover .card-icon {
          transform: scale(1.25) rotate(5deg);
        }

        /* ✅ TEXT */
        .dashboard-card h5 {
          font-size: 18px;
          font-weight: 700;
          color: #1f2d3d;
        }

        .dashboard-card p {
          font-size: 14px;
          color: #6c757d;
          margin-top: 5px;
        }

        /* ✅ COLOR BORDERS */
        .card-1 { border-left: 6px solid #007bff; }
        .card-2 { border-left: 6px solid #ffc107; }
        .card-3 { border-left: 6px solid #28a745; }
        .card-4 { border-left: 6px solid #dc3545; }
        .card-5 { border-left: 6px solid #6f42c1; }

        /* ✅ LINK */
        a {
          text-decoration: none;
        }

        /* ✅ FOOTER */
        .footer {
          margin-top: 60px;
          text-align: center;
          color: #888;
          font-size: 13px;
        }

      `}</style>

      <div className="dashboard-container">

        {/* HEADER */}
        <div className="dashboard-header">

          <h2 className="dashboard-title">
            🏦 FinGenie Dashboard
          </h2>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>

        </div>

        {/* CARDS */}
        <div className="card-grid">

          <Link to="/transactions">
            <div className="dashboard-card card-1">
              <div>
                <div className="card-icon">💳</div>
                <h5>Transactions</h5>
                <p>View and manage financial activities</p>
              </div>
            </div>
          </Link>

          <Link to="/loan">
            <div className="dashboard-card card-2">
              <div>
                <div className="card-icon">🏦</div>
                <h5>Loans</h5>
                <p>Apply and monitor loan applications</p>
              </div>
            </div>
          </Link>

          <Link to="/investments">
            <div className="dashboard-card card-3">
              <div>
                <div className="card-icon">📈</div>
                <h5>Investments</h5>
                <p>Track portfolio and growth</p>
              </div>
            </div>
          </Link>

          <Link to="/fraud-alerts">
            <div className="dashboard-card card-4">
              <div>
                <div className="card-icon">🚨</div>
                <h5>Fraud Alerts</h5>
                <p>Monitor suspicious activity</p>
              </div>
            </div>
          </Link>

          <Link to="/chat">
            <div className="dashboard-card card-5">
              <div>
                <div className="card-icon">🤖</div>
                <h5>AI Assistant</h5>
                <p>Smart banking help & queries</p>
              </div>
            </div>
          </Link>

        </div>

        {/* FOOTER */}
        <div className="footer">
          © 2026 FinGenie AI Banking Platform
        </div>

      </div>
    </>
  );
}

export default Dashboard;
