import {
  faLocationDot,
  faMagnifyingGlass,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import {
  GET_LOCATION_COORDINATES,
  LOCATION_SEARCH_URL,
} from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { getLocationSearch } from "../slice/LocationSideBarSlice";

const LocationSideBar = (props) => {
  const { open, close, setLocation } = props;
  const searchInput = useRef(null);
  const listOfLocations = useSelector((state) => state.sidebar.data);
  const pageLoader = useSelector((state) => state.sidebar.loading);
  const dispatch = useDispatch();

  const search = async () => {
    dispatch(getLocationSearch(searchInput?.current?.value));
  };

  const searchDataDebounce = () => {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        search();
      }, [500]);
    };
  };

  const onLocationClick = async (id) => {
    const respone = await fetch(GET_LOCATION_COORDINATES + "?place_id=" + id);
    const json = await respone.json();
    setLocation(json);
    localStorage.setItem("location", JSON.stringify(json));
    close(false);
  };

  return (
    <div className={open ? "locationWrapper" : "locationWrapperInActive"}>
      <div className="content">
        <FontAwesomeIcon
          icon={faXmark}
          className="close-mark"
          onClick={() => close(false)}
        />
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search for area, Street name..."
            className="text-area"
            ref={searchInput}
            onChange={searchDataDebounce()}
          ></input>
        </div>
        {pageLoader ? (
          <FontAwesomeIcon icon={faSpinner} className="sidebar-spinner"/>
        ) : (
          <div className="list-of-locations-wrapper">
            {listOfLocations?.data?.map((item) => {
              return (
                <div
                  className="list-of-locations-wrapper-item"
                  onClick={() => onLocationClick(item?.place_id)}
                >
                  <FontAwesomeIcon icon={faLocationDot} className="icon" />
                  <div className="item-wrapper">
                    <div className="main-text">
                      {item?.structured_formatting?.main_text}
                    </div>
                    <div className="secondary-text">
                      {item?.structured_formatting?.secondary_text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSideBar;
