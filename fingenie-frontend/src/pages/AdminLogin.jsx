import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "admin@fingenie.com" &&
      password === "admin123"
    ) {
      const otpCode = Math.floor(100000 + Math.random() * 900000);

      setGeneratedOtp(otpCode.toString());
      setOtpSent(true);

      alert("Your OTP: " + otpCode);
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {

      localStorage.setItem("role", "ADMIN");
      localStorage.setItem("userId", "admin");

      alert("✅ Login Successful");

      navigate("/admin-dashboard");

    } else {
      alert("❌ Invalid OTP");
    }
  };

  return (
    <>
      <style>{`

        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
        }

        .login-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #4facfe, #00f2fe);
        }

        .login-card {
          width: 420px;
          padding: 35px;
          border-radius: 20px;
          background: white;
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
        }

        .title {
          text-align: center;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 25px;
          color: #2c3e50;
        }

        .form-control {
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          width: 100%;
        }

        .btn-primary {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 30px;
          background: linear-gradient(45deg, #007bff, #00c6ff);
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .btn-primary:hover {
          transform: scale(1.05);
        }

        .btn-success {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 30px;
          background: linear-gradient(45deg, #28a745, #00c851);
          color: white;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
        }

        .back-btn {
          width: 100%;
          margin-top: 15px;
          padding: 10px;
          border-radius: 25px;
          border: none;
          background: #6c757d;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: 0.3s;
        }

        .back-btn:hover {
          background: #495057;
          transform: scale(1.05);
        }

      `}</style>

      <div className="login-container">

        <div className="login-card">

          <div className="title">🏦 Admin Login</div>

          {!otpSent ? (
            <form onSubmit={handleLogin}>

              <input
                className="form-control"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="btn-primary">
                Login
              </button>

              {/* ✅ BACK BUTTON */}
              <button
                type="button"
                className="back-btn"
                onClick={() => navigate("/login")}
              >
                ← Back to User Login
              </button>

            </form>
          ) : (
            <div>

              <input
                className="form-control"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button className="btn-success" onClick={handleVerifyOtp}>
                Verify OTP
              </button>

              {/* ✅ BACK BUTTON */}
              <button
                className="back-btn"
                onClick={() => navigate("/login")}
              >
                ← Back to User Login
              </button>

            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default AdminLogin;