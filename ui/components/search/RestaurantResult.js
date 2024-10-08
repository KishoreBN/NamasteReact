import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CLOUDANARY_URL } from "../../utils/constant";
import { useNavigate } from "react-router-dom";

const RestaurantResult = ({ data }) => {
  const resturantResult =
    data?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards;
  const navigate = useNavigate();
  const onRestaurantClick = (restaurantId) =>{
    navigate(`/restaurant/${restaurantId}`);
  }
  if (!resturantResult) return "";
  return (
    <div className="restaurant-result-wrapper">
      <div className="restaurant-rslt-container">
        {resturantResult?.map((item) => {
          return (
            <div className="item-container" onClick={() => onRestaurantClick(item?.card?.card?.info?.id)}>
              <div className="image-container">
                <img
                  src={
                    CLOUDANARY_URL + item?.card?.card?.info?.cloudinaryImageId
                  }
                ></img>
              </div>
              <div className="item-desc">
                <span className="item-title">
                  {item?.card?.card?.info?.name}
                </span>
                <div className="item-details">
                  <div className="rating">
                    <FontAwesomeIcon icon={faStar} />
                    {item?.card?.card?.info?.avgRating}
                  </div>
                  <div className="sla">
                    {item?.card?.card?.info?.sla?.slaString}
                  </div>
                  <div className="costForTwo">
                    {item?.card?.card?.info?.costForTwoMessage}
                  </div>
                </div>
                <div className="cuisines">
                  {item?.card?.card?.info?.cuisines?.join(", ")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantResult;
