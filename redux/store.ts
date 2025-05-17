import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import schoolReducer from './slices/schoolSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    schools: schoolReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;