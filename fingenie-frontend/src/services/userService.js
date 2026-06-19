import api from "./api";

/* ✅ GET ALL USERS (ADMIN) */
export const getUsers = async () => {
  const response = await api.get("/users"); // ✅ FIXED
  return response.data;
};

/* ✅ GET USER BY ID */
export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`); // ✅ FIXED
  return response.data;
};

/* ✅ CREATE USER */
export const createUser = async (data) => {
  const response = await api.post("/users", data); // ✅ FIXED
  return response.data;
};

/* ✅ UPDATE USER */
export const updateUser = async (id, data) => {
  const response = await api.put(`/users/${id}`, data); // ✅ FIXED
  return response.data;
};

/* ✅ DELETE USER */
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`); // ✅ FIXED
  return response.data;
};
