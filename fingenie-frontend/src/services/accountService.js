import api from "./api";
 
export const getAllAccounts = async () => {
  const response = await api.get("/api/accounts");
  return response.data;
};
 
export const getAccountById = async (id) => {
  const response = await api.get(`/api/accounts/${id}`);
  return response.data;
};
 
export const createAccount = async (accountData) => {
  const response = await api.post(
    "/api/accounts",
    accountData
  );
 
  return response.data;
};
 
export const updateAccount = async (
  id,
  accountData
) => {
  const response = await api.put(
    `/api/accounts/${id}`,
    accountData
  );
 
  return response.data;
};
 
export const deleteAccount = async (id) => {
  const response = await api.delete(
    `/api/accounts/${id}`
  );
 
  return response.data;
};