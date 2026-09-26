import { CheckoutHeader } from '../Checkout.component/Checkout-header';
import './Checkout.css';

export function Checkout({ CartItems }) {
  return (
    <>
      <CheckoutHeader />

      <div className="Product-order-parent-div js-Product-order-parent-div">
        <div className="Products-parent-div">
          {CartItems.map((CartItem) => {
            return (
              <div
                key={CartItem.productId}
                className="checkout-product-container"
              >
                <p className="checkout-product-container-row1-p1 js-checkout-product-container-row1-p1 ">
                  Tuesday, October 6
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
                          className="lnk js-cart-delete-lnk"
                          data-product-id="${productItems.id}"
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
                    <label
                      className="checkout-product-container-row2-column2-label1 js-checkout-label"
                      data-product-id="${cartItems.productId}"
                      data-product-name="FREEShipping"
                    >
                      <input
                        className="js-checkout-labelradio"
                        type="radio"
                        data-product-id="${cartItems.productId}"
                        data-delivery-option-id="1"
                        name="${cartItems.productId}"
                      />
                      <div className="checkout-product-container-row2-column2-label-p-div">
                        <p className="checkout-product-container-row2-column2-label-p js-checkout-product-container-row2-column2-label-p">
                          Tuesday, October 6
                        </p>
                        <p className="checkout-product-container-row2-column2-label-p2">
                          {' '}
                          FREE Shipping
                        </p>
                      </div>
                    </label>
                    <label
                      className="checkout-product-container-row2-column2-label2 js-checkout-label"
                      data-product-id="${cartItems.productId}"
                      data-product-name="ThreedaysShipping"
                    >
                      <input
                        className="js-checkout-labelradio"
                        type="radio"
                        data-product-id="${cartItems.productId}"
                        data-delivery-option-id="2"
                        name="${cartItems.productId}"
                      />
                      <div className="checkout-product-container-row2-column2-label-p-div">
                        <p className="checkout-product-container-row2-column2-label-p ">
                          Wednesday, September 30
                        </p>
                        <p className="checkout-product-container-row2-column2-label-p2">
                          $4.99 - Shipping
                        </p>
                      </div>
                    </label>
                    <label
                      className="checkout-product-container-row2-column2-label3 js-checkout-label"
                      data-product-id="${cartItems.productId}"
                      data-product-name="onedaysShipping"
                    >
                      <input
                        className="js-checkout-labelradio"
                        type="radio"
                        data-product-id="${cartItems.productId}"
                        data-delivery-option-id="3"
                        name="${cartItems.productId}"
                      />
                      <div className="checkout-product-container-row2-column2-label-p-div">
                        <p className="checkout-product-container-row2-column2-label-p">
                          Monday, September 28
                        </p>
                        <p className="checkout-product-container-row2-column2-label-p2">
                          $9.99 - Shipping
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="checkoutPlaceorder-container">
          <p className="checkoutPlaceorder-container-p1">Order Summary</p>
          <div className="checkoutPlaceorder-container-div1">
            <p>ItemsQuantity:</p>
            <p>ItemsPrice</p>
          </div>
          <div className="checkoutPlaceorder-container-div2">
            <p>Shipping & handling:</p>
            <p className="js-checkoutPlaceorder-container-div2">
              .addShippingPrices
            </p>
          </div>
          <hr className="checkoutPlaceorder-container-hr1" />
          <div className="checkoutPlaceorder-container-div3">
            <p>Total before tax:</p>
            <p>totalBeforeTax</p>
          </div>
          <div className="checkoutPlaceorder-container-div4">
            <p>Estimated tax (10%):</p>
            <p>estimatedTax</p>
          </div>
          <div className="checkoutPlaceorder-container-div5">
            <p>Order total:</p>
            <p>orderTotal</p>
          </div>
          <a href="../Amazon html/Amazon-placedorder.html">
            <div className="checkoutPlaceorder-container-abledbutton-div">
              <button className="checkoutPlaceorder-container-button js-checkoutPlaceorder-container-button">
                Place your order
              </button>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
