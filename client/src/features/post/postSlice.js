import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    searchText:"",
    selectedCategory:""
};

const postSlice = createSlice({
    name:"postSlice",
    initialState,
    reducers:{
        setSearchText:(state, action)=>{
            state.searchText = action.payload
             
        },
        setSelectedCategory:(state, action)=>{
            state.selectedCategory = action.payload
        }
    }
});

export const {setSearchText, setSelectedCategory} = postSlice.actions;
export default postSlice.reducer;