import {
  faCaretDown,
  faClock,
  faStar,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CLOUDANARY_URL } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import Modal from "../../utils/Components/Modal";
import { useState } from "react";
import SiblingOutletPopup from "./SiblingOutletPopup";

const RestaurantHeader = (props) => {
  const { data } = props;
  const navigate = useNavigate();
  const [openSiblingPopup, setOpenSiblingPopup] = useState(false);
  const restaurantInfo = data?.data?.cards[2]?.card?.card?.info;
  const offersInfo =
    data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers;
  const onRowClick = (row) => {
    const { id } = row;
    setOpenSiblingPopup(false);
    navigate(`/restaurant/${id}`);
    location.reload();
  };

  return restaurantInfo ? (
    <div className="restaurant-hdr-wrapper">
      <div className="restaurant-title-wrapper">
        <div className="rest-name-address">
          <div className="rest-nd-name">{restaurantInfo?.name}</div>
          <div className="rest-nd-cuisines">
            {restaurantInfo?.cuisines?.join(", ")}
          </div>
          <div className="rest-nd-as-area">
            {restaurantInfo?.areaName},{" "}
            {restaurantInfo?.sla?.lastMileTravelString}
            <FontAwesomeIcon
              icon={faCaretDown}
              style={{ marginLeft: "5px", color: "#fc8019", cursor: "pointer" }}
              onClick={() => {
                setOpenSiblingPopup(true);
                document.body.style.overflow = "hidden";
                const element = document.getElementsByClassName("rest-hdr-search-wrapper")[0];
              }}
            />
          </div>
        </div>
        <div className="rating-card-wrapper">
          <div className="rating-cw-icon">
            <FontAwesomeIcon icon={faStar} /> {restaurantInfo?.avgRatingString}
          </div>
          <div className="rating-cw-reviews">
            {restaurantInfo?.totalRatingsString}
          </div>
        </div>
      </div>
      <div className="restaurant-sla-wrapper">
        <div className="rsw-delivery">
          <FontAwesomeIcon icon={faClock} />
          <div>{restaurantInfo?.sla?.deliveryTime} MINS</div>
        </div>
        <div className="rsw-costForTwo">
          {restaurantInfo?.costForTwoMessage}
        </div>
      </div>
      <div className="restaurant-offer-slider">
        {offersInfo?.map((item) => {
          return (
            <div className="restaurant-offer-wrapper">
              <div className="rest-ofw-header">
                <img src={CLOUDANARY_URL + item?.info?.offerLogo}></img>
                <div>{item?.info?.header}</div>
              </div>
              <div className="rest-ofw-body">
                {item?.info?.couponCode} | {item?.info?.description}
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        openModal={openSiblingPopup}
        closeModal={() => {
          setOpenSiblingPopup(false);
        }}
        children={<SiblingOutletPopup onRowClick={onRowClick} />}
      />
    </div>
  ) : (
    <></>
  );
};

export default RestaurantHeader;
