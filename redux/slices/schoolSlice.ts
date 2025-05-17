import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Types
interface Address {
  city: string;
  subCity: string;
  _id: string;
}

interface SchoolFacility {
  name: string;
  img_path: string[];
  _id: string;
}

export interface School {
  _id: string;
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
}

export interface SchoolState {
  schools: School[];
  filteredSchools: School[];
  loading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
  itemsPerPage: number;
  filters: {
    searchQuery: string;
    schoolType: string;
    budgetRange: [number, number];
    location: string;
  };
  lastFetched: number | null;
}

// Initial state
const initialState: SchoolState = {
  schools: [],
  filteredSchools: [],
  loading: false,
  error: null,
  totalResults: 0,
  currentPage: 1,
  itemsPerPage: 10,
  filters: {
    searchQuery: '',
    schoolType: 'all',
    budgetRange: [0, 200000],
    location: 'all',
  },
  lastFetched: null,
};

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Async thunk for fetching schools
export const fetchSchools = createAsyncThunk(
  'schools/fetchSchools',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { schools: SchoolState };
      const { lastFetched } = state.schools;

      // Check if we have cached data that's still valid
      if (lastFetched && Date.now() - lastFetched < CACHE_DURATION) {
        return null; // Use cached data
      }

      const response = await axios.get('/api/schools');
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        // Handle token expiration
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch schools');
    }
  }
);

export const schoolSlice = createSlice({
  name: 'schools',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setSchoolType: (state, action: PayloadAction<string>) => {
      state.filters.schoolType = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setBudgetRange: (state, action: PayloadAction<[number, number]>) => {
      state.filters.budgetRange = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.filters.location = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.currentPage = 1;
      applyFilters(state);
    },
    setFilteredSchools: (state, action: PayloadAction<School[]>) => {
      state.filteredSchools = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchools.fulfilled, (state, action) => {
        if (action.payload) {
          state.schools = action.payload.data.schools;
          state.totalResults = action.payload.results;
          state.lastFetched = Date.now();
          applyFilters(state);
        }
        state.loading = false;
      })
      .addCase(fetchSchools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Helper function to apply filters
function applyFilters(state: SchoolState) {
  let filtered = [...state.schools];

  // Apply search query filter
  if (state.filters.searchQuery) {
    const query = state.filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (school) =>
        school.name.toLowerCase().includes(query) ||
        school.description.toLowerCase().includes(query) ||
        school.address.some((addr) =>
          addr.subCity.toLowerCase().includes(query)
        )
    );
  }

  // Apply school type filter
  if (state.filters.schoolType !== 'all') {
    filtered = filtered.filter(
      (school) => school.schoolType.toLowerCase() === state.filters.schoolType.toLowerCase()
    );
  }

  // Apply budget range filter
  filtered = filtered.filter(
    (school) =>
      school.budgetMin >= state.filters.budgetRange[0] &&
      school.budgetMax <= state.filters.budgetRange[1]
  );

  // Apply location filter
  if (state.filters.location !== 'all') {
    filtered = filtered.filter((school) =>
      school.address.some(
        (addr) => addr.subCity.toLowerCase() === state.filters.location.toLowerCase()
      )
    );
  }

  state.filteredSchools = filtered;
}

export const {
  setSearchQuery,
  setSchoolType,
  setBudgetRange,
  setLocation,
  setPage,
  clearFilters,
  setFilteredSchools,
} = schoolSlice.actions;

export default schoolSlice.reducer; 