import dayjs from 'dayjs';
import { useState } from 'react';
import axios from 'axios';
import { DeliveryOptions } from '../Checkout.component/Delivery-options';

export function CartProduct({
  deliveryDate,
  CartItem,
  Deliveryoptions,
  LoadCart,
}) {
  const [InputQuantity, setInputQuantity] = useState({
    values: CartItem.quantity,
  });
  const [Update, setUpdate] = useState('update');
  return (
    <div className="checkout-product-container">
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
              <span className="js-product-Quantity">
                {Update === 'update' ? (
                  CartItem.quantity
                ) : (
                  <label>
                    <input
                      onChange={(event) => {
                        event.target.validity.badInput === true
                          ? setInputQuantity({
                              error: 'false',
                              values: '',
                            })
                          : setInputQuantity({
                              values: Number(event.target.value),
                            });
                      }}
                      className="product-Quantity-label js-product-Quantity-label"
                      value={InputQuantity.values || ''}
                      type="number"
                    />
                  </label>
                )}
              </span>
              <span
                className="lnk js-cart-Update-lnk"
                data-product-id={CartItem.productId}
                onClick={async (event) => {
                  if (
                    Update === 'update' &&
                    event.currentTarget.dataset.productId === CartItem.productId
                  ) {
                    setUpdate('Save');
                  } else if (Update === 'Save') {
                    if (InputQuantity.values < 0) {
                      alert('Not a valid quantity');
                    } else if (InputQuantity.values === 0) {
                      await axios.delete(
                        `http://localhost:3000/api/cart-items/${CartItem.productId}`
                      );
                      await LoadCart();
                    } else if (InputQuantity.error === 'false') {
                      setUpdate('update');
                    } else {
                      await axios.put(
                        `http://localhost:3000/api/cart-items/${CartItem.productId}`,
                        {
                          quantity: InputQuantity.values,
                        }
                      );
                      await LoadCart();
                      setUpdate('update');
                    }
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
}
