import React, { useEffect, useState } from "react";
import { getFraudAlerts } from "../services/fraudService";

function FraudTableOnly() {

  const [frauds, setFrauds] = useState([]);

  useEffect(() => {
    loadFrauds();
  }, []);

  const loadFrauds = async () => {
    try {
      const res = await getFraudAlerts();
      const data = res?.data ? res.data : res;
      setFrauds(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading fraud alerts:", error);
    }
  };

  return (
    <>
      {/* ✅ ADVANCED PROFESSIONAL CSS */}
      <style>{`

        body {
          background: linear-gradient(135deg,#edf2f7,#ffffff);
          font-family: 'Segoe UI', sans-serif;
        }

        .fraud-container {
          padding: 25px;
        }

        /* HEADER */
        .page-title {
          font-size: 24px;
          font-weight: 700;
          color: #1f2d3d;
          margin-bottom: 18px;
          letter-spacing: 0.5px;
        }

        /* CARD */
        .table-card {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          padding: 22px;
          border-radius: 18px;
          border: none;
          box-shadow: 0 12px 30px rgba(0,0,0,0.12);
          transition: 0.3s ease;
        }

        .table-card:hover {
          transform: translateY(-5px);
        }

        /* TABLE */
        .table {
          border-collapse: separate;
          border-spacing: 0;
          font-size: 14px;
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
        }

        /* HEADER */
        .table thead {
          background: linear-gradient(90deg,#dc3545,#ff6b6b);
          color: white;
        }

        .table thead th {
          text-align: center;
          padding: 14px;
          border: none;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        /* BODY */
        .table tbody td {
          text-align: center;
          padding: 12px;
          border-color: #edf1f5;
          vertical-align: middle;
          color: #444;
        }

        /* ROW EFFECT */
        .table tbody tr {
          transition: all 0.25s ease;
        }

        .table tbody tr:hover {
          background: linear-gradient(to right,#fff5f5,#ffffff);
          transform: scale(1.01);
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
        }

        /* STRIPED */
        .table tbody tr:nth-child(even) {
          background: #fafafa;
        }

        /* STATUS BADGE */
        .status-badge {
          padding: 6px 14px;
          border-radius: 25px;
          font-size: 12px;
          font-weight: 700;
          display: inline-block;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        .status-high {
          background: linear-gradient(45deg,#dc3545,#ff0000);
          color: white;
        }

        .status-open {
          background: linear-gradient(45deg,#28a745,#00c851);
          color: white;
        }

        .status-default {
          background: #6c757d;
          color: white;
        }

        /* RISK SCORE STYLING */
        .risk-high {
          color: #dc3545;
          font-weight: 700;
        }

        .risk-medium {
          color: #ffc107;
          font-weight: 700;
        }

        .risk-low {
          color: #28a745;
          font-weight: 700;
        }

        /* EMPTY */
        .no-data {
          padding: 25px;
          font-size: 15px;
          color: #888;
          font-weight: 500;
        }

        /* SCROLL */
        .table-wrapper {
          max-height: 430px;
          overflow-y: auto;
        }

        .table-wrapper::-webkit-scrollbar {
          width: 6px;
        }

        .table-wrapper::-webkit-scrollbar-thumb {
          background: #bbb;
          border-radius: 4px;
        }

      `}</style>

      <div className="fraud-container container">

        <div className="page-title">🚨 Fraud Alerts Monitoring</div>

        <div className="table-card">

          <div className="table-wrapper">

            <table className="table table-bordered mt-2">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Risk Score</th>
                  <th>Remarks</th>
                  <th>Status</th>
                  <th>Transaction ID</th>
                </tr>
              </thead>

              <tbody>
                {frauds.length > 0 ? (

                  frauds.map((f, index) => {

                    const id =
                      f.id ?? f.fraudId ?? f.alertId ?? index;

                    return (
                      <tr key={id}>

                        <td>{id}</td>

                        <td>
                          <span className={
                            f.riskScore >= 80
                              ? "risk-high"
                              : f.riskScore >= 50
                              ? "risk-medium"
                              : "risk-low"
                          }>
                            {f.riskScore ?? "-"}
                          </span>
                        </td>

                        <td>{f.remarks || f.message || "-"}</td>

                        <td>
                          <span className={
                            f.status === "HIGH"
                              ? "status-badge status-high"
                              : f.status === "OPEN"
                              ? "status-badge status-open"
                              : "status-badge status-default"
                          }>
                            {f.status || "N/A"}
                          </span>
                        </td>

                        <td>{f.transactionId ?? "-"}</td>

                      </tr>
                    );
                  })

                ) : (
                  <tr>
                    <td colSpan="5" className="text-center no-data">
                      No Fraud Alerts Found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>

          </div>

        </div>

      </div>
    </>
  );
}

export default FraudTableOnly;