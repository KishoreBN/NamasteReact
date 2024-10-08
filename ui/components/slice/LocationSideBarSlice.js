import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOCATION_SEARCH_URL } from "../../utils/constant";

export const getLocationSearch = createAsyncThunk('GET_LOCATION_SEARCH',async (value)=>{
    const response = await fetch(LOCATION_SEARCH_URL + "?input=" + value + "&types=");
    return await response.json();
});

const LocationSideBarSlice = createSlice({
    name: 'location-sidebar',
    initialState: {
        data: [],
        loading: false
    },
    extraReducers: (builder) =>{
        builder.addCase(getLocationSearch.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(getLocationSearch.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        }),
        builder.addCase(getLocationSearch.rejected, (state) => {
            state.loading = false;
        })
    }
})

export default LocationSideBarSlice.reducer;