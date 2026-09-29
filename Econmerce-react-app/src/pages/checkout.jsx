import { CheckoutHeader } from '../Checkout.component/Checkout-header';
import { PaymentSummary } from '../Checkout.component/paymentsummary-component';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useState } from 'react';
import axios from 'axios';
import './Checkout.css';

export function Checkout({ CartItems, LoadCart }) {
  const [Deliveryoptions, setDeliveryoptions] = useState([]);
  useEffect(() => {
    axios
      .get(
        'http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime'
      )
      .then((response) => {
        setDeliveryoptions(response.data);
      });
  }, []);
  return (
    <>
      <CheckoutHeader />
      <main className="checkout-main">
        <p className="checkout-row1">Review your order</p>
        <div className="Product-order-parent-div js-Product-order-parent-div">
          <div className="Products-parent-div">
            {CartItems.map((CartItem) => {
              return (
                <div
                  key={CartItem.productId}
                  className="checkout-product-container"
                >
                  <p className="checkout-product-container-row1-p1 js-checkout-product-container-row1-p1 ">
                    Delivery date: Tuesday, October 6
                  </p>
                  <div className="checkout-product-container-row2">
                    <div className="checkout-product-container-row2-column1">
                      <div className="checkout-product-container-row2-column1-img-div">
                        <img src={CartItem.product.image} />
                      </div>
                      <div className="checkout-product-container-row2-column1-column2">
                        <p className="checkout-product-container-row2-column1-column2-p1">
                          {CartItem.product.name}
                        </p>
                        <p className="checkout-product-container-row2-column1-column2-p2">
                          ${(CartItem.product.priceCents / 100).toFixed(2)}
                        </p>
                        <p className="checkout-product-container-row2-column1-column2-p3">
                          Quantity:
                          <span
                            className="js-product-Quantity"
                            data-product-id="${productItems.id}"
                          >
                            {CartItem.quantity}
                          </span>
                          <span
                            className="lnk js-cart-Update-lnk"
                            data-product-id="${productItems.id}"
                          >
                            Update
                          </span>
                          <span
                            onClick={async () => {
                              await axios.delete(
                                `http://localhost:3000/api/cart-items/${CartItem.productId}`
                              );
                              await LoadCart();
                            }}
                            className="lnk js-cart-delete-lnk"
                          >
                            Delete
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="checkout-product-container-row2-column2">
                      <p className="checkout-product-container-row2-column1-p1">
                        Choose a delivery option:
                      </p>
                      {Deliveryoptions.map((Deliveryoption) => {
                        let priceCents;
                        if (Deliveryoption.priceCents === 0) {
                          priceCents = ' FREE Shipping';
                        } else {
                          priceCents = `$${(
                            Deliveryoption.priceCents / 100
                          ).toFixed(2)} - Shipping`;
                        }

                        return (
                          <label
                            key={Deliveryoption.id}
                            className="checkout-product-container-row2-column2-label1 js-checkout-label"
                            data-product-id="${cartItems.productId}"
                          >
                            <input
                              className="js-checkout-labelradio"
                              checked={
                                Deliveryoption.id === CartItem.deliveryOptionId
                              }
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
                                {dayjs(
                                  Deliveryoption.estimatedDeliveryTimeMs
                                ).format('dddd, MMMM D')}
                              </p>
                              <p className="checkout-product-container-row2-column2-label-p2">
                                {priceCents}
                              </p>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <PaymentSummary CartItems={CartItems} />
        </div>
      </main>
    </>
  );
}
