import { CLOUDANARY_URL } from "../../utils/constant";

const CartHeader = ({ restaurantDetails }) => {
  return (
    <div className="cart-header-container">
      <div className="image">
        <img
          src={CLOUDANARY_URL + restaurantDetails?.cloudinary_image_id}
        ></img>
      </div>
      <div className="title-loc">
        <div className="title">{restaurantDetails?.name}</div>
        <div className="loc">{restaurantDetails?.area_name}</div>
      </div>
    </div>
  );
};

export default CartHeader;
