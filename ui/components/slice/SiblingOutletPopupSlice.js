import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_RESTAURANT_SIBLING } from "../../utils/constant";

export const getSiblingOutlets = createAsyncThunk('GET_SIBLING_OUTLET', async (payload) =>{
    const response = await fetch(GET_RESTAURANT_SIBLING, {
        method: 'POST',
        body: JSON.stringify(payload)
    });
    return await response.json();
});

const SiblingOutletPopupSlice = createSlice({
    name: 'SIBLING_OUTLET',
    initialState: {
        data: {},
        loader: false
    },
    extraReducers: (builder) =>{
        builder.addCase(getSiblingOutlets.pending, (state) => {
            state.loader = true;
        }),
        builder.addCase(getSiblingOutlets.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loader = false;
        }),
        builder.addCase(getSiblingOutlets.rejected, (state) =>{
            state.rejected = false;
        })
    }
});

export default SiblingOutletPopupSlice.reducer;