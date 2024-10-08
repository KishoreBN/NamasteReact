import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ON_APPLICATION_LOAD_URL, RESTAURANT_UPDATE_URL } from "../../utils/constant";

export const getOnLoadData = createAsyncThunk('ON_LOAD_DATA', async ({lat, lng}) =>{
    const response = await fetch(ON_APPLICATION_LOAD_URL + `?lat=${lat}&lng=${lng}`)
    return await response?.json();
});

export const getOnFilterData = createAsyncThunk('ON_FILTER_DATA', async (payload) =>{
    const response = await fetch(RESTAURANT_UPDATE_URL, {
        method: 'POST',
        body: JSON.stringify(payload)
    })
    return await response?.json();
})

const MainLayoutSlice = createSlice({
    name: 'main-layout',
    initialState:{
        data: {},
        loading: false
    },
    extraReducers: (builder) => {
        builder.addCase(getOnLoadData.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(getOnLoadData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        }),
        builder.addCase(getOnLoadData.rejected, (state, action) => {
            state.loading = false;
        }),
        builder.addCase(getOnFilterData.pending, (state) =>{
            state.loading = true;
        }),
        builder.addCase(getOnFilterData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        }),
        builder.addCase(getOnFilterData.rejected, (state, action) => {
            state.loading = false;
        })
    }
});

export default MainLayoutSlice.reducer;