import RestaurantList from "./RestaurantList";

const Body = (props) => {
  const {data, location} = props;
  return (
    <div className="body-wrapper">
      <RestaurantList data={data} location={location}/>
    </div>
  );
};

export default Body;
