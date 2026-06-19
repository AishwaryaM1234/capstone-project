import React, { useEffect, useState } from "react";
import { getAllAccounts } from "../services/accountService";

function AccountsTableOnly() {

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const res = await getAllAccounts();
      const data = res.data ? res.data : res;
      setAccounts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
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

        .accounts-container {
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
          background: white;
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #e3e8ee;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }

        /* TABLE */
        .table {
          border-collapse: separate;
          border-spacing: 0;
        }

        .table thead {
          background: #007bff;
          color: white;
        }

        .table thead th {
          font-weight: 500;
          border: none;
          padding: 12px;
          text-align: center;
        }

        .table tbody td {
          text-align: center;
          padding: 10px;
          border-color: #edf1f5;
        }

        /* ROW HOVER */
        .table tbody tr {
          transition: 0.2s ease;
        }

        .table tbody tr:hover {
          background: #f2f8ff;
          transform: scale(1.01);
        }

        /* EMPTY STATE */
        .no-data {
          padding: 20px;
          color: #777;
          font-weight: 500;
        }

        /* BALANCE HIGHLIGHT */
        .balance {
          font-weight: 600;
          color: #28a745;
        }

        /* ACCOUNT TYPE BADGE */
        .type-badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .saving {
          background: #e3f2fd;
          color: #007bff;
        }

        .current {
          background: #fff3cd;
          color: #856404;
        }

        /* SCROLL */
        .table-wrapper {
          max-height: 400px;
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
      <div className="accounts-container container">

        <div className="page-title">🏦 Accounts</div>

        <div className="table-card">

          <div className="table-wrapper">

            <table className="table table-bordered mt-2">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Account Number</th>
                  <th>Type</th>
                  <th>Balance</th>
                </tr>
              </thead>

              <tbody>
                {accounts.length > 0 ? (
                  accounts.map((acc) => (
                    <tr key={acc.id}>

                      <td>{acc.id}</td>

                      <td>{acc.accountNumber}</td>

                      <td>
                        <span className={
                          acc.accountType === "SAVINGS"
                            ? "type-badge saving"
                            : "type-badge current"
                        }>
                          {acc.accountType}
                        </span>
                      </td>

                      <td className="balance">
                        ₹ {acc.balance}
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center no-data">
                      No Accounts Found
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

export default AccountsTableOnly;
