import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Define interfaces for analytics data
interface PerformanceData {
  name: string;
  score: number;
}

interface EnrollmentData {
  name: string;
  students: number;
}

interface GradeDistribution {
  name: string;
  value: number;
}

interface SchoolComparison {
  name: string;
  score: number;
}

interface SubjectPerformance {
  subject: string;
  score: number;
}

interface Demographics {
  category: string;
  male?: number;
  female?: number;
  junior?: number;
  senior?: number;
  diverse?: number;
  local?: number;
}

interface AnalyticsState {
  performanceData: PerformanceData[];
  enrollmentData: EnrollmentData[];
  gradeDistribution: GradeDistribution[];
  schoolComparison: SchoolComparison[];
  topSubjects: SubjectPerformance[];
  demographics: Demographics[];
  keyMetrics: {
    totalStudents: number;
    averageScore: number;
    totalSchools: number;
    growthRate: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  performanceData: [],
  enrollmentData: [],
  gradeDistribution: [],
  schoolComparison: [],
  topSubjects: [],
  demographics: [],
  keyMetrics: {
    totalStudents: 0,
    averageScore: 0,
    totalSchools: 0,
    growthRate: 0,
  },
  loading: false,
  error: null,
};

// Async thunks for fetching analytics data
export const fetchAnalyticsData = createAsyncThunk(
  'analytics/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const [
        performanceRes,
        enrollmentRes,
        gradesRes,
        schoolsRes,
        subjectsRes,
        demographicsRes,
        metricsRes,
      ] = await Promise.all([
        axios.get(`${BASE_URL}/analytics/performance`),
        axios.get(`${BASE_URL}/analytics/enrollment`),
        axios.get(`${BASE_URL}/analytics/grades`),
        axios.get(`${BASE_URL}/analytics/schools`),
        axios.get(`${BASE_URL}/analytics/subjects`),
        axios.get(`${BASE_URL}/analytics/demographics`),
        axios.get(`${BASE_URL}/analytics/metrics`),
      ]);

      return {
        performanceData: performanceRes.data,
        enrollmentData: enrollmentRes.data,
        gradeDistribution: gradesRes.data,
        schoolComparison: schoolsRes.data,
        topSubjects: subjectsRes.data,
        demographics: demographicsRes.data,
        keyMetrics: metricsRes.data,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch analytics data');
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsData.fulfilled, (state, action) => {
        state.loading = false;
        state.performanceData = action.payload.performanceData;
        state.enrollmentData = action.payload.enrollmentData;
        state.gradeDistribution = action.payload.gradeDistribution;
        state.schoolComparison = action.payload.schoolComparison;
        state.topSubjects = action.payload.topSubjects;
        state.demographics = action.payload.demographics;
        state.keyMetrics = action.payload.keyMetrics;
      })
      .addCase(fetchAnalyticsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default analyticsSlice.reducer; 