import React, { useState, useEffect } from "react";
import { getFraudAlerts } from "../services/fraudService";
import BackButton from "../components/BackButton";

function FraudAlert() {

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      const response = await getFraudAlerts();
      setAlerts(response.data);
    } catch (error) {
      console.error("Error loading fraud alerts:", error);
    }
  };

  return (
    <>
      {/* ✅ ADVANCED CSS */}
      <style>{`
        .fraud-container {
          min-height: 100vh;
          padding: 30px;
          background: linear-gradient(135deg, #eef2f7, #d9e4f5);
          font-family: 'Segoe UI', sans-serif;
        }

        .fraud-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
        }

        .fraud-title {
          font-weight: 700;
          color: #1f2d3d;
        }

        /* Glass card */
        .fraud-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border-radius: 18px;
          padding: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }

        /* Table */
        .fraud-table {
          border-radius: 12px;
          overflow: hidden;
        }

        .fraud-table thead {
          background: linear-gradient(45deg, #ff4b2b, #ff416c);
          color: white;
          position: sticky;
          top: 0;
        }

        .fraud-table th {
          text-align: center;
          font-weight: 600;
          padding: 12px;
        }

        .fraud-table td {
          text-align: center;
          padding: 12px;
          vertical-align: middle;
        }

        .fraud-table tbody tr {
          transition: all 0.3s ease;
        }

        .fraud-table tbody tr:hover {
          background: #fff5f5;
          transform: scale(1.01);
        }

        /* STATUS BADGES */
        .badge {
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: bold;
        }

        .high {
          background: #ff4b2b;
          color: white;
        }

        .medium {
          background: #ffc107;
          color: black;
        }

        .low {
          background: #28a745;
          color: white;
        }

        /* RISK BAR */
        .risk-bar {
          height: 8px;
          border-radius: 10px;
          background: #eee;
          overflow: hidden;
        }

        .risk-fill {
          height: 100%;
          transition: 0.3s;
        }

        .risk-high {
          background: #dc3545;
        }

        .risk-medium {
          background: #ffc107;
        }

        .risk-low {
          background: #28a745;
        }

        /* Empty */
        .no-data {
          padding: 25px;
          font-size: 16px;
          color: #888;
        }
      `}</style>

      {/* ✅ UI */}
      <div className="fraud-container">

        <div className="fraud-header">
          <BackButton />
          <h2 className="fraud-title">🚨 Fraud Monitoring Dashboard</h2>
        </div>

        <div className="fraud-card">

          <table className="table fraud-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Risk Score</th>
                <th>Risk Level</th>
                <th>Remarks</th>
                <th>Status</th>
                <th>Transaction ID</th>
              </tr>
            </thead>

            <tbody>
              {alerts.length > 0 ? (
                alerts.map((alert) => {

                  // ✅ classify risk
                  const risk = alert.riskScore;
                  let riskClass = "low";
                  let riskText = "LOW";

                  if (risk > 70) {
                    riskClass = "risk-high";
                    riskText = "HIGH";
                  } else if (risk > 40) {
                    riskClass = "risk-medium";
                    riskText = "MEDIUM";
                  } else {
                    riskClass = "risk-low";
                    riskText = "LOW";
                  }

                  return (
                    <tr key={alert.fraudId}>

                      <td>{alert.fraudId}</td>

                      {/* ✅ Risk score + bar */}
                      <td>
                        <strong>{alert.riskScore}</strong>
                        <div className="risk-bar mt-1">
                          <div
                            className={`risk-fill ${riskClass}`}
                            style={{ width: `${alert.riskScore}%` }}
                          ></div>
                        </div>
                      </td>

                      {/* ✅ Risk badge */}
                      <td>
                        <span className={`badge ${riskText.toLowerCase()}`}>
                          {riskText}
                        </span>
                      </td>

                      <td>{alert.remarks}</td>

                      {/* ✅ Status */}
                      <td>
                        <span className={`badge ${alert.status === "HIGH" ? "high" : "low"}`}>
                          {alert.status}
                        </span>
                      </td>

                      <td>{alert.transactionId}</td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center no-data">
                    🚫 No Fraud Alerts Found
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

export default FraudAlert;