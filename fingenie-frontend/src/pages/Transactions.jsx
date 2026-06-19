import { QRCodeCanvas } from "qrcode.react";
import BackButton from "../components/BackButton";
import React, { useEffect, useState } from "react";
import {
  getAllTransactions,
  createTransaction
} from "../services/transactionService";

function Transactions() {

  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    transactionType: "",
    description: "",
    accountId: ""
  });

  const [receiverUpi, setReceiverUpi] = useState("");
  const [qrAmount, setQrAmount] = useState("");
  const [qrValue, setQrValue] = useState("");

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const role = localStorage.getItem("role");
      const accountId = localStorage.getItem("accountId");

      let res = await getAllTransactions();
      const data = res?.data ? res.data : res;

      if (role !== "ADMIN") {
        setTransactions(data.filter(t => String(t.accountId) === String(accountId)));
      } else {
        setTransactions(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accountId = localStorage.getItem("accountId");

    await createTransaction({...formData, accountId});

    alert("Transaction Created Successfully");

    setFormData({
      amount: "",
      transactionType: "",
      description: "",
      accountId: ""
    });

    loadTransactions();
  };

  const generateQR = () => {

    if (!receiverUpi || !qrAmount) {
      alert("Enter UPI & amount");
      return;
    }

    const qr = `upi://pay?pa=${receiverUpi}&am=${qrAmount}`;
    setQrValue(qr);
  };

  return (
    <>
      <style>{`

        body {
          background: linear-gradient(135deg,#dfe9f3,#ffffff,#e3f2fd);
          font-family: 'Segoe UI', sans-serif;
        }

        .header {
          padding:25px;
          border-radius:18px;
          background: linear-gradient(90deg,#007bff,#00c6ff);
          color:white;
          text-align:center;
          margin-bottom:30px;
          box-shadow:0 15px 40px rgba(0,0,0,0.2);
        }

        .card {
          background: linear-gradient(135deg,#ffffff,#f5f9ff);
          padding:25px;
          border-radius:20px;
          margin-bottom:25px;
          box-shadow:0 15px 40px rgba(0,0,0,0.08);
          transition:0.3s;
        }

        .card:hover {
          transform: translateY(-5px);
        }

        h5 {
          margin-bottom:15px;
          font-weight:700;
          color:#2c3e50;
        }

        input.form-control {
          margin-bottom:12px;
          padding:13px;
          border-radius:12px;
          border:1px solid #ddd;
          background:#fafcff;
        }

        input.form-control:focus {
          border-color:#007bff;
          box-shadow:0 0 6px rgba(0,123,255,0.3);
        }

        .btn {
          border-radius:30px;
          padding:10px;
          font-weight:600;
          margin-top:5px;
          transition:0.3s;
        }

        .btn:hover {
          transform: scale(1.05);
        }

        .btn-primary {
          background:linear-gradient(45deg,#007bff,#00c6ff);
          border:none;
        }

        .btn-success {
          background:linear-gradient(45deg,#28a745,#00c851);
          border:none;
        }

        /* TABLE */
        table {
          width:100%;
          border-collapse:separate;
          border-spacing:0 12px;
        }

        thead tr {
          background:linear-gradient(90deg,#007bff,#00c6ff);
          color:white;
          border-radius:10px;
        }

        th {
          padding:14px;
        }

        tbody tr {
          background:#ffffff;
          box-shadow:0 10px 25px rgba(0,0,0,0.06);
          transition:0.3s;
        }

        tbody tr:hover {
          background:#e3f2fd;
          transform:scale(1.02);
        }

        td {
          padding:14px;
          text-align:center;
        }

        .qr-box {
          text-align:center;
          margin-top:20px;
          padding:15px;
          border-radius:15px;
          background:#f0f8ff;
        }

      `}</style>

      <div className="container py-3">

        <BackButton />

        <div className="header">
          <h3>🏦 Banking Transactions</h3>
        </div>

        {/* CREATE */}
        <div className="card">
          <h5>Create Transaction</h5>

          <form onSubmit={handleSubmit}>
            <input name="amount" placeholder="Amount"
              className="form-control"
              value={formData.amount}
              onChange={handleChange}/>

            <input name="transactionType" placeholder="Transaction Type"
              className="form-control"
              value={formData.transactionType}
              onChange={handleChange}/>

            <input name="description" placeholder="Description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}/>

            <input className="form-control"
              value={localStorage.getItem("accountId") || ""}
              disabled />

            <button className="btn btn-primary w-100">
              Create Transaction
            </button>
          </form>
        </div>

        {/* QR */}
        <div className="card">
          <h5>QR Payment</h5>

          <input placeholder="Receiver UPI"
            className="form-control"
            value={receiverUpi}
            onChange={(e)=>setReceiverUpi(e.target.value)} />

          <input placeholder="Amount"
            className="form-control"
            value={qrAmount}
            onChange={(e)=>setQrAmount(e.target.value)} />

          <button className="btn btn-success w-100" onClick={generateQR}>
            Generate QR
          </button>

          {qrValue && (
            <div className="qr-box">
              <QRCodeCanvas value={qrValue} size={180}/>
              <p>Scan to Pay</p>
            </div>
          )}
        </div>

        {/* TABLE */}
        <div className="card">
          <h5>Transaction Records</h5>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Description</th>
                <th>Account</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(t => (
                <tr key={t.transactionId}>
                  <td>{t.transactionId}</td>
                  <td>₹{t.amount}</td>
                  <td>{t.transactionType}</td>
                  <td>{t.description}</td>
                  <td>{t.accountId}</td>
                  <td>{t.paymentStatus || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}

export default Transactions;