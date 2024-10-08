import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RestaurantItem from "../BodyComponent/RestaurantItem";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const DishResult = ({ data }) => {
  if (!data || Object.keys(data).length <= 0) return "";
  const dishResult =
    data?.data?.cards[0]?.groupedCard?.cardGroupMap?.DISH?.cards;
  let item = {};
  const arr = dishResult?.slice(1);
  item.card = arr[0]?.card?.card;
  const items = arr?.map((i) => i?.card);
  return (
    <div className="dish-result-wrapper">
      <div className="dish-rslt-container">
        {items?.map((item) => {
          return (
            <div className="item">
              <div className="item-header-wrapper">
                <div className="item-header-title">
                  {item?.card?.restaurant?.info?.name}
                </div>
                <div className="item-header-details">
                  <div className="item-hd-rating">
                    <FontAwesomeIcon icon={faStar} />
                    <span>{item?.card?.restaurant?.info?.avgRatingString}</span>
                  </div>
                  <span>{item?.card?.restaurant?.info?.sla?.slaString}</span>
                </div>
              </div>
              <hr style={{ margin: "8px 0px" }} />
              <RestaurantItem item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DishResult;
