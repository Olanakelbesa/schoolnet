import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define interfaces
interface Address {
  city: string;
  subCity: string;
}

interface ChildrenDetails {
  gradeLevels: string[];
  schoolType: string[];
}

export interface ParentProfile {
  numberOfChildren: string;
  childrenDetails: ChildrenDetails;
  address: Address;
  budgetMin: number;
  budgetMax: number;
}

// Initial state
const initialState: ParentState = {
  profile: null,
  loading: false,
  error: null,
  hasCompletedQuestionnaire: false,
};

interface ParentState {
  profile: ParentProfile | null;
  loading: boolean;
  error: string | null;
  hasCompletedQuestionnaire: boolean;
}

// Axios instance with credentials
const api = axios.create({
  baseURL: 'https://schoolnet-be.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Create parent profile using only the API endpoint
export const createParentProfile = async (parentProfile: ParentProfile) => {
  try {
    const response = await api.post('/parentProfiles', parentProfile, { 
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    console.log("Parent profile created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating parent profile:', error);
    if (axios.isAxiosError(error)) {
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
    }
    throw error;
  }
};

// Wrap it in a thunk for Redux
export const createParentProfileThunk = createAsyncThunk(
  'parent/createProfile',
  async (parentProfile: ParentProfile, { rejectWithValue }) => {
    try {
      return await createParentProfile(parentProfile);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create parent profile');
    }
  }
);

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
      .addCase(createParentProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createParentProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.hasCompletedQuestionnaire = !!action.payload;
      })
      .addCase(createParentProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to create profile";
      });
  },
});

export const {
  setProfile,
  setLoading,
  setError,
  clearProfile
} = parentSlice.actions;

export default parentSlice.reducer;