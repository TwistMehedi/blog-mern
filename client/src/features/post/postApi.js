import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
     reducerPath:"postApi",
     baseQuery: fetchBaseQuery({
         baseUrl: "http://localhost:3000/api/v1/post/",
         credentials: "include",
       }),
    endpoints:(builder)=>({

        createBlogPost:builder.mutation({
            query:(formData)=>({
                url:"create-post",
                method:"POST",
                body:formData
            })
        }),

        allPost:builder.query({
            query:()=>({
                url:"get-all-posts",
                method:"GET"
            })
        }),


    })
});

export const {useCreateBlogPostMutation, useAllPostQuery} = postApi;