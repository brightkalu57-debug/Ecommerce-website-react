import { CheckoutHeader } from '../Checkout.component/Checkout-header';
import { PaymentSummary } from '../Checkout.component/paymentsummary-component';
import { Reset } from './Resestwebsite';
import { CartProduct } from '../Checkout.component/Cart-Products';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Checkout.css';

export function Checkout({ CartItems, LoadCart, cartIsLoaded }) {
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
      <CheckoutHeader CartItems={CartItems} />
      <main className="checkout-main">
        <p className="checkout-row1">Review your order</p>
        <div className="Product-order-parent-div js-Product-order-parent-div">
          {cartIsLoaded.current === 'done' && CartItems.length === 0 ? (
            <>
              <div>
                <p className="empty-cart-message">Your cart is empty</p>
                <a href="./">
                  <button className="View-product-btn">View product</button>
                </a>
              </div>
              <div className="checkoutPlaceorder-container">
                <p className="checkoutPlaceorder-container-p1">Order Summary</p>
                <div className="checkoutPlaceorder-container-div1">
                  <p>Items (0):</p>
                  <p>$0.00</p>
                </div>
                <div className="checkoutPlaceorder-container-div2">
                  <p>Shipping & handling:</p>
                  <p>$0.00</p>
                </div>
                <hr className="checkoutPlaceorder-container-hr1" />
                <div className="checkoutPlaceorder-container-div3">
                  <p>Total before tax:</p>
                  <p>$0.00</p>
                </div>
                <div className="checkoutPlaceorder-container-div4">
                  <p>Estimated tax (10%):</p>
                  <p>$0.00</p>
                </div>
                <div className="checkoutPlaceorder-container-div5">
                  <p>Order total:</p>
                  <p>$0.00</p>
                </div>
                <div className="checkoutPlaceorder-container-disabledbutton-div">
                  <button className="checkoutPlaceorder-container-disabledbutton">
                    Place your order
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="Products-parent-div">
                {CartItems.map((CartItem) => {
                  const deliveryDate = Deliveryoptions.find(
                    (Deliveryoption) => {
                      return Deliveryoption.id === CartItem.deliveryOptionId;
                    }
                  )?.estimatedDeliveryTimeMs;
                  return (
                    <CartProduct
                      key={CartItem.productId}
                      deliveryDate={deliveryDate}
                      CartItem={CartItem}
                      LoadCart={LoadCart}
                      Deliveryoptions={Deliveryoptions}
                    />
                  );
                })}
              </div>
              <PaymentSummary CartItems={CartItems} />
            </>
          )}
        </div>
      </main>

      <Reset LoadCart={LoadCart} />
    </>
  );
}
