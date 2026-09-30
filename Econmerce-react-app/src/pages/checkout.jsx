import { CheckoutHeader } from '../Checkout.component/Checkout-header';
import { PaymentSummary } from '../Checkout.component/paymentsummary-component';
import { DeliveryOptions } from '../Checkout.component/Delivery-options';
import { useEffect } from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import './Checkout.css';

export function Checkout({ CartItems, LoadCart }) {
  const [Deliveryoptions, setDeliveryoptions] = useState([]);
  const [InputQuantity, setInputQuantity] = useState(1);

  const [Update, setUpdate] = useState('update');
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
              const deliveryDate = Deliveryoptions.find((Deliveryoption) => {
                return Deliveryoption.id === CartItem.deliveryOptionId;
              })?.estimatedDeliveryTimeMs;
              return (
                <div
                  key={CartItem.productId}
                  className="checkout-product-container"
                >
                  <p className="checkout-product-container-row1-p1 js-checkout-product-container-row1-p1 ">
                    Delivery date: {dayjs(deliveryDate).format('dddd, MMMM D')}
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
                            {Update === 'update' ? (
                              CartItem.quantity
                            ) : (
                              <label>
                                <input
                                  onChange={(event) => {
                                    setInputQuantity(
                                      Number(event.target.value)
                                    );
                                  }}
                                  className="product-Quantity-label js-product-Quantity-label"
                                  value={InputQuantity}
                                  type="number"
                                  min="1"
                                />
                              </label>
                            )}
                          </span>
                          <span
                            className="lnk js-cart-Update-lnk"
                            onClick={async () => {
                              if (Update === 'update') {
                                setUpdate('Save');
                              } else if (Update === 'Save') {
                                await axios.put(
                                  `http://localhost:3000/api/cart-items/${CartItem.productId}`,
                                  {
                                    quantity: InputQuantity,
                                  }
                                );
                                await LoadCart();
                                setUpdate('update');
                              }
                            }}
                          >
                            {Update === 'update' ? 'Update' : 'Save'}
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
                      <DeliveryOptions
                        LoadCart={LoadCart}
                        CartItem={CartItem}
                        Deliveryoptions={Deliveryoptions}
                      />
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
