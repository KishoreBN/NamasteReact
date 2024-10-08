import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CLOUDANARY_URL } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
const RestaurantCard = (props) => {
  const { item } = props;
  const navigate = useNavigate();
  const onRestaurantClick = () => {
    const { id } = item?.info;
    navigate(`/restaurant/${id}`);
  };
  return (
    <div
      className="restaurant-list-item"
      id={item?.info?.id}
      onClick={onRestaurantClick}
    >
      <img src={CLOUDANARY_URL + item?.info?.cloudinaryImageId}></img>
      <div className="restaurant-list-detail">
        <span className="title">{item?.info?.name}</span>
        <div className="ratings">
          <FontAwesomeIcon icon={faStar} />
          {item?.info?.avgRating}
        </div>
        <div className="delivery-time">{item?.info?.sla?.slaString}</div>
        <div className="cuisines">{item?.info?.cuisines?.join(", ")}</div>
        <div className="area">{item?.info?.areaName}</div>
      </div>
    </div>
  );
};

export default RestaurantCard;
