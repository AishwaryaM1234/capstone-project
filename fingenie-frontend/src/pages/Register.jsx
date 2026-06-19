import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "USER"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending Data:", formData);

    try {
      await registerUser(formData);
      alert("Registration Successful");
      navigate("/");
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("RESPONSE:", error.response);
      console.log("DATA:", error.response?.data);

      alert("Registration Failed");
    }
  };

  return (
    <>
      <style>{`

        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(135deg,#e3f2fd,#ffffff);
        }

        .register-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .register-card {
          width: 400px;
          padding: 30px;
          background: white;
          border-radius: 18px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .title {
          text-align: center;
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #007bff;
        }

        .form-control {
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 12px;
        }

        .form-control:focus {
          border-color: #007bff;
          box-shadow: 0 0 6px rgba(0,123,255,0.3);
        }

        .btn-register {
          width: 100%;
          padding: 12px;
          border-radius: 30px;
          background: linear-gradient(45deg,#28a745,#00c851);
          color: white;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .btn-register:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(40,167,69,0.3);
        }

        .footer-link {
          margin-top: 15px;
          text-align: center;
          font-size: 14px;
        }

        .footer-link a {
          color: #007bff;
          text-decoration: none;
          font-weight: 500;
        }

      `}</style>

      <div className="register-container">

        <div className="register-card">

          <div className="title">🏦 FinGenie Register</div>

          <form onSubmit={handleSubmit}>

            <input
              className="form-control"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
            />

            <input
              className="form-control"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />

            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />

            <input
              className="form-control"
              name="phoneNumber"
              placeholder="Phone Number"
              onChange={handleChange}
            />

            <select
              className="form-control"
              name="role"
              onChange={handleChange}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>

            <button className="btn-register" type="submit">
              Register
            </button>

          </form>

          <div className="footer-link">
            Already have an account? <a href="/">Login</a>
          </div>

        </div>

      </div>
    </>
  );
}

export default Register;
