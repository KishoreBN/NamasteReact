import { RESTAURANT_UPDATE_URL } from "../../utils/constant";
import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ShimmerCard from "../../utils/Components/ShimmerCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOnFilterData } from "../slice/MainLayoutSlice";

const RestaurantList = (props) => {
  const { location } = props;
  const [filters, setFilter] = useState([]);
  const [countOfApiCall, setCountOfApiCall] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.home?.data);
  const [resList, setResList] = useState(
    data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
  );
  const [restaurantListTitle, setRestaurantListTitle] = useState(
    data?.data?.cards[2]?.card?.card?.title
  );

  const handleScrollEvent = () => {
    const restaurantContainer = document.getElementById("restaurant-list");
    if (restaurantContainer) {
      const { top, height } = restaurantContainer.getBoundingClientRect();
      const windowBottom = window.innerHeight;
      if (top < windowBottom && top + height <= windowBottom) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  // useEffect(() => {
  //   if (data?.data) {
  //     const temp =
  //       data?.data?.cards[data?.data?.cards?.length - 1]?.card?.card
  //         ?.gridElements?.infoWithStyle?.restaurants;
  //     setResList((previous) => [...previous, ...temp]);
  //   }
  // }, []);

  useEffect(() => {
    const restaurantList =
      data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    const restaurantFilters = data?.data?.cards[3]?.card?.card?.facetList;
    const temp = restaurantFilters?.reduce((acc, curr) => {
      if (!curr.openFilter && curr?.facetInfo) {
        acc?.push(
          ...curr?.facetInfo
            ?.filter((i) => i?.openFilter)
            .map((i) => {
              return { ...i, filterSelected: false, mainId: curr?.id };
            })
        );
      }
      return acc;
    }, []);
    setRestaurantListTitle(data?.data?.cards[2]?.card?.card?.title);
    setFilter(temp);
    setResList(restaurantList);
  }, [data]);

  const onFilterClick = (id) => {
    let filtersSelected = {};

    const temp = filters?.map((i) => {
      if (i?.id === id) return { ...i, filterSelected: !i?.filterSelected };
      else return { ...i };
    });
    filtersSelected = temp
      ?.filter((i) => i?.filterSelected)
      ?.reduce((acc, curr) => {
        acc[curr.mainId] = [{ value: curr?.id }];
        return acc;
      }, {});
    if (id && id !== 0) {
      setFilter(temp);
      setResList([]);
      setCountOfApiCall(1);
    }
    console.log(filtersSelected);
    const payload = {
      lat: location?.data[0]?.geometry?.location?.lat,
      lng: location?.data[0]?.geometry?.location?.lng,
      page_type: "DESKTOP_WEB_LISTING",
      _csrf: "42yYChdJjwRN-R4lTpfSkNjFGVe03koT2r-qNMU4",
      seoParams: {
        apiName: "FoodHomePage",
        pageType: "FOOD_HOMEPAGE",
        seoUrl: "https://www.swiggy.com/",
      },
      filters:
        Object.keys(filtersSelected).length > 0
          ? {
              isFiltered: true,
              facets: filtersSelected,
            }
          : {},
      widgetOffset: {
        NewListingView_category_bar_chicletranking_TwoRows: "",
        NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
        Restaurant_Group_WebView_SEO_PB_Theme: "",
        collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: `${
          (countOfApiCall + 1) * 10
        }`,
        inlineFacetFilter: "",
        restaurantCountWidget: "",
      },
    };
    setCountOfApiCall((previous) => previous + 1);
    getUpdatedRestaurantList(payload);
  };

  const getUpdatedRestaurantList = async (payload) => {
    const response = await fetch(RESTAURANT_UPDATE_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const json = await response.json();
    const data =
      json?.data?.cards[json?.data?.cards?.length - 1]?.card?.card?.gridElements
        ?.infoWithStyle?.restaurants;
    setResList((previous) => [...previous, ...data]);
    // dispatch(getOnFilterData(payload));
  };

  const shimmerCards = Array.from({ length: 8 }, () => <ShimmerCard />);

  return (
    <div className="restaurant-list" id="restaurant-list">
      <span className="restaurant-list-heading">{restaurantListTitle}</span>
      <div className="restaurant-filters">
        {filters?.map((item, index) => {
          return (
            <div
              className={
                item?.filterSelected
                  ? "restaurant-filter-item-selected"
                  : "restaurant-filter-item"
              }
              key={item?.id}
              onClick={() => onFilterClick(item?.id)}
            >
              <span>{item?.label}</span>
              {item?.filterSelected && <FontAwesomeIcon icon={faXmark} />}
            </div>
          );
        })}
      </div>
      <div className="restaurant-list-wrapper">
        {resList?.length > 0
          ? resList?.map((item) => {
              return <RestaurantCard item={item} key={item?.info?.id} />;
            })
          : shimmerCards}
      </div>
      <div
        className={`restaurant-list-add-more ${
          showMore
            ? "restaurant-add-more-appear"
            : "restaurant-add-more-disppear"
        }`}
        onClick={() => onFilterClick(0)}
      >
        <p>Add More</p>
      </div>
    </div>
  );
};

export default RestaurantList;
