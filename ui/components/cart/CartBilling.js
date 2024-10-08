const CartBilling = ({ cartBills }) => {
  const arrayOfKeys = [
    "item_total",
    "positive_delivery_charges_exclusive",
    "add_delivery_tip",
    "partial_platform_fee_m3",
    "taxes_and_charges",
    "grand_total",
  ];
  return (
    <div className="cart-bill-container">
      <div className="cart-bill-wrapper">
        <div className="header">Bill Details</div>
        <div className="bill-details-wrapper">
          {cartBills?.map((item) => {
            if (arrayOfKeys.includes(item?.key)) {
              return (
                <div
                  className={`${
                    item?.key == "grand_total"
                      ? "bill-item-wrapper grand-total "
                      : "bill-item-wrapper"
                  }`}
                >
                  <span>{item?.display_text}</span>
                  <span>{item?.value}</span>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default CartBilling;
