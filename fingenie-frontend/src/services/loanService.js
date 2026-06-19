import api from "./api";

// ✅ ✅ FIXED (ROLE-BASED API)
export const getLoans = async () => {
  try {
    const role = localStorage.getItem("role");

    let response;

    // ✅ ADMIN → call admin endpoint
    if (role === "ADMIN") {
      response = await api.get("/admin/loans");
    } 
    // ✅ USER → normal endpoint
    else {
      response = await api.get("/loans");
    }

    return response.data;

  } catch (error) {
    console.error("Error fetching loans:", error);
    return [];
  }
};


// ✅ (NO CHANGE REQUIRED HERE)
export const applyLoan = async (loanData) => {
  const response = await api.post(
    "/loans/apply",
    loanData
  );
  return response.data;
};