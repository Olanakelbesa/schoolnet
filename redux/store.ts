import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import schoolReducer from './slices/schoolSlice';
import parentProfileReducer from './slices/parentSlice';
import schoolCreateReducer from './slices/schoolCreateSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    schools: schoolReducer,
    parentProfile: parentProfileReducer,
    schoolCreate: schoolCreateReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;