import api from "./api";

/* ✅ REGISTER */
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response;   // ✅ return full response
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    throw error;
  }
};

/* ✅ LOGIN */
export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/auth/login", loginData);
    return response;   // ✅ return full response
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    throw error;
  }
};