import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRestuarantMenu = createAsyncThunk(
    'GET_RESTAURANT_MENU',
    async (url) =>{
        const response = await fetch(url);
        return await response.json();
    }
)

const RestaurantSlice = createSlice({
    name: 'RESTAURANT_MENU',
    initialState: {
        data: {},
        loading: false
    },
    extraReducers: (builder) =>{
        builder.addCase(getRestuarantMenu.pending, (state) =>{
            state.loading = true;
        }),
        builder.addCase(getRestuarantMenu.fulfilled, (state, action) =>{
            state.data = action.payload;
            state.loading = false;
        }),
        builder.addCase(getRestuarantMenu.rejected, (state) =>{
            state.loading = false;
        })
    }
});

export default RestaurantSlice.reducer;