import apiClient from "@/api/apiClient.js";

const authStartEndpoint = "users";

const login = async (data) => {
  return apiClient.get(`${authStartEndpoint}/login`, { params: data });
};

const signup = async (data) => {
  return apiClient.post(`${authStartEndpoint}/signup`, data);
};

const forgotPass = async (data) => {
  return apiClient.post(`${authStartEndpoint}/forgotPassword`, data);
};

const resetPass = async (data, token) => {
  return apiClient.patch(`users/resetPassword/${token}`, data);
};

export default { login, signup, forgotPass, resetPass };
