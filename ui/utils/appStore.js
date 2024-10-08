import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../components/slice/cartSlice";
import MainLayoutSlice from "../components/slice/MainLayoutSlice";
import LocationSideBarSlice from "../components/slice/LocationSideBarSlice";
import RestaurantSlice from "../components/BodyComponent/RestaurantSlice";
import SiblingOutletPopupSlice from "../components/slice/SiblingOutletPopupSlice";
import RestaurantMenuSearchSlice from "../components/slice/RestaurantMenuSearchSlice";
import SearchLayoutSlice from "../components/slice/SearchLayoutSlice";

const appStore = configureStore({
    reducer:{
        cart: cartSlice,
        home: MainLayoutSlice,
        sidebar: LocationSideBarSlice,
        restaurant: RestaurantSlice,
        restaurantSibling: SiblingOutletPopupSlice,
        restaurantMenuSearch: RestaurantMenuSearchSlice,
        search: SearchLayoutSlice
    }
});

export default appStore;
