// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import apiUserSlice from './slices/api-user-slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    apiUser:apiUserSlice
  },
});
