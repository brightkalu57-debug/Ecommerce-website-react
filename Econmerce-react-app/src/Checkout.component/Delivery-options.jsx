import dayjs from 'dayjs';
import axios from 'axios';

export function DeliveryOptions({ CartItem, Deliveryoptions, LoadCart }) {
  return Deliveryoptions.map((Deliveryoption) => {
    let priceCents;
    if (Deliveryoption.priceCents === 0) {
      priceCents = ' FREE Shipping';
    } else {
      priceCents = `$${(Deliveryoption.priceCents / 100).toFixed(
        2
      )} - Shipping`;
    }

    return (
      <label
        key={Deliveryoption.id}
        className="checkout-product-container-row2-column2-label1 js-checkout-label"
        data-product-id="${cartItems.productId}"
      >
        <input
          className="js-checkout-labelradio"
          checked={Deliveryoption.id === CartItem.deliveryOptionId}
          type="radio"
          onChange={async () => {
            await axios.put(
              `http://localhost:3000/api/cart-items/${CartItem.productId}`,
              {
                deliveryOptionId: `${Deliveryoption.id}`,
              }
            );
            await LoadCart();
          }}
          data-delivery-option-id="1"
          name={CartItem.productId}
        />
        <div className="checkout-product-container-row2-column2-label-p-div">
          <p className="checkout-product-container-row2-column2-label-p ">
            {dayjs(Deliveryoption.estimatedDeliveryTimeMs).format(
              'dddd, MMMM D'
            )}
          </p>
          <p className="checkout-product-container-row2-column2-label-p2">
            {priceCents}
          </p>
        </div>
      </label>
    );
  });
}
