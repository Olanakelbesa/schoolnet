import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { mockSchools } from '../mockData/schools';

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
  profile_image?: string;
}

export interface SchoolState {
  schools: School[];
  filteredSchools: School[];
  selectedSchool: School | null;
  loading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
  itemsPerPage: number;
  favoriteIds: string[];
  sortBy: {
    field: 'name' | 'subCity' | 'schoolTags' | 'budgetMin' | 'budgetMax';
    direction: 'asc' | 'desc';
  };
  categories: {
    types: string[];
    locations: string[];
    selectedType: string;
    selectedLocation: string;
  };
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
  selectedSchool: null,
  loading: false,
  error: null,
  totalResults: 0,
  currentPage: 1,
  itemsPerPage: 9,
  favoriteIds: [],
  sortBy: {
    field: 'name',
    direction: 'asc'
  },
  categories: {
    types: [],
    locations: [],
    selectedType: 'all',
    selectedLocation: 'all'
  },
  filters: {
    searchQuery: '',
    schoolType: 'all',
    budgetRange: [0, 200000],
    location: 'all',
  },
  lastFetched: null,
};

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://schoolnet-be.onrender.com/api/v1',
  withCredentials: true,
});

// Add request interceptor to include token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   config.headers['Access-Control-Allow-Origin'] = '*';
//   config.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
//   config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
//   return config;
// });

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      console.error('API Error Request:', error.request);
    } else {
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Async thunk for fetching all schools
export const fetchAllSchools = createAsyncThunk(
  'schools/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching schools from API...');
      const response = await api.get('/schools', {withCredentials: true});
      console.log('Raw API response:', response.data);
      
      if (!response.data?.data?.schools) {
        console.error('No schools data in response');
        return rejectWithValue('No schools data received from server');
      }
      
      const schools = response.data.data.schools;
      console.log('Schools fetched successfully:', {
        count: schools.length,
        sample: schools.slice(0, 2).map((s: { name: any; schoolType: any; address: { subCity: any; }[]; }) => ({
          name: s.name,
          type: s.schoolType,
          subCity: s.address?.[0]?.subCity
        }))
      });
      
      return { data: schools };
    } catch (error: any) {
      console.error('Error fetching schools:', error);
      console.log('Using mock data instead');
      return { data: mockSchools };
    }
  }
);

// Add new async thunk for fetching school by ID
export const fetchSchoolById = createAsyncThunk(
  'schools/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/schools/${id}`, {withCredentials: true});
      console.log('School fetched successfully:', response.data);
      
      if (!response.data?.data?.school) {
        console.error('No school data in response');
        return rejectWithValue('No school data received from server');
      }
      
      return { data: response.data.data.school };
    } catch (error: any) {
      console.error('Error fetching school:', error);
      console.log('Using mock data instead');
      const mockSchool = mockSchools.find(school => school._id === id);
      if (!mockSchool) {
        return rejectWithValue('School not found');
      }
      return { data: mockSchool };
    }
  }
);

// Add filter schools thunk
export const filterSchools = createAsyncThunk(
  'schools/filter',
  async (filterParams: {
    address: {
      city: string;
      subCity: string;
    };
    budgetMin: number;
    budgetMax: number;
    schoolType: string[];
    googleRatings: number;
    gender: string;
  }, { rejectWithValue }) => {
    try {
      const response = await api.post('/schools/filter', filterParams);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to filter schools');
    }
  }
);

// Add createSchool action
export const createSchool = createAsyncThunk(
  'schools/create',
  async (schoolData: Partial<School>, { rejectWithValue }) => {
    try {
      console.log('Creating school with data:', schoolData);
      const response = await api.post('/schools', schoolData, {
        withCredentials: true
      });
      console.log('School created successfully:', response.data);
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

// Add updateSchool action
export const updateSchool = createAsyncThunk(
  'schools/update',
  async (schoolData: Partial<School>, { rejectWithValue }) => {
    try {
      const response = await api.put(`/schools/${schoolData._id}`, schoolData, {withCredentials: true});
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update school');
    }
  }
);

// Add fetchSchoolProfile action
export const fetchSchoolProfile = createAsyncThunk(
  'schools/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/schools/profile', {withCredentials: true});
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch school profile');
    }
  }
);

// Helper function to sort schools
const sortSchools = (schools: School[], field: string, direction: 'asc' | 'desc') => {
  return [...schools].sort((a, b) => {
    let valueA, valueB;

    switch (field) {
      case 'name':
        valueA = a.name.toLowerCase();
        valueB = b.name.toLowerCase();
        break;
      case 'subCity':
        valueA = a.address?.[0]?.subCity?.toLowerCase() || '';
        valueB = b.address?.[0]?.subCity?.toLowerCase() || '';
        break;
      case 'schoolTags':
        valueA = a.schoolTags?.[0]?.toLowerCase() || '';
        valueB = b.schoolTags?.[0]?.toLowerCase() || '';
        break;
      case 'budgetMin':
        valueA = a.budgetMin || 0;
        valueB = b.budgetMin || 0;
        break;
      case 'budgetMax':
        valueA = a.budgetMax || 0;
        valueB = b.budgetMax || 0;
        break;
      default:
        valueA = a.name.toLowerCase();
        valueB = b.name.toLowerCase();
    }

    if (direction === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });
};

// Helper function to apply filters
function applyFilters(state: SchoolState) {
  console.log('Applying filters:', {
    totalSchools: state.schools.length,
    searchQuery: state.filters.searchQuery,
    selectedType: state.categories.selectedType,
    selectedLocation: state.categories.selectedLocation
  });

  let filtered = [...state.schools];

  // Apply search query filter
  if (state.filters.searchQuery) {
    const query = state.filters.searchQuery.toLowerCase().trim();
    console.log('Applying search filter:', query);
    
    filtered = filtered.filter(
      (school) => {
        const matchesName = school.name.toLowerCase().includes(query);
        const matchesDescription = school.description?.toLowerCase().includes(query) || false;
        const matchesSubCity = school.address?.some(
          (addr) => addr.subCity?.toLowerCase().includes(query)
        ) || false;
        const matchesSchoolType = school.schoolType?.toLowerCase().includes(query) || false;

        const matches = matchesName || matchesDescription || matchesSubCity || matchesSchoolType;
        
        if (matches) {
          console.log('School matches search:', {
            name: school.name,
            type: school.schoolType,
            subCity: school.address?.[0]?.subCity
          });
        }
        
        return matches;
      }
    );
    
    console.log('After search filter:', {
      count: filtered.length,
      sample: filtered.slice(0, 2).map(s => ({
        name: s.name,
        type: s.schoolType,
        subCity: s.address?.[0]?.subCity
      }))
    });
  }

  // Apply school type filter
  if (state.categories.selectedType !== 'all') {
    const selectedType = state.categories.selectedType.toLowerCase();
    console.log('Filtering by school type:', selectedType);
    filtered = filtered.filter(
      (school) => school.schoolType?.toLowerCase() === selectedType
    );
    console.log('After school type filter:', {
      count: filtered.length,
      sample: filtered.slice(0, 2).map(s => ({
        name: s.name,
        type: s.schoolType
      }))
    });
  }

  // Apply location filter
  if (state.categories.selectedLocation !== 'all') {
    const selectedLocation = state.categories.selectedLocation.toLowerCase();
    console.log('Filtering by location:', selectedLocation);
    filtered = filtered.filter((school) =>
      school.address?.some(
        (addr) => addr.subCity?.toLowerCase() === selectedLocation
      )
    );
    console.log('After location filter:', {
      count: filtered.length,
      sample: filtered.slice(0, 2).map(s => ({
        name: s.name,
        subCity: s.address?.[0]?.subCity
      }))
    });
  }

  // Apply budget range filter
  filtered = filtered.filter(
    (school) =>
      school.budgetMin >= state.filters.budgetRange[0] &&
      school.budgetMax <= state.filters.budgetRange[1]
  );

  // Apply sorting
  filtered = sortSchools(filtered, state.sortBy.field, state.sortBy.direction);

  console.log("Final filter results:", {
    searchQuery: state.filters.searchQuery,
    selectedType: state.categories.selectedType,
    selectedLocation: state.categories.selectedLocation,
    filteredCount: filtered.length,
    totalSchools: state.schools.length
  });

  state.filteredSchools = filtered;
  state.totalResults = filtered.length;
}

const schoolSlice = createSlice({
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
    clearSelectedSchool: (state) => {
      state.selectedSchool = null;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const index = state.favoriteIds.indexOf(action.payload);
      if (index === -1) {
        state.favoriteIds.push(action.payload);
      } else {
        state.favoriteIds.splice(index, 1);
      }
      // Save to localStorage
      localStorage.setItem('favoriteSchools', JSON.stringify(state.favoriteIds));
    },
    setSortBy: (state, action: PayloadAction<{ field: 'name' | 'subCity' | 'schoolTags' | 'budgetMin' | 'budgetMax'; direction: 'asc' | 'desc' }>) => {
      state.sortBy = action.payload;
      state.schools = sortSchools(state.schools, action.payload.field, action.payload.direction);
      state.filteredSchools = sortSchools(state.filteredSchools, action.payload.field, action.payload.direction);
    },
    loadFavorites: (state) => {
      const savedFavorites = localStorage.getItem('favoriteSchools');
      if (savedFavorites) {
        state.favoriteIds = JSON.parse(savedFavorites);
      }
    },
    setCategories: (state, action: PayloadAction<{ types: string[]; locations: string[] }>) => {
      state.categories.types = action.payload.types;
      state.categories.locations = action.payload.locations;
    },
    setSelectedType: (state, action: PayloadAction<string>) => {
      state.categories.selectedType = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setSelectedLocation: (state, action: PayloadAction<string>) => {
      state.categories.selectedLocation = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    clearCategoryFilters: (state) => {
      state.categories.selectedType = 'all';
      state.categories.selectedLocation = 'all';
      state.currentPage = 1;
      applyFilters(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSchools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSchools.fulfilled, (state, action) => {
        state.loading = false;
        state.schools = action.payload.data || [];
        state.filteredSchools = action.payload.data || [];
        state.totalResults = action.payload.data?.length || 0;
        state.lastFetched = Date.now();

        // Update categories when schools are fetched
        const types = Array.from(new Set(action.payload.data?.map((school: School) => school.schoolType) || [])) as string[];
        const locations = Array.from(new Set(action.payload.data?.map((school: School) => school.address?.[0]?.subCity) || [])).filter(Boolean) as string[];
        state.categories.types = types;
        state.categories.locations = locations;
      })
      .addCase(fetchAllSchools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch schools';
      })
      .addCase(fetchSchoolById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchoolById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSchool = action.payload.data;
        state.error = null;
      })
      .addCase(fetchSchoolById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch school';
        state.selectedSchool = null;
      })
      .addCase(filterSchools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterSchools.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredSchools = action.payload.data || [];
        state.totalResults = action.payload.data?.length || 0;
        state.error = null;
      })
      .addCase(filterSchools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to filter schools';
        state.filteredSchools = [];
      })
      .addCase(createSchool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSchool.fulfilled, (state, action) => {
        state.loading = false;
        state.schools.push(action.payload.data.school);
        state.filteredSchools = state.schools;
      })
      .addCase(createSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateSchool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSchool.fulfilled, (state, action) => {
        state.loading = false;
        state.schools = state.schools.map(school =>
          school._id === action.payload.data.school._id ? action.payload.data.school : school
        );
        state.filteredSchools = state.schools;
      })
      .addCase(updateSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSchoolProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchoolProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSchool = action.payload.data;
        state.error = null;
      })
      .addCase(fetchSchoolProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch school profile';
        state.selectedSchool = null;
      });
  },
});

export const {
  setSearchQuery,
  setSchoolType,
  setBudgetRange,
  setLocation,
  setPage,
  clearFilters,
  clearSelectedSchool,
  toggleFavorite,
  setSortBy,
  loadFavorites,
  setCategories,
  setSelectedType,
  setSelectedLocation,
  clearCategoryFilters,
} = schoolSlice.actions;

export default schoolSlice.reducer; 