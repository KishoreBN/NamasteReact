import { faMagnifyingGlass, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { GET_SEARCH_RESULT } from "../../utils/constant";
import RestaurantResult from "./RestaurantResult";
import DishResult from "./DishResult";
import { useDispatch, useSelector } from "react-redux";
import { getRestDishSearch } from "../slice/SearchLayoutSlice";

const SearchLayout = (props) => {
  const dishSearch = useRef();
  const [filterSelected, setFilterSelected] = useState(null);
  const { lat, lng } = JSON.parse(localStorage.getItem("location"))?.data[0]
    ?.geometry?.location;
  const data = useSelector((state) => state.search.data);
  const pageLoader = useSelector((state) => state.search.loader);
  const dispatch = useDispatch();

  let searchParam = [
    {
      label: "Restaurants",
      value: "RESTAURANT",
      selected: false,
    },
    {
      label: "Dishes",
      value: "DISH",
      selected: false,
    },
  ];
  const [filter, setFilter] = useState(searchParam);
  const onSearchClick = () => {
    if (
      !checkFilterSelected() ||
      dishSearch?.current?.value?.trim()?.length <= 0
    ) {
      setFilterSelected(false);
    } else {
      onSearchDishOrRestaurant(dishSearch?.current?.value);
    }
  };
  const checkFilterSelected = () => {
    return filter?.filter((i) => i?.selected)?.length > 0;
  };
  const onSearchDishOrRestaurant = async (str) => {
    const selectedTab = filter?.find((i) => i?.selected)?.value;
    const url =
      GET_SEARCH_RESULT +
      "?lat=" +
      lat +
      "&lng=" +
      lng +
      "&str=" +
      str +
      "&selectedPLTab=" +
      selectedTab;
    dispatch(getRestDishSearch(url));
  };
  const onFilterClick = (value) => {
    setFilter(
      searchParam?.map((i) => {
        if (i?.value === value) {
          return { ...i, selected: true };
        } else return { ...i, selected: false };
      })
    );
    setFilterSelected(true);
  };
  return (
    <div className="search-layout-wrapper">
      <div className="search-layout-container">
        <div className="search-header-wrapper">
          <div className="search-hdr-container">
            <input
              type="text"
              placeholder="Search for restaurants and food"
              ref={dishSearch}
            ></input>
            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={onSearchClick} />
          </div>
          <div className="search-param-wrapper">
            <div className="searc-param-filters" contentEditable={false}>
              {filter?.map((item) => {
                return (
                  <div
                    className={
                      item?.selected
                        ? `param-item param-item-selected`
                        : `param-item`
                    }
                    onClick={() => onFilterClick(item?.value)}
                  >
                    <span>{item?.label}</span>
                  </div>
                );
              })}
            </div>
            {!filterSelected && (
              <div className="warning-msg">
                * Please enter in the search box and choose a filter
              </div>
            )}
          </div>
        </div>
        {!pageLoader ? <div className="search-body-wrapper">
          {filter?.find((i) => i?.value === "DISH" && i?.selected === true) ? (
            <DishResult data={data} />
          ) : (
            <RestaurantResult data={data} />
          )}
        </div> : 
        <FontAwesomeIcon icon={faSpinner} className="restaurant-spinner"/>}
      </div>
    </div>
  );
};

export default SearchLayout;
