import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
     name:"user",
     initialState:{
        user:null,
        isAuthenticated:false,
   
    },

    reducers:{
        register:(state, action)=>{
            state.user = action.payload,
            state.isAuthenticated = true
        },
        login:(state, action)=>{
            state.user = action.payload,
            state.isAuthenticated = true
        }
    }
});


export const {register, login} = userSlice.actions;
export default userSlice.reducer;