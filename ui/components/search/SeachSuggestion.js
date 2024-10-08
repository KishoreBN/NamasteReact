import { useEffect, useState } from "react";
import { CLOUDANARY_URL, GET_SEARCH_PRESEARCH } from "../../utils/constant";

const SearchSuggestion = () => {
  const [list, setList] = useState([]);
  const { lat, lng } = JSON.parse(localStorage.getItem("location"))?.data[0]
    ?.geometry?.location;
  useEffect(() => {
    getPreSearchData();
  }, []);

  const getPreSearchData = async () => {
    const response = await fetch(
      GET_SEARCH_PRESEARCH + "?lat=" + lat + "&lng=" + lng
    );
    const json = await response.json();
    setList(json?.data?.cards[1]?.card?.card);
  };
  return (
    <div className="search-body-pop-container">
      <span>{list?.header?.title}</span>
      <div className="search-popular-cuisines-wrapper">
        {list?.imageGridCards?.info?.map((item) => {
          return (
            <div className="search-pop-item">
              <img src={CLOUDANARY_URL + item?.imageId}></img>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchSuggestion;
