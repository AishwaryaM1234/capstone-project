import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}  // ✅ go back
      style={{
        background: "#333",
        color: "#fff",
        border: "none",
        padding: "8px 16px",
        borderRadius: "20px",
        cursor: "pointer",
        marginBottom: "15px"
      }}
    >
      ⬅ Back
    </button>
  );
}

export default BackButton;