import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRestDishSearch = createAsyncThunk("GET_REST_DISH_SEARCH", async(url)=>{
    const response = await fetch(url);
    return await response.json();
});

const SearchLayoutSlice = createSlice({
    name: 'SEARCH_REST_DISH',
    initialState: {
        data: {},
        loader: false
    },
    extraReducers: (builder) =>{
        builder.addCase(getRestDishSearch.pending, (state) =>{
            state.loader = true;
        }),
        builder.addCase(getRestDishSearch.fulfilled, (state, action) =>{
            state.data = action.payload;
            state.loader = false;
        }),
        builder.addCase(getRestDishSearch.rejected, (state) =>{
            state.loader = false;
        })
    }
});

export default SearchLayoutSlice.reducer;