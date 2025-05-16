import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Define interfaces
interface Address {
  city: string;
  subCity: string;
}

interface ChildrenDetails {
  gradeLevels: string[];
  schoolType: string[];
}

interface ParentProfile {
  numberOfChildren: string;
  childrenDetails: ChildrenDetails;
  address: Address;
  budgetMin: number;
  budgetMax: number;
}

interface ParentState {
  profile: ParentProfile | null;
  loading: boolean;
  error: string | null;
  hasCompletedQuestionnaire: boolean;
}

// Initial state
const initialState: ParentState = {
  profile: null,
  loading: false,
  error: null,
  hasCompletedQuestionnaire: false,
};

const parentSlice = createSlice({
  name: 'parent',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ParentProfile>) => {
      state.profile = action.payload;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getParentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getParentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.hasCompletedQuestionnaire = !!action.payload;
      })
      .addCase(getParentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch profile";
        state.hasCompletedQuestionnaire = false;
      });
  },
});

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api', // Changed to use relative path for Next.js API routes
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true
});

console.log("API:", api);
// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  // Ensure headers object exists
  config.headers = config.headers || {};
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Async thunk for creating parent profile
export const createParentProfile = async (profileData: ParentProfile, token: string) => {
  try {
    console.log("Creating parent profile with data:", profileData);
    
    const response = await api.post('/parentProfiles', profileData);
    
    console.log("Create profile response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error creating parent profile:', error.response?.data || error);
    throw new Error(error.response?.data?.message || 'Failed to create parent profile');
  }
};

export const getParentProfile = createAsyncThunk(
  "parent/getProfile",
  async (token: string) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/parentProfiles",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching parent profile:", error);
      throw error;
    }
  }
);

export const {
  setProfile,
  setLoading,
  setError,
  clearProfile
} = parentSlice.actions;

export default parentSlice.reducer; 