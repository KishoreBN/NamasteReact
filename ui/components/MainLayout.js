import { useEffect, useState } from "react";
import {
  DEFAULT_BANGALORE_LATITUDE,
  DEFAULT_BANGALORE_LONGITUDE,
  ON_APPLICATION_LOAD_URL,
} from "../utils/constant";
import Body from "./BodyComponent/Body";
import Header from "./HeaderComponent/Header";
import { DEFAULT_LOCATION } from "../utils/mockData";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOnLoadData } from "./slice/MainLayoutSlice";

const MainLayout = () => {
  const [geoLocation, setGeoLocation] = useState(
    JSON.parse(localStorage.getItem("location")) || DEFAULT_LOCATION
  );
  const dispatch = useDispatch();
  const data = useSelector(state => state?.home?.data);

  useEffect(() => {
    getRestaurantData();
    if (!localStorage.getItem("location")) {
      localStorage.setItem("location", JSON.stringify(DEFAULT_LOCATION));
    }
  }, []);

  useEffect(() => {
    getRestaurantData();
  }, [geoLocation]);

  const getRestaurantData = async () => {
    dispatch(
      getOnLoadData({
        lat: geoLocation?.data[0]?.geometry?.location?.lat,
        lng: geoLocation?.data[0]?.geometry?.location?.lng,
      })
    );
  };

  return (
    <div className="main-wrapper">
      <Header setGeoLocation={setGeoLocation} geoLocation={geoLocation} />
      <Body data={data} location={geoLocation} />
    </div>
  );
};

export default MainLayout;
