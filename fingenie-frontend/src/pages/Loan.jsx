import React, { useEffect, useState } from "react";
import { getLoans, applyLoan } from "../services/loanService";
import BackButton from "../components/BackButton";

function Loan() {

  const [loans, setLoans] = useState([]);

  const [formData, setFormData] = useState({
    loanType: "",
    amount: "",
    salary: "",
    creditScore: "",
    userId: ""
  });

  const [loanAmount,setLoanAmount]=useState("");
  const [interestRate,setInterestRate]=useState("");
  const [tenure,setTenure]=useState("");
  const [emi,setEmi]=useState(null);

  const [creditInput,setCreditInput]=useState("");
  const [creditResult,setCreditResult]=useState(null);

  useEffect(() => { loadLoans(); }, []);

  const loadLoans = async () => {
    try {
      const role = localStorage.getItem("role");
      const userId = localStorage.getItem("userId");

      const res = await getLoans();
      const data = res?.data ? res.data : res;

      if (role !== "ADMIN") {
        const filtered = data.filter(
          (loan) => String(loan.userId) === String(userId)
        );
        setLoans(filtered);
      } else {
        setLoans(data);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem("userId");

      const updatedData = {
        ...formData,
        userId: userId
      };

      await applyLoan(updatedData);

      alert("Loan Applied Successfully");

      setFormData({
        loanType: "",
        amount: "",
        salary: "",
        creditScore: "",
        userId: ""
      });

      loadLoans();

    } catch (error) {
      console.error(error);
      alert("Error Applying Loan");
    }
  };

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate)/12/100;
    const N = parseFloat(tenure)*12;

    if(!P || !R || !N){
      alert("Please fill all EMI fields");
      return;
    }

    const EMI = (P*R*Math.pow(1+R,N))/(Math.pow(1+R,N)-1);
    setEmi(EMI.toFixed(2));
  };

  const analyzeCreditScore = () => {
    const score = Number(creditInput);

    if(score >= 750){
      setCreditResult({text:"✅ Excellent Score",desc:"Very high chance of approval",color:"#28a745"});
    }
    else if(score >= 650){
      setCreditResult({text:"🟡 Good Score",desc:"Moderate chance of approval",color:"#ffc107"});
    }
    else{
      setCreditResult({text:"❌ Low Score",desc:"High rejection risk",color:"#dc3545"});
    }
  };

  return (
    <>
      <style>{`

        body {
          background: linear-gradient(135deg,#eef4ff,#ffffff);
          font-family: 'Segoe UI';
        }

        /* HEADER */
        .topbar {
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:18px 25px;
          margin-bottom:30px;
          background: linear-gradient(90deg,#007bff,#00c6ff);
          color:white;
          border-radius:15px;
          box-shadow:0 10px 30px rgba(0,0,0,0.2);
        }

        .main {
          padding:25px;
        }

        /* GRID */
        .layout {
          display:grid;
          grid-template-columns: 1fr 2fr;
          gap:30px;
        }

        /* CARD */
        .card-pro {
          background:white;
          padding:22px;
          border-radius:18px;
          box-shadow:0 15px 40px rgba(0,0,0,0.08);
          margin-bottom:25px;
          transition:0.3s;
        }

        .card-pro:hover {
          transform: translateY(-4px);
        }

        .section-title {
          font-weight:700;
          font-size:17px;
          margin-bottom:15px;
          color:#2c3e50;
        }

        /* INPUT */
        .form-control {
          margin-bottom:14px;
          padding:12px;
          border-radius:10px;
          border:1px solid #ccc;
          transition:0.3s;
        }

        .form-control:focus {
          border-color:#007bff;
          box-shadow:0 0 6px rgba(0,123,255,0.3);
        }

        /* BUTTON */
        .btn {
          border-radius:25px;
          padding:10px;
          font-weight:600;
        }

        .btn-primary {
          background:linear-gradient(45deg,#007bff,#00c6ff);
          border:none;
        }

        .btn-warning {
          background:linear-gradient(45deg,#ffc107,#ff9800);
          border:none;
        }

        .btn-success {
          background:linear-gradient(45deg,#28a745,#00c851);
          border:none;
        }

        /* ✅ TABLE DESIGN */
        table {
          width:100%;
          border-collapse:separate;
          border-spacing:0 10px;
        }

        thead tr {
          background:linear-gradient(90deg,#007bff,#00c6ff);
          color:white;
          border-radius:10px;
        }

        thead th {
          padding:12px;
          text-align:center;
        }

        tbody tr {
          background:white;
          box-shadow:0 5px 12px rgba(0,0,0,0.05);
          transition:0.3s;
        }

        tbody tr:hover {
          background:#f5faff;
          transform:scale(1.01);
        }

        tbody td {
          padding:12px;
          text-align:center;
        }

        /* CREDIT BOX */
        .credit-box {
          margin-top:15px;
          padding:15px;
          border-radius:12px;
          color:white;
          font-weight:bold;
          text-align:center;
          box-shadow:0 8px 20px rgba(0,0,0,0.15);
        }

        /* EMI BOX */
        .emi-box {
          margin-top:15px;
          padding:18px;
          border-radius:12px;
          background:linear-gradient(45deg,#e3f2fd,#bbdefb);
          font-size:16px;
          font-weight:bold;
          text-align:center;
        }

      `}</style>

      <div className="topbar">
        <div>🏦 Loan Management System</div>
        <BackButton />
      </div>

      <div className="main">

        <div className="layout">

          {/* LEFT */}
          <div>

            <div className="card-pro">
              <div className="section-title">Apply Loan</div>

              <form onSubmit={handleSubmit}>
                <input className="form-control" name="loanType" placeholder="Loan Type" onChange={handleChange}/>
                <input className="form-control" name="amount" placeholder="Amount" onChange={handleChange}/>
                <input className="form-control" name="salary" placeholder="Salary" onChange={handleChange}/>
                <input className="form-control" name="creditScore" placeholder="Credit Score" onChange={handleChange}/>

                <input className="form-control"
                  value={localStorage.getItem("userId") || ""}
                  disabled
                />

                <button className="btn btn-primary w-100">Apply Loan</button>
              </form>
            </div>

            <div className="card-pro">
              <div className="section-title">Credit Analysis</div>

              <input className="form-control"
                placeholder="Enter Credit Score"
                onChange={(e)=>setCreditInput(e.target.value)}
              />

              <button className="btn btn-warning w-100"
                onClick={analyzeCreditScore}>
                Analyze
              </button>

              {creditResult && (
                <div className="credit-box" style={{background:creditResult.color}}>
                  {creditResult.text}<br/>
                  <small>{creditResult.desc}</small>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT */}
          <div>

            <div className="card-pro">
              <div className="section-title">Loan Records</div>

              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Loan</th>
                    <th>Amount</th>
                    <th>Salary</th>
                    <th>Score</th>
                    <th>Status</th>
                    <th>User</th>
                  </tr>
                </thead>

                <tbody>
                  {loans.map(l => (
                    <tr key={l.loanId}>
                      <td>{l.loanId}</td>
                      <td>{l.loanType}</td>
                      <td>₹{l.amount}</td>
                      <td>{l.salary}</td>
                      <td>{l.creditScore}</td>
                      <td>{l.status}</td>
                      <td>{l.userId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card-pro">
              <div className="section-title">EMI Calculator</div>

              <input className="form-control" placeholder="Loan Amount"
                onChange={(e)=>setLoanAmount(e.target.value)} />

              <input className="form-control" placeholder="Interest Rate (%)"
                onChange={(e)=>setInterestRate(e.target.value)} />

              <input className="form-control" placeholder="Tenure (Years)"
                onChange={(e)=>setTenure(e.target.value)} />

              <button className="btn btn-success w-100"
                onClick={calculateEMI}>
                Calculate EMI
              </button>

              {emi && (
                <div className="emi-box">
                  Monthly EMI: ₹{emi}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Loan;