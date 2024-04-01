import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../service/UserSlice'
export const store = configureStore({
  reducer: {
    user: userReducer
  },
});

