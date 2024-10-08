import {
  faCaretDown,
  faIndianRupeeSign,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CLOUDANARY_URL } from "../../utils/constant.js";
import VegIcon from "../../utils/Components/VegIcon.js";
import { useState } from "react";
import RestaurantItem from "./RestaurantItem.js";
import useToggle from "../hooks/useToggle.js";

const RestaurantMenuCard = (props) => {
  const { title, itemCards } = props?.data;
  const [dropDown, toggle] = useToggle(true);
  return (
    <div className="restaurant-menu-card-wrapper">
      <div
        className="restaurant-menu-title-wrapper"
        onClick={toggle}
      >
        <span>
          {title} ({itemCards?.length})
        </span>
        <div className={dropDown ? "rotateXBy180" : "rotateXBy0"}>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      </div>
      {dropDown && (
        <div className="rest-menu-wrapper">
          {itemCards?.map((item) => {
            return <RestaurantItem item={item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default RestaurantMenuCard;
