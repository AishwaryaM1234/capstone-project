import React, { useEffect, useState } from "react";
import { getAllTransactions } from "../services/transactionService";

function TransactionsTableOnly() {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await getAllTransactions();
      setTransactions(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      {/* ✅ PREMIUM UI CSS */}
      <style>{`

        /* MAIN BACKGROUND */
        div {
          font-family: 'Segoe UI', sans-serif;
        }

        /* HEADER */
        h3 {
          margin-bottom: 20px;
          color: #1f3b64;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        /* TABLE CARD WRAP */
        .table {
          width: 100%;
          border-collapse: collapse;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
          background: linear-gradient(135deg, #ffffff, #f4f9ff);
        }

        /* TABLE HEAD */
        .table thead {
          background: linear-gradient(90deg, #005bea, #00c6fb);
        }

        .table th {
          padding: 15px;
          text-align: left;
          font-size: 14px;
          color: white;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        /* TABLE BODY */
        .table td {
          padding: 13px;
          font-size: 14px;
          color: #333;
          border-bottom: 1px solid #eee;
        }

        /* ROW STYLE */
        .table tbody tr {
          transition: all 0.25s ease;
        }

        .table tbody tr:hover {
          background: linear-gradient(to right, #eef5ff, #f9fbff);
          transform: scale(1.01);
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
        }

        /* STRIPED EFFECT */
        .table tbody tr:nth-child(even) {
          background-color: #fafcff;
        }

        /* STATUS TEXT STYLE */
        td {
          vertical-align: middle;
        }

        /* BADGE STYLE */
        td span {
          padding: 6px 14px;
          border-radius: 25px;
          font-weight: bold;
          font-size: 12px;
          display: inline-block;
        }

        /* RISK COLORS */
        .high {
          background: linear-gradient(45deg, #ff4d4d, #ff0000);
          color: white;
          box-shadow: 0 0 8px rgba(255,0,0,0.4);
        }

        .medium {
          background: linear-gradient(45deg, #ffcc00, #ff9900);
          color: black;
        }

        .low {
          background: linear-gradient(45deg, #28a745, #00c851);
          color: white;
        }

      `}</style>

      <h3>📊 All Transactions</h3>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Description</th>
            <th>Account ID</th>
            <th>Status</th>
            <th>Risk Level</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr key={t.transactionId}>
              <td>{t.transactionId}</td>
              <td>₹ {t.amount}</td>
              <td>{t.transactionType}</td>
              <td>{t.description}</td>
              <td>{t.accountId}</td>
              <td>{t.paymentStatus || "-"}</td>

              <td>
                <span
                  className={
                    t.amount >= 100000 ? "high" :
                    t.amount >= 50000 ? "medium" : "low"
                  }
                >
                  {t.amount >= 100000 ? "HIGH" :
                   t.amount >= 50000 ? "MEDIUM" : "LOW"}
                </span>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default TransactionsTableOnly;