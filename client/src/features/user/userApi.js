import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { register } from "./userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/user/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    //register
    registerUser: builder.mutation({
      query: (registerData) => ({
        url: "register",
        method: "POST",
        body: registerData,
      }),
      invalidatesTags: ["User"],
    }),
    //verifyEmail
    verifyUserEmail: builder.query({
      query: (token) => ({
        url: `verify-email?token=${token}`,
        method: "GET",
      }),
      invalidatesTags: ["User"],
      onQueryStarted: async (arg,  {dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
           dispatch(register(data))
        } catch (err) {
          console.error(err);
        }
      },
    }),
    //login
    loginUser: builder.mutation({
      query: (loginData) => ({
        url: "login-user",
        method: "POST",
        body: loginData,
      }),
       
      onQueryStarted: async (arg,  {dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
           dispatch(register(data))
        } catch (err) {
          console.error(err);
        }
      },
    }),
    getCurrentUser:builder.query({
      query:()=>({
        url:`profile`,
        method:"GET"
      }),
       providesTags: ['User'],
    }),
    //log-out user
    logOutUser:(builder.mutation)({
      query:()=>({
        url:"/logout",
        method:"GET"
      })
    })
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useVerifyUserEmailQuery,
  useGetCurrentUserQuery,
  useLogOutUserMutation
} = userApi;
