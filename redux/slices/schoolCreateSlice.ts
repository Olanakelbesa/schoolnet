import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Address {
    city: string;
    subCity: string;
  }
  
  interface SchoolFacility {
    name: string;
    img_path: string[];
  }
  
  export interface School {
    name: string;
    email: string;
    address: Address[];
    phoneNumber: string;
    schoolWebsite: string;
    schoolType: string;
    division: string[];
    studentCount: number;
    yearEstablished: number;
    schoolFacilites: SchoolFacility[];
    description: string;
    schoolTags: string[];
    socialMedia: any[];
    budgetMin: number;
    budgetMax: number;
    createdAt: string;
    updatedAt: string;
    gender?: string;
    profile_image?: string;
  }

interface SchoolCreateState {
  loading: boolean;
  error: string | null;
  success: boolean;
  currentStep: number;
  formData: Partial<School>;
}

const initialState: SchoolCreateState = {
  loading: false,
  error: null,
  success: false,
  currentStep: 1,
  formData: {}
};

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://schoolnet-be.onrender.com/api/v1',
  withCredentials: true
});

// Remove the request interceptor since we don't need to set headers

// Create school thunk
export const createSchool = createAsyncThunk(
  'schoolCreate/create',
  async (schoolData: Partial<School>, { rejectWithValue }) => {
    try {
      console.log('Sending school data:', schoolData);
      const response = await api.post('/schools', schoolData, {withCredentials: true});
      console.log("resultttttt:", response);
      return response.data;
    } catch (error: any) {
      console.error('Error creating school:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error details:', {
          status: error.response?.status,
          data: error.response?.data,
          config: error.config
        });
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to create school');
    }
  }
);

// Update school thunk
export const updateSchool = createAsyncThunk(
  'schoolCreate/update',
  async (schoolData: Partial<School>, { rejectWithValue }) => {
    try {
      const response = await api.put(`/schools`, schoolData);
      return response.data;
    } catch (error: any) {
      console.error('Error updating school:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error details:', {
          status: error.response?.status,
          data: error.response?.data,
          config: error.config
        });
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to update school');
    }
  }
);

const schoolCreateSlice = createSlice({
  name: 'schoolCreate',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    previousStep: (state) => {
      state.currentStep -= 1;
    },
    resetForm: (state) => {
      state.formData = {};
      state.currentStep = 1;
      state.success = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSchool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSchool.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.formData = {};
        state.currentStep = 1;
      })
      .addCase(createSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateSchool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSchool.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(updateSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFormData,
  nextStep,
  previousStep,
  resetForm,
  clearError
} = schoolCreateSlice.actions;

export default schoolCreateSlice.reducer;