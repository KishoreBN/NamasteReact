import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_CART_ITEMS } from "../../utils/constant";

export const getCartItems = createAsyncThunk("GET_CART_ITEMS", async()=>{
    const response = await fetch(GET_CART_ITEMS);
    return await response.json();
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        loading: false
    },
    extraReducers: (builder) =>{
        builder.addCase(getCartItems.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(getCartItems.fulfilled, (state, action) =>{
            state.items = action.payload;
            state.loading = false;
        }),
        builder.addCase(getCartItems.rejected, (state) =>{
            state.loading = false;
        })
    },
    reducers:{
        setItem: (state, action) =>{
            state.items = [...action?.payload];
        },
    }
});

export const cartSliceActions = cartSlice.actions;
export default cartSlice.reducer;