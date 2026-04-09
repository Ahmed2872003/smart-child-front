import apiClient from "@/api/apiClient.js";

const authStartEndpoint = "users";

const login = async (data) => {
  return apiClient.post(`${authStartEndpoint}/login`, data);
};

const signup = async (data) => {
  return apiClient.post(`${authStartEndpoint}/signup`, data);
};

const forgotPass = async (data) => {
  return apiClient.post(`${authStartEndpoint}/forgotPassword`, data);
};

const resetPass = async (data, token) => {
  return apiClient.patch(`${authStartEndpoint}/resetPassword/${token}`, data);
};

const verifyEmail = async (data) => {
  return apiClient.post(`${authStartEndpoint}/verify-email`, data);
};

const confirmEmail = async (token) => {
  return apiClient.post(
    `${authStartEndpoint}/confirm-email/${token}`,
    {},
    { silent_error: true },
  );
};

export default {
  login,
  signup,
  forgotPass,
  resetPass,
  verifyEmail,
  confirmEmail,
};
