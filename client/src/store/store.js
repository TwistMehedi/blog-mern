import { configureStore } from '@reduxjs/toolkit'
import {userApi} from "../features/user/userApi.js"
import userSlice from '../features/user/userSlice.js';
import {postApi} from "../features/post/postApi.js";
import postSlice from "../features/post/postSlice.js";

export const store = configureStore({
   reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    user: userSlice,
    post:postSlice,
  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, postApi.middleware)
  
});

