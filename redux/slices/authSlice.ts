import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Define the user interface
interface User {
  _id: string;
  email: string;
  phoneNumber: string;
  isVerifiedEmail: boolean;
  role: string;
  mfaEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  onboardingCompleted?: boolean;
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
  passwordResetToken: string | null;
  roleUpdateRetries: number;
}

// Helper function to get token from localStorage safely
const getStoredToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  verificationMessage: null,
  otpSent: false,
  token: getStoredToken(),
  passwordResetToken: null,
  roleUpdateRetries: 0,
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
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
      }
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.verificationMessage = null;
      state.otpSent = false;
      state.token = null;
      localStorage.removeItem('token'); // Clear token from localStorage on logout
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
    updateUserRole: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.role = action.payload;
      }
    },
    setRoleUpdateRetries: (state, action: PayloadAction<number>) => {
      state.roleUpdateRetries = action.payload;
    },
    setOnboardingCompleted: (state, action: PayloadAction<boolean>) => {
      if (state.user) {
        state.user.onboardingCompleted = action.payload;
      }
    },
  },
});

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Enable credentials for all requests
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
    
    if (response.data.token) {
      return { ...response.data, token: response.data.token };
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};

// Async thunk for verifying OTP
export const verifyOtp = async (data: { email: string; otp: string }) => {
  try {
    const response = await api.patch('/users/verifyEmail', data);
    return response.data;
  } catch (error: any) {
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
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Forgot password request failed');
  }
};

// Async thunk for verifying OTP for password reset
export const verifyForgotResetOtp = async (data: { email: string; otp: string }) => {
  try {
    const response = await api.patch('/users/verifyForgotResetOtp', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'OTP verification for password reset failed');
  }
};

// Async thunk for resetting password
export const resetPassword = async (data: { email: string; newPassword: string; passwordConfirm: string }) => {
  try {
    const passwordResetToken = localStorage.getItem('passwordResetToken');
    
    if (!passwordResetToken) {
      throw new Error('Password reset token not found');
    }

    const requestData = {
      passwordResetToken,
      password: data.newPassword,
      passwordConfirm: data.passwordConfirm
    };

    const response = await api.patch('/users/resetPassword', requestData);
    
    // Clear the password reset token after successful reset
    localStorage.removeItem('passwordResetToken');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Password reset failed');
  }
};

// Async thunk for updating user role with retry logic
export const updateRole = async (role: string) => {
  let retries = 0;
  const maxRetries = 2;

  while (retries < maxRetries) {
    try {
      const response = await api.patch('/users/updateRole', 
        { role }, 
        {
          withCredentials: true
        }
      );
      return response.data;
    } catch (error: any) {
      retries++;
      if (retries === maxRetries) {
        throw new Error(error.response?.data?.message || 'Failed to update role after multiple attempts');
      }
      // Wait for 1 second before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
};

// Async thunk for updating onboarding status
export const updateOnboardingStatus = async (completed: boolean) => {
  try {
    const response = await api.patch('/users/updateOnboardingStatus', { onboardingCompleted: completed }, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update onboarding status');
  }
};

// Async thunk for login
export const login = async (email: string, password: string) => {
  try {

    const response = await api.post('/users/login', { email, password });

    
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const logout = async () => {
  try {
    const response = await api.post('/users/logout', {}, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};

export const {
  setAuth,
  clearAuth,
  setLoading,
  setError,
  setVerificationMessage,
  setOtpSent,
  updateUserRole,
  setRoleUpdateRetries,
  setOnboardingCompleted
} = authSlice.actions;

export default authSlice.reducer;