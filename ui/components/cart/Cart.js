import { useEffect, useState } from "react";
import { GET_CART_ITEMS } from "../../utils/constant";
import CartHeader from "./CartHeader";
import CartItems from "./cartItems";
import CartBilling from "./CartBilling";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../slice/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  // const [onLoadData, setOnLoadData] = useState();
  const onLoadData = useSelector((state) => state.cart.items);
  const pageLoader = useSelector((state) => state.cart.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  // const getCartItems = async () => {
  //   // const response = await fetch(GET_CART_ITEMS, {
  //   //   method: "GET",
  //   // });
  //   // const json = await response.json();
  //   // setOnLoadData(json);
  //   dispatch(get)
  // };

  if (!onLoadData || onLoadData.length <= 0) return "";

  return !pageLoader ? (
    <div className="cart-conatiner">
      <div className="cart-wrapper">
        <div className="cart-header-wrapper">
          <CartHeader
            restaurantDetails={onLoadData?.data?.cartMeta?.restaurant_details}
          />
        </div>
        <hr style={{ margin: "10px 0px" }} />
        <CartItems cartItems={onLoadData?.data?.cartItems} />
        <hr style={{ margin: "10px 0px" }} />
        <CartBilling
          cartBills={onLoadData?.data?.cartMeta?.rendering_details}
        />
        <div className="cart-footer-wrapper"></div>
      </div>
    </div>
  ) : (
    <FontAwesomeIcon icon={faSpinner} className="restaurant-spinner" />
  );
};

export default Cart;
