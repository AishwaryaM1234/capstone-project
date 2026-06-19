import React, { useEffect, useState } from "react";
import {
  getAllAccounts,
  createAccount,
  deleteAccount
} from "../services/accountService";

function Accounts() {

  const [accounts, setAccounts] = useState([]);

  const [formData, setFormData] = useState({
    accountNumber: "",
    accountType: "",
    balance: "",
    userId: ""
  });

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const data = await getAllAccounts();
      setAccounts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createAccount(formData);

      alert("Account Created Successfully");

      setFormData({
        accountNumber: "",
        accountType: "",
        balance: "",
        userId: ""
      });

      loadAccounts();

    } catch (error) {
      alert("Error Creating Account");
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAccount(id);

      alert("Deleted Successfully");
      loadAccounts();

    } catch (error) {
      alert("Delete Failed");
    }
  };

  return (
    <div className="accounts-container">

      {/* ✅ CSS DESIGN */}
      <style>{`

        /* BACKGROUND */
        .accounts-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #e0ecff, #f7f9fc);
          padding: 30px;
          font-family: 'Segoe UI', sans-serif;
        }

        /* TITLE */
        .title {
          text-align: center;
          margin-bottom: 30px;
          font-weight: bold;
          color: #2c3e50;
        }

        /* CARD BASE */
        .card {
          border-radius: 18px;
          border: none;
          background: white;
          padding: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        /* FORM CARD */
        .form-card {
          background: linear-gradient(135deg, #ffffff, #f1f5f9);
          transition: 0.3s;
        }

        .form-card:hover {
          transform: translateY(-5px);
        }

        /* INPUTS */
        input {
          width: 100%;
          margin-bottom: 12px;
          padding: 10px;
          border-radius: 10px;
          border: 1px solid #ddd;
          outline: none;
          transition: 0.2s;
        }

        input:focus {
          border-color: #007bff;
          box-shadow: 0 0 8px rgba(0,123,255,0.3);
        }

        /* BUTTON */
        .create-btn {
          width: 100%;
          padding: 10px;
          background: linear-gradient(45deg, #00c6ff, #0072ff);
          color: white;
          border: none;
          border-radius: 25px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        .create-btn:hover {
          transform: scale(1.05);
        }

        /* TABLE CARD */
        .table-card {
          background: white;
        }

        /* TABLE */
        .custom-table {
          border-collapse: collapse;
          width: 100%;
          border-radius: 10px;
          overflow: hidden;
        }

        .custom-table thead {
          background: linear-gradient(90deg, #0072ff, #00c6ff);
          color: white;
        }

        .custom-table th {
          padding: 12px;
          text-align: left;
          font-size: 14px;
        }

        .custom-table td {
          padding: 10px;
          border-bottom: 1px solid #eee;
        }

        .custom-table tbody tr {
          transition: 0.3s;
        }

        .custom-table tbody tr:hover {
          background: #f4f9ff;
          transform: scale(1.01);
        }

        /* DELETE BUTTON */
        .delete-btn {
          background: linear-gradient(45deg, #ff416c, #ff4b2b);
          color: white;
          border: none;
          padding: 6px 14px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 13px;
          transition: 0.3s;
        }

        .delete-btn:hover {
          transform: scale(1.1);
        }

      `}</style>

      <h2 className="title">🏦 Accounts Management</h2>

      <div className="row">

        {/* FORM */}
        <div className="col-md-4">
          <div className="card form-card shadow">
            <h4 className="text-center mb-3">Create Account</h4>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="accountNumber"
                placeholder="Account Number"
                value={formData.accountNumber}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="accountType"
                placeholder="Account Type"
                value={formData.accountType}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="balance"
                placeholder="Balance"
                value={formData.balance}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="userId"
                placeholder="User ID"
                value={formData.userId}
                onChange={handleChange}
                required
              />

              <button type="submit" className="create-btn">
                ➕ Create Account
              </button>
            </form>
          </div>
        </div>

        {/* TABLE */}
        <div className="col-md-8">
          <div className="card table-card shadow">

            <h4 className="mb-3">Account List</h4>

            <div className="table-responsive">
              <table className="table custom-table">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Account Number</th>
                    <th>Type</th>
                    <th>Balance</th>
                    <th>User ID</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {accounts.map((account) => (
                    <tr key={account.accountId}>

                      <td>{account.accountId}</td>
                      <td>{account.accountNumber}</td>
                      <td>{account.accountType}</td>
                      <td>₹{account.balance}</td>
                      <td>{account.userId}</td>

                      <td>
                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(account.accountId)
                          }
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

export default Accounts;