import {
  faArrowLeft,
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_RESTAURANT_SEARCH } from "../../utils/constant";
import RestaurantItem from "./RestaurantItem";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantMenuSearch } from "../slice/RestaurantMenuSearchSlice";

const RestaurantMenuSearch = (props) => {
  const searchWord = useRef(null);
  const { restaurantId } = useParams();
  const { lat, lng } = JSON.parse(localStorage.getItem("location")).data[0]
    ?.geometry?.location;
  const [items, setItems] = useState([]);
  const apiData = useSelector((state) => state.restaurantMenuSearch.data);
  const pageLoader = useSelector((state) => state.restaurantMenuSearch.loader);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSearchClick = async () => {
    const search = searchWord?.current?.value;
    const url =
      GET_RESTAURANT_SEARCH +
      "?lat=" +
      lat +
      "&lng=" +
      lng +
      "&restaurantId=" +
      restaurantId +
      "&query=" +
      search;
    dispatch(getRestaurantMenuSearch(url));
  };
  useEffect(() => {
    setItems(apiData.data?.cards?.map((i) => i?.card));
  }, [apiData]);
  const onBackClick = () => {
    navigate(-1);
  };
  console.log(pageLoader);
  return (
    <div className="restaurant-menu-search-wrapper">
      <div className="restaurant-menu-search-container">
        <div className="rest-menu-search-header">
          <div className="rest-search-wrapper">
            <FontAwesomeIcon icon={faArrowLeft} onClick={onBackClick} />
            <input
              type="text"
              placeholder="Search in menu"
              ref={searchWord}
            ></input>
            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={onSearchClick} />
          </div>
          <hr></hr>
        </div>
        {!pageLoader ? (
          <div className="rest-menu-search-body">
            {items?.map((i) => {
              return <RestaurantItem item={i} />;
            })}
          </div>
        ) : (
          <FontAwesomeIcon icon={faSpinner} className="restaurant-spinner"/>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenuSearch;
