import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CLOUDANARY_URL, GET_RESTAURANT_SIBLING } from "../../utils/constant";
import { siblingOutletHeader } from "../../utils/arrayUtil.js";
import Table from "../../utils/Components/Table";
import { useDispatch, useSelector } from "react-redux";
import { getSiblingOutlets } from "../slice/SiblingOutletPopupSlice.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const SiblingOutletPopup = ({ onRowClick }) => {
  const { restaurantId } = useParams();
  const { lat, lng } = JSON.parse(localStorage.getItem("location")).data[0]
    ?.geometry?.location;
  const [data, setData] = useState(null);
  const apiData = useSelector((state) => state.restaurantSibling.data);
  const pageLoader = useSelector((state) => state.restaurantSibling.loader);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchSiblingOutlets();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  useEffect(() => {
    setData(
      apiData?.data?.cards[0]?.card?.card?.siblingOutlets?.map((i) => ({
        ...i?.siblingOutlet,
        slaString: i?.siblingOutlet?.sla?.slaString,
      }))
    );
  }, [apiData]);
  const fetchSiblingOutlets = async () => {
    const payload = {
      menuId: restaurantId,
      lat: lat,
      lng: lng,
      _csrf: "HociY0rb0p6W-2QczJgodRo2z2eeEXchqX0HzZpU",
    };
    // const response = await fetch(GET_RESTAURANT_SIBLING, {
    //   method: "POST",
    //   body: JSON.stringify(payload),
    // });
    // const json = await response.json();
    // setData(
    //   json?.data?.cards[0]?.card?.card?.siblingOutlets?.map((i) => ({
    //     ...i?.siblingOutlet,
    //     slaString: i?.siblingOutlet?.sla?.slaString,
    //   }))
    // );
    dispatch(getSiblingOutlets(payload));
  };
  const tableStyle = {
    fontSize: "14px",
    borderSpacing: "0 10px",
    width: "100%",
    textAlign: "left",
  };
  return (!pageLoader && data) ? (
    <div className="popup-wrapper">
      <div className="popup-header-container">
        <div className="image">
          <img src={CLOUDANARY_URL + data[0]?.cloudinaryImageId}></img>
        </div>
        <div className="title">Choose the {data[0]?.name} Outlet</div>
        <div className="count">{data?.length} outlets near you</div>
      </div>
      <div className="popup-body-container">
        <Table
          headers={siblingOutletHeader}
          data={data}
          tableStyle={tableStyle}
          onRowClick={onRowClick}
        />
      </div>
    </div>
  ) : (
    <FontAwesomeIcon icon={faSpinner} className="restaurant-spinner"/>
  );
};

export default SiblingOutletPopup;
