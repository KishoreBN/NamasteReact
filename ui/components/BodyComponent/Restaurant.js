import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_RESTAURANT_MENU_BY_ID } from "../../utils/constant";
import RestaurantHeader from "./RestaurantHeader";
import RestaurantMenuCard from "./RestaurantMenuCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getRestuarantMenu } from "./RestaurantSlice";

const Restaurant = () => {
  const { restaurantId } = useParams();
  const { lat, lng } = JSON.parse(localStorage.getItem("location"))?.data[0]
    ?.geometry?.location;
  const restaurantData = useSelector(state => state.restaurant.data);
  const pageLoader = useSelector(state => state.restaurant.loading);
  const cards =
    restaurantData?.data?.cards[restaurantData?.data?.cards?.length - 1]
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const url =
      GET_RESTAURANT_MENU_BY_ID +
      "?restaurantId=" +
      restaurantId +
      "&pageType=REGULAR_MENU&completeMenu=true&lat=" +
      lat +
      "&lng=" +
      lng +
      "&catalogQa=undefined&submitAction=ENTER";
      fetchRestaurantMenu(url);
  }, []);

  const fetchRestaurantMenu = async (url) => {
    dispatch(getRestuarantMenu(url));
  };

  const onSearchClick = () =>{
    navigate(`/restaurant/${restaurantId}/search`);
  }

  return !pageLoader ? (
    <div className="restaurant-wrapper">
      <div className="rest-hdr-search-wrapper">
        <div className="rest-hdr-title">
          <div className="rest-nd-search-name">
            {restaurantData?.data?.cards[2]?.card?.card?.info?.name}
          </div>
          <div className="rest-nd-search-sla">
            {restaurantData?.data?.cards[2]?.card?.card?.info?.sla?.slaString}
          </div>
        </div>
        <div className="rest-hdr-search">
          <FontAwesomeIcon icon={faMagnifyingGlass} onClick={onSearchClick}/>
        </div>
      </div>
      <div className="restaurant-header-container">
        <RestaurantHeader data={restaurantData} />
        <hr style={{ margin: "30px 0px" }} />
        <div className="menu-wrapper">
          {cards?.map((item) => {
            return (
              item?.card?.card?.itemCards && (
                <RestaurantMenuCard data={item.card?.card} />
              )
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <FontAwesomeIcon icon={faSpinner} className="restaurant-spinner"/>
  );
};

export default Restaurant;
