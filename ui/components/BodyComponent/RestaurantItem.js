import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VegIcon from "../../utils/Components/VegIcon";
import { faIndianRupeeSign, faStar } from "@fortawesome/free-solid-svg-icons";
import { ADD_ITEM_TO_CART, CLOUDANARY_URL } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { cartSliceActions } from "../slice/cartSlice";
import Modal from "../../utils/Components/Modal";
import { useState } from "react";
import VariantGroupPopup from "./VariantGroupPopup";
import { useParams } from "react-router-dom";

const RestaurantItem = ({ item }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const cartItems = useSelector((state) => state?.cart?.items);
  const currentItemPresentInCart = cartItems?.find(
    (i) => i.menu_item_id === item?.card?.info?.id
  );
  const { restaurantId } = useParams();
  const addItemToCart = (variants) => {
    let items = [];
    if (
      cartItems?.length > 0 &&
      cartItems?.filter((i) => i?.menu_item_id === item?.card?.info?.id)
        ?.length > 0
    ) {
      items = cartItems?.map((i) => {
        if (i?.menu_item_id === item?.card?.info?.id) {
          return { ...i, quantity: i?.quantity + 1 };
        } else {
          return { ...i, quantity: i?.quantity };
        }
      });
    } else {
      items = [...cartItems];
      items?.push({
        addons: [],
        variants: variants || [],
        menu_item_id: item?.card?.info?.id,
        quantity: 1,
      });
    }
    dispatch(cartSliceActions?.setItem(items));
    addItemToCartFetch(items);
  };
  const removeItem = () => {
    let items = [];
    if (
      cartItems?.length > 0 &&
      cartItems?.filter((i) => i?.menu_item_id === item?.card?.info?.id)
        ?.length > 0
    ) {
      cartItems?.forEach((i) => {
        if (i?.menu_item_id === item?.card?.info?.id) {
          if (i?.quantity - 1 > 0)
            items.push({ ...i, quantity: i?.quantity - 1 });
        } else {
          items.push({ ...i, quantity: i?.quantity });
        }
      });
      dispatch(cartSliceActions?.setItem(items));
      addItemToCartFetch(items);
    }
  };
  const addItemToCartFetch = async (items) =>{
    const payload = {
      flushFirst: 0,
      cart: {
        restaurantId: restaurantId,
        address_id: "",
        cartItems: items,
        couponCode: "",
        mealItems: [],
        subscriptionItems: []
      },
      _csrf: "3V4iwVo1pSEU-3EvsQ19EQ6EHpiz2jeDG3DlBbaI",
    };
    const response = await fetch(ADD_ITEM_TO_CART,{
      method: 'POST',
      body: JSON.stringify(payload)
    });
    const json = await response?.json();
  }
  return (
    <div className="rest-menu-item-wrapper">
      <div className="rest-miw-item">
        <div className="rest-miw-icons">
          <VegIcon veg={item?.card?.info?.isVeg ? true : false} />
          {item?.card?.info?.isBestseller && (
            <div
              style={{
                display: "flex",
                color: "#ee9c00",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <FontAwesomeIcon icon={faStar} />
              <span style={{ fontSize: "14px", fontWeight: "600" }}>
                Bestseller
              </span>
            </div>
          )}
        </div>
        <div className="title">{item?.card?.info?.name}</div>
        <div className="price">
          <FontAwesomeIcon icon={faIndianRupeeSign} />
          {item?.card?.info.price
            ? item?.card?.info?.price / 100
            : item?.card?.info?.defaultPrice / 100}
        </div>
        <div className="description">{item?.card?.info?.description}</div>
      </div>
      <div className="rest-miw-img">
        <img src={CLOUDANARY_URL + item?.card?.info?.imageId}></img>
        <div className="add-btn-wrapper">
          {currentItemPresentInCart ? (
            <div className="add-bw-wrapper">
              <div className="minus" onClick={removeItem}>
                -
              </div>
              <div className="quantity">
                {currentItemPresentInCart?.quantity}
              </div>
              <div
                className="plus"
                onClick={
                  item?.card?.info?.variantsV2?.variantGroups
                    ? () => setOpenModal(true)
                    : () => addItemToCart()
                }
              >
                +
              </div>
            </div>
          ) : (
            <div
              onClick={
                item?.card?.info?.variantsV2?.variantGroups
                  ? () => setOpenModal(true)
                  : () => addItemToCart()
              }
            >
              Add +
            </div>
          )}
        </div>
      </div>
      <Modal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        children={
          <VariantGroupPopup
            variantGroup={item?.card?.info?.variantsV2?.variantGroups}
            addItemToCart={addItemToCart}
          />
        }
      />
    </div>
  );
};

export default RestaurantItem;
