import VegIcon from "../../utils/Components/VegIcon";

const CartItems = ({ cartItems }) => {
  return (
    <div className="cart-items-wrapper">
      {Object.values(cartItems)?.map((item) => {
        return (
          <div className="item-wrapper">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <VegIcon veg={item?.items[0]?.isVeg} />
              <span>{item?.items[0]?.name}</span>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "200px", justifyContent: "space-between" }}>
              <div style={{display: "flex", gap: "10px", border: "1px solid #c0c1c7", padding: "0px 5px"}}>
                <span style={{color: "#c0c1c7"}}> - </span>
                <span style={{color: "green"}}>{item?.items[0]?.quantity}</span>
                <span style={{color: "green"}}> + </span>
              </div>
              <span>Rs.{item?.items[0]?.total / 100}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;
