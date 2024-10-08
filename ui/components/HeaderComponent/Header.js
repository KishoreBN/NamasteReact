import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import SwiggyLogo from "./SwiggyLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LocationSideBar from "./LocationSideBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const { geoLocation, setGeoLocation } = props;
  const navigate = useNavigate();
  const navItems = [
    {
      url: faMagnifyingGlass,
      label: "Search",
      link: "/search",
    },
    {
      url: faUser,
      label: "Profile",
      link: "/profile",
    },
    {
      url: faCartShopping,
      label: "Cart",
      link: "/cart",
    },
  ];

  const onNavItemClick = (link) =>{
    navigate(`${link}`);
  }

  return (
    <div className="header-wrapper">
      <div className="location-wrapper">
        <img src={SwiggyLogo}></img>
        <div className="location-label-wrapper">
          <div onClick={() => setSideBarOpen(true)} className="location-label">
            {geoLocation?.data[0]?.formatted_address}
          </div>
        </div>
      </div>
      <LocationSideBar
        open={sideBarOpen}
        close={setSideBarOpen}
        setLocation={setGeoLocation}
      />
      <div className="nav-item-wrapper">
        {navItems.map((item) => {
          return (
            <div className="nav-list-item" key={item?.label} onClick={()=> onNavItemClick(item?.link)}>
              <FontAwesomeIcon icon={item?.url} />
              <span>{item?.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
