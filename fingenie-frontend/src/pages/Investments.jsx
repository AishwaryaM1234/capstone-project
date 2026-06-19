import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import {
  getInvestments,
  createInvestment
} from "../services/investmentService";

function Investments() {

  const [investments, setInvestments] = useState([]);

  const [formData, setFormData] = useState({
    fundName: "",
    amount: "",
    riskLevel: "",
    userId: ""
  });

  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyExpense, setMonthlyExpense] = useState("");
  const [savingsResult, setSavingsResult] = useState("");

  const [riskIncome, setRiskIncome] = useState("");
  const [riskExpense, setRiskExpense] = useState("");
  const [riskProfile, setRiskProfile] = useState("");

  const [mfSuggestion, setMfSuggestion] = useState("");

  useEffect(() => { loadInvestments(); }, []);

  const loadInvestments = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await getInvestments();
      const data = res?.data ? res.data : res;
      setInvestments(data.filter(i => String(i.userId) === userId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    await createInvestment({...formData, userId});

    alert("Investment Added Successfully");

    setFormData({
      fundName: "",
      amount: "",
      riskLevel: "",
      userId: ""
    });

    loadInvestments();
  };

  const generateSavingsPlan = () => {
    const inc = Number(monthlyIncome);
    const exp = Number(monthlyExpense);

    if (!inc || !exp) {
      alert("Enter values");
      return;
    }

    const savings = inc - exp;

    if (savings <= 0)
      setSavingsResult("⚠️ You are spending more than income. Reduce expenses.");
    else if (savings < 10000)
      setSavingsResult(`💰 Savings ₹${savings}. Invest in Recurring Deposits.`);
    else if (savings < 30000)
      setSavingsResult(`📊 Savings ₹${savings}. Invest in Mutual Funds + Fixed Deposits.`);
    else
      setSavingsResult(`🚀 Savings ₹${savings}. Invest in Equity & SIP for growth.`);
  };

  const calculateRiskProfile = () => {

    const inc = Number(riskIncome);
    const exp = Number(riskExpense);

    if (!inc || !exp) {
      alert("Enter income and expense");
      return;
    }

    const savings = inc - exp;
    const score = (savings / inc) * 100;

    if (score < 20)
      setRiskProfile(`🟢 Low Risk → Prefer Fixed Deposits`);
    else if (score < 50)
      setRiskProfile(`🟡 Moderate Risk → Mutual Funds`);
    else
      setRiskProfile(`🔴 High Risk → Equity Investments`);
  };

  const suggestMF = () => {
    if (riskProfile.includes("Low"))
      setMfSuggestion("✅ Debt Mutual Funds or Fixed Deposits (Safe)");
    else if (riskProfile.includes("Moderate"))
      setMfSuggestion("✅ Balanced Mutual Funds (Moderate returns)");
    else
      setMfSuggestion("✅ Equity Mutual Funds & SIP (High returns)");
  };

  return (
    <>
      <style>{`

        body {
          background: linear-gradient(135deg, #dfe9f3, #ffffff, #e3f2fd);
          font-family: 'Segoe UI';
        }

        .layout {
          display:grid;
          grid-template-columns:1fr 2fr;
          gap:30px;
          padding:30px;
        }

        .section {
          background: linear-gradient(135deg,#ffffff,#f5f9ff);
          padding:25px;
          border-radius:20px;
          margin-bottom:25px;
          box-shadow:0 15px 40px rgba(0,0,0,0.08);
          transition:0.3s;
        }

        .section:hover {
          transform: translateY(-5px);
        }

        .left-card {
          background: linear-gradient(135deg,#e3f2fd,#ffffff);
          border-left:5px solid #007bff;
          margin-bottom:70px;
        }

        h5 {
          font-weight:700;
          margin-bottom:15px;
          color:#2c3e50;
        }

        input {
          width:100%;
          margin-bottom:15px;
          padding:13px;
          border-radius:12px;
          border:1px solid #ddd;
          background:#fafcff;
        }

        input:focus {
          border-color:#007bff;
          box-shadow:0 0 8px rgba(0,123,255,0.3);
        }

        .btn-pro {
          width:100%;
          padding:14px;
          border:none;
          border-radius:30px;
          font-weight:600;
          color:white;
          background:linear-gradient(45deg,#007bff,#00c6ff);
        }

        .btn-pro:hover {
          transform:scale(1.05);
        }

        /* ✅ TABLE */
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

        tbody tr {
          background:#ffffff;
          box-shadow:0 10px 25px rgba(0,0,0,0.06);
          transition:0.3s;
        }

        tbody tr:hover {
          background:#e3f2fd;
          transform:scale(1.02);
        }

        th, td {
          padding:14px;
          text-align:center;
        }

        /* ✅ RESULT BOX */
        .result-box {
          margin-top:15px;
          padding:18px;
          border-radius:15px;
          background:linear-gradient(45deg,#bbdefb,#e3f2fd);
          font-weight:600;
        }

      `}</style>

      <BackButton />
      <h2 style={{padding:"0 30px"}}>📊 Investment Platform</h2>

      <div className="layout">

        {/* LEFT */}
        <div>
          <div className="section left-card">
            <h5>Create Investment</h5>

            <form onSubmit={handleSubmit}>
              <input name="fundName" placeholder="Fund Name" onChange={handleChange}/>
              <input name="amount" placeholder="Amount" onChange={handleChange}/>
              <input name="riskLevel" placeholder="Risk Level" onChange={handleChange}/>
              <input value={localStorage.getItem("userId")} disabled/>

              <button className="btn-pro">Add Investment</button>
            </form>
          </div>
        </div>

        {/* RIGHT */}
        <div>

          {/* TABLE */}
          <div className="section">
            <h5>Investment Records</h5>

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fund</th>
                  <th>Amount</th>
                  <th>Risk</th>
                  <th>User</th>
                </tr>
              </thead>

              <tbody>
                {investments.map(i => (
                  <tr key={i.investmentId}>
                    <td>{i.investmentId}</td>
                    <td>{i.fundName}</td>
                    <td>₹{i.amount}</td>
                    <td>{i.riskLevel}</td>
                    <td>{i.userId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SAVINGS */}
          <div className="section">
            <h5>Savings Recommendation</h5>

            <input placeholder="Monthly Income" onChange={(e)=>setMonthlyIncome(e.target.value)} />
            <input placeholder="Monthly Expense" onChange={(e)=>setMonthlyExpense(e.target.value)} />

            <button className="btn btn-warning w-100" onClick={generateSavingsPlan}>
              Generate
            </button>

            {savingsResult && <div className="result-box">{savingsResult}</div>}
          </div>

          {/* RISK */}
          <div className="section">
            <h5>Risk Profiling</h5>

            <input placeholder="Monthly Income" onChange={(e)=>setRiskIncome(e.target.value)} />
            <input placeholder="Monthly Expense" onChange={(e)=>setRiskExpense(e.target.value)} />

            <button className="btn btn-primary w-100" onClick={calculateRiskProfile}>
              Analyze Risk
            </button>

            {riskProfile && <div className="result-box">{riskProfile}</div>}
          </div>

          {/* MF */}
          <div className="section">
            <h5>Mutual Fund Suggestions</h5>

            <button className="btn btn-success w-100" onClick={suggestMF}>
              Get Suggestions
            </button>

            {mfSuggestion && <div className="result-box">{mfSuggestion}</div>}
          </div>

          {/* PORTFOLIO */}
          <div className="section">
            <h5>Portfolio Analytics</h5>

            <div className="result-box">
              Total: ₹{investments.reduce((a,b)=>a+Number(b.amount),0)}
            </div>

            <div className="result-box">
              Total Funds: {investments.length}
            </div>

            <div className="result-box">
              Average Investment: ₹
              {(investments.reduce((a,b)=>a+Number(b.amount),0)/(investments.length||1)).toFixed(2)}
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Investments;
