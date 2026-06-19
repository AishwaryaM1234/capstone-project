import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

      if (!response || !response.data) {
        throw new Error("No response from backend");
      }

      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", "USER");

      localStorage.setItem("userId", "16");
      localStorage.setItem("accountId", "7");

      const otp = Math.floor(100000 + Math.random() * 900000);
      setGeneratedOtp(otp.toString());
      setOtpSent(true);

      alert("OTP: " + otp);

    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert("Login Failed");
    }
  };

  const verifyOtp = () => {
    if (enteredOtp === generatedOtp) {
      alert("✅ Login Successful");
      navigate("/dashboard");
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

        .login-wrapper {
          display: flex;
          height: 100vh;
        }

        /* LEFT SIDE */
        .login-left {
          flex: 1;
          background: linear-gradient(135deg, #007bff, #00c6ff);
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .login-left h1 {
          font-size: 42px;
          font-weight: bold;
        }

        .login-left p {
          font-size: 16px;
          opacity: 0.9;
        }

        /* RIGHT SIDE */
        .login-right {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f5f7fb;
        }

        .login-card {
          width: 350px;
          padding: 30px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .login-title {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .login-card input {
          width: 100%;
          padding: 12px;
          margin-bottom: 12px;
          border-radius: 10px;
          border: 1px solid #ccc;
        }

        .login-card input:focus {
          border-color: #007bff;
          outline: none;
          box-shadow: 0 0 5px rgba(0,123,255,0.3);
        }

        .login-card button {
          width: 100%;
          padding: 12px;
          border-radius: 25px;
          border: none;
          background: linear-gradient(45deg, #007bff, #00c6ff);
          color: white;
          font-weight: 600;
          margin-top: 10px;
          cursor: pointer;
          transition: 0.3s;
        }

        .login-card button:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(0,123,255,0.3);
        }

        .login-links {
          margin-top: 15px;
          text-align: center;
        }

        .login-links a {
          display: block;
          margin: 5px 0;
          text-decoration: none;
          color: #007bff;
          font-weight: 500;
        }

        .admin-btn {
          background: #6c757d;
        }

        .admin-btn:hover {
          background: #495057;
        }

      `}</style>

      <div className="login-wrapper">

        {/* LEFT */}
        <div className="login-left">
          <h1>🏦 FinGenie</h1>
          <p>Smart Banking Platform</p>
        </div>

        {/* RIGHT */}
        <div className="login-right">

          <div className="login-card">
            <div className="login-title">User Login</div>

            {!otpSent && (
              <form onSubmit={handleSubmit}>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button>Login</button>

              </form>
            )}

            {otpSent && (
              <>
                <input
                  placeholder="Enter OTP"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                />

                <button onClick={verifyOtp}>
                  Verify OTP
                </button>
              </>
            )}

            <div className="login-links">

              <Link to="/register">Create New Account</Link>

              <button
                className="admin-btn"
                onClick={() => navigate("/admin-login")}
              >
                Admin Login
              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Login;