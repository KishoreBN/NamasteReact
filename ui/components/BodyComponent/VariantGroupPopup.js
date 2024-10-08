import { useRef, useState } from "react";
import VegIcon from "../../utils/Components/VegIcon";

const VariantGroupPopup = ({ variantGroup, addItemToCart }) => {
  let currentVariantIndex = useRef(0);
  let selectedVariants = useRef([]);
  const [variant, setVariant] = useState();
  const [currentVariant, setCurrentVariant] = useState(variantGroup[0]);
  const onContinueClick = () => {
    setCurrentVariant(variantGroup[currentVariantIndex?.current + 1]);
    currentVariantIndex.current = currentVariantIndex.current + 1;
    addVariant();
  };
  const onRadioClick = (variant) => {
    setVariant(variant);
  };
  const addItem = () => {
    addVariant();
    addItemToCart(
      selectedVariants?.current?.map((i) => {
        return {
          variation_id: i?.id,
          group_id: i?.groupId,
          price: i?.price,
          name: i?.name,
        };
      })
    );
  };
  const addVariant = () => {
    selectedVariants.current.push({
      ...variant,
      groupId: currentVariant?.groupId,
    });
  };
  return (
    <div className="popup-wrapper">
      <div className="popup-header-container">
        <div className="group-wrapper">
          <span>{currentVariant?.name}</span>
        </div>
      </div>
      <div className="variant-items-wrapper">
        {currentVariant?.variations?.map((item) => {
          return (
            <div className="variant-item">
              <VegIcon veg={item?.isVeg ? true : false} />
              <input
                type="radio"
                name="variant"
                onChange={() => onRadioClick(item)}
                checked={variant === item}
              ></input>
              <span>
                {item?.name} - Rs.{item?.price}
              </span>
            </div>
          );
        })}
      </div>
      <div className="popup-footer-container">
        {currentVariantIndex.current === variantGroup.length - 1 ? (
          <div className="add-to-cart" onClick={addItem}>
            <span>Add Item</span>
          </div>
        ) : (
          <div className="continue" onClick={onContinueClick}>
            <span>CONTINUE</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VariantGroupPopup;
