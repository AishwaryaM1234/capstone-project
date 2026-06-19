import React, { useEffect, useState } from "react";
import { getLoans } from "../services/loanService";

function LoanTableOnly() {

  const [loans, setLoans] = useState([]);

  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = async () => {
  try {

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    console.log("ROLE:", role);
    console.log("TOKEN:", token);

    const res = await getLoans();

    console.log("RAW RESPONSE:", res);

    const data = res?.data ? res.data : res;

    console.log("FINAL DATA:", data);

    if (role === "ADMIN") {
      setLoans(Array.isArray(data) ? data : []);
    } else {
      setLoans([]);
    }

  } catch (error) {
    console.error("Error loading loans:", error);
  }
};

  return (
    <div className="container mt-4">

      <style>{`

        h2 {
          font-weight: 700;
          color: #1f3b64;
          margin-bottom: 15px;
        }

        .table {
          border-collapse: collapse;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 12px 30px rgba(0,0,0,0.15);
          background: linear-gradient(135deg,#ffffff,#f5f9ff);
        }

        .table thead {
          background: linear-gradient(90deg,#007bff,#00c6ff);
          color: white;
        }

        .table th {
          padding: 14px;
          font-size: 14px;
          text-align: left;
          font-weight: 600;
        }

        .table td {
          padding: 12px;
          font-size: 14px;
          border-bottom: 1px solid #eee;
        }

        .table tbody tr:hover {
          background: #eef6ff;
          transform: scale(1.01);
        }

        .table tbody tr:nth-child(even) {
          background-color: #fafcff;
        }

        td span {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          display: inline-block;
        }

        .empty-row {
          padding: 20px;
          color: #777;
          font-weight: 500;
        }

      `}</style>

      <h2>🏦 Loans</h2>

      <table className="table table-bordered table-striped mt-3">

        <thead>
          <tr>
            <th>ID</th>
            <th>Loan Type</th>
            <th>Amount</th>
            <th>Salary</th>
            <th>Credit Score</th>
            <th>Status</th>
            <th>User ID</th>
          </tr>
        </thead>

        <tbody>
          {loans.length > 0 ? (

            loans.map((loan, index) => {

              const id =
                loan.id ??
                loan.loanId ??
                loan.loan_id ??
                index;

              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{loan.loanType || loan.type || "-"}</td>
                  <td>₹ {loan.amount ?? "-"}</td>
                  <td>{loan.salary ?? "-"}</td>
                  <td>{loan.creditScore ?? "-"}</td>

                  <td>
                    <span
                      style={{
                        backgroundColor:
                          loan.status === "APPROVED"
                            ? "#28a745"
                            : loan.status === "REJECTED"
                            ? "#dc3545"
                            : "#6c757d",
                        color: "white"
                      }}
                    >
                      {loan.status || "UNKNOWN"}
                    </span>
                  </td>

                  <td>{loan.userId ?? "-"}</td>
                </tr>
              );
            })

          ) : (

            <tr>
              <td colSpan="7" className="text-center empty-row">
                No Loans Available
              </td>
            </tr>

          )}
        </tbody>

      </table>

    </div>
  );
}

export default LoanTableOnly;