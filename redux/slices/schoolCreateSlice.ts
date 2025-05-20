import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Address {
  city: string;
  subCity: string;
}

interface SchoolFacility {
  name: string;
}

export interface School {
  name: string;
  email: string;
  address: Address; // <-- Array of Address objects
  phoneNumber: string;
  schoolWebsite?: string;
  schoolType: string;
  division: string[];
  studentCount: number;
  yearEstablished: number;
  schoolFacilites: SchoolFacility[]; // <-- Array of { name }
  facilities: string[]; // <-- Array of base64 image strings, order matches schoolFacilites
  description: string;
  schoolTags?: string[];
  socialMedia?: any[];
  budgetMin: number;
  budgetMax: number;
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

const api = axios.create({
  baseURL: 'https://schoolnet-be.onrender.com/api/v1',
  withCredentials: true
});

export const createSchool = createAsyncThunk(
  'schoolCreate/create',
  async (schoolData: Partial<School>, { rejectWithValue }) => {
    try {
      console.log('Sending school data:', schoolData);
      const response = await api.post('/schools', schoolData, { withCredentials: true });
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