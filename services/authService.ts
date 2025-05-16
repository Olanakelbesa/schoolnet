import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post('/users/forgotPassword', { email });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to send reset email');
  }
};

export const verifyForgotResetOtp = async (data: { email: string; otp: string }) => {
  try {
    const response = await api.patch('/users/verifyForgotResetOtp', data);
    // Store the reset token from the response
    if (response.data.resetToken) {
      localStorage.setItem('resetToken', response.data.resetToken);
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to verify OTP');
  }
};

export const resetPassword = async (data: { email: string; newPassword: string }) => {
  try {
    const response = await api.patch('/users/resetPassword', {
      passwordResetToken: localStorage.getItem('resetToken'),
      password: data.newPassword,
      passwordConfirm: data.newPassword
    });
    console.log("Reset password response: ", response);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to reset password');
  }
}; 