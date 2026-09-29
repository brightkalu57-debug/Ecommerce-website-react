import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export function PaymentSummary(CartItems) {
  const [Paymentsummary, setPaymentsummary] = useState([]);

  async function loadpaymentsummary() {
    const response = await axios.get(
      'http://localhost:3000/api/payment-summary'
    );
    setPaymentsummary(response.data);
  }
  useEffect(() => {
    loadpaymentsummary();
  }, [CartItems]);

  return (
    <div className="checkoutPlaceorder-container">
      <p className="checkoutPlaceorder-container-p1">Payment Summary</p>
      <div className="checkoutPlaceorder-container-div1">
        <p>Items ({Paymentsummary.totalItems}): </p>
        <p>${(Paymentsummary.productCostCents / 100).toFixed(2)}</p>
      </div>
      <div className="checkoutPlaceorder-container-div2">
        <p>Shipping & handling:</p>
        <p className="js-checkoutPlaceorder-container-div2">
          ${(Paymentsummary.shippingCostCents / 100).toFixed(2)}
        </p>
      </div>
      <hr className="checkoutPlaceorder-container-hr1" />
      <div className="checkoutPlaceorder-container-div3">
        <p>Total before tax:</p>
        <p>${(Paymentsummary.totalCostBeforeTaxCents / 100).toFixed(2)}</p>
      </div>
      <div className="checkoutPlaceorder-container-div4">
        <p>Estimated tax (10%):</p>
        <p>${(Paymentsummary.taxCents / 100).toFixed(2)}</p>
      </div>
      <div className="checkoutPlaceorder-container-div5">
        <p>Order total:</p>
        <p>${(Paymentsummary.totalCostCents / 100).toFixed(2)}</p>
      </div>
      <a href="../Amazon html/Amazon-placedorder.html">
        <div className="checkoutPlaceorder-container-abledbutton-div">
          <button className="checkoutPlaceorder-container-button js-checkoutPlaceorder-container-button">
            Place your order
          </button>
        </div>
      </a>
    </div>
  );
}
