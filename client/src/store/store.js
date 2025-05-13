import { configureStore } from '@reduxjs/toolkit'
import {userApi} from "../features/user/userApi.js"
import userSlice from '../features/user/userSlice.js';
 
export const store = configureStore({
   reducer: {
    [userApi.reducerPath]: userApi.reducer,
    user: userSlice
  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

