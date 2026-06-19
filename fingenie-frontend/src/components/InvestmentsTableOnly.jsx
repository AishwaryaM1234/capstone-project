import React, { useEffect, useState } from "react";
import { getInvestments } from "../services/investmentService";

function InvestmentsTableOnly() {

  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    loadInvestments();
  }, []);

  const loadInvestments = async () => {
    try {
      const res = await getInvestments();
      const data = res?.data ? res.data : res;
      setInvestments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading investments:", error);
    }
  };

  return (
    <>
      {/* ✅ PROFESSIONAL CSS */}
      <style>{`

        body {
          background: #f4f7fb;
          font-family: 'Segoe UI', sans-serif;
        }

        .invest-container {
          padding: 25px;
        }

        /* HEADER */
        .page-title {
          font-size: 22px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 15px;
        }

        /* CARD */
        .table-card {
          background: #ffffff;
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #e3e8ee;
          box-shadow: 0 6px 18px rgba(0,0,0,0.06);
        }

        /* TABLE */
        .table {
          border-collapse: separate;
          border-spacing: 0;
          font-size: 14px;
        }

        .table thead {
          background: #007bff;
          color: white;
        }

        .table thead th {
          text-align: center;
          padding: 12px;
          border: none;
          font-weight: 500;
        }

        .table tbody td {
          text-align: center;
          padding: 10px;
          border-color: #edf1f5;
          vertical-align: middle;
        }

        /* ROW HOVER */
        .table tbody tr {
          transition: all 0.2s ease;
        }

        .table tbody tr:hover {
          background: #f2f8ff;
          transform: scale(1.01);
        }

        /* RISK BADGE */
        .risk-badge {
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .risk-high {
          background: #dc3545;
          color: white;
        }

        .risk-medium {
          background: #ffc107;
          color: black;
        }

        .risk-low {
          background: #28a745;
          color: white;
        }

        /* AMOUNT */
        .amount {
          font-weight: 600;
          color: #007bff;
        }

        /* EMPTY STATE */
        .no-data {
          padding: 20px;
          font-size: 15px;
          color: #777;
        }

        /* TABLE SCROLL */
        .table-wrapper {
          max-height: 420px;
          overflow-y: auto;
        }

        .table-wrapper::-webkit-scrollbar {
          width: 6px;
        }

        .table-wrapper::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 4px;
        }

      `}</style>

      {/* ✅ UI */}
      <div className="invest-container container">

        <div className="page-title">📈 Investments</div>

        <div className="table-card">

          <div className="table-wrapper">

            <table className="table table-bordered mt-2">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fund Name</th>
                  <th>Amount</th>
                  <th>Risk Level</th>
                  <th>User ID</th>
                </tr>
              </thead>

              <tbody>
                {investments.length > 0 ? (

                  investments.map((inv, index) => {

                    const id =
                      inv.id ??
                      inv.investmentId ??
                      inv.invId ??
                      index;

                    const riskLevel =
                      inv.riskLevel ??
                      inv.risk_level ??
                      "LOW";

                    return (
                      <tr key={id}>

                        <td>{id}</td>

                        <td>
                          <strong>
                            {inv.fundName || inv.name || "-"}
                          </strong>
                        </td>

                        <td className="amount">
                          ₹ {inv.amount ?? "-"}
                        </td>

                        <td>
                          <span className={
                            riskLevel === "HIGH"
                              ? "risk-badge risk-high"
                              : riskLevel === "MEDIUM"
                              ? "risk-badge risk-medium"
                              : "risk-badge risk-low"
                          }>
                            {riskLevel}
                          </span>
                        </td>

                        <td>{inv.userId ?? "-"}</td>

                      </tr>
                    );
                  })

                ) : (
                  <tr>
                    <td colSpan="5" className="text-center no-data">
                      No Investments Data Found
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

export default InvestmentsTableOnly;