import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Define the user interface
interface User {
  id: string;
  email: string;
  phone?: string;
}

// Define the auth state interface
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  verificationMessage: string | null;
  otpSent: boolean;
  token: string | null;
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  verificationMessage: null,
  otpSent: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.verificationMessage = null;
      state.otpSent = false;
      state.token = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setVerificationMessage: (state, action: PayloadAction<string | null>) => {
      state.verificationMessage = action.payload;
    },
    setOtpSent: (state, action: PayloadAction<boolean>) => {
      state.otpSent = action.payload;
    },
  },
});

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

// Async thunk for signup
export const signup = async (userData: {
  email: string;
  password: string;
  phoneNumber: string;
  passwordConfirm: string
}) => {
  try {
    const response = await api.post('/users/signup', userData);
    // Store token if provided in response
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    console.log("sign up response: ", response);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};

// Async thunk for verifying OTP
export const verifyOtp = async (data: { email: string; otp: string }) => {
  console.log("email: ", data);
  try {
    const response = await api.patch('/users/verifyEmail', data);

    console.log("otp response: ", response);
    return response.data;
  } catch (error: any) {
    console.error('OTP verification error:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      'OTP verification failed'
    );
  }
};

// Async thunk for forgot password
export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post('/users/forgotPassword', { email });
    console.log("Forgot password response: ", response);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Forgot password request failed');
  }
};

// Async thunk for verifying OTP for password reset
export const verifyForgotResetOtp = async (data: { email: string; otp: string }) => {
  try {
    const response = await api.patch('/users/verifyForgotResetOtp', data);
    console.log("Verify forgot reset OTP response: ", response);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'OTP verification for password reset failed');
  }
};

// Async thunk for resetting password
export const resetPassword = async (data: { email: string; newPassword: string }) => {
  try {
    const response = await api.patch('/users/resetPassword', data);
    console.log("Reset password response: ", response);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Password reset failed');
  }
};

export const {
  setAuth,
  clearAuth,
  setLoading,
  setError,
  setVerificationMessage,
  setOtpSent
} = authSlice.actions;

export default authSlice.reducer;