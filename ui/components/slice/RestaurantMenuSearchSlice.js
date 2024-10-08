import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRestaurantMenuSearch = createAsyncThunk('GET_RESTAURANT_MENU_SEARCH', async(url)=>{
    const response = await fetch(url);
    return await response.json();
});

const RestaurantMenuSearchSlice = createSlice({
    name: 'RESTAURANT_MENU_SEARCH',
    initialState: {
        data: {},
        loader: false
    },
    extraReducers: (builder) =>{
        builder.addCase(getRestaurantMenuSearch.pending, (state) =>{
            state.loader = true;
        }),
        builder.addCase(getRestaurantMenuSearch.fulfilled, (state, action)=>{
            state.data = action.payload;
            state.loader = false;
        }),
        builder.addCase(getRestaurantMenuSearch.rejected, (state) =>{
            state.loader = false;
        })
    }
});

export default RestaurantMenuSearchSlice.reducer;