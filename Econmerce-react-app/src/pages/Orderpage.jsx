import { Heading } from '../Homepage-components/Homepage-Header';
import axios from 'axios';
import dayjs from 'dayjs';
import './Orderpage.css';
import { useEffect } from 'react';
import { Reset } from './Resestwebsite';

import { useState } from 'react';

export function OrdersPage({ CartItems, LoadCart }) {
  const [Orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/orders?expand=products')
      .then((response) => {
        setOrders(response.data);
      });
  }, [LoadCart]);
  return (
    <div className="orderContainer">
      <Heading CartItems={CartItems} />
      <main className="htmlbody">
        <p className="page-title">Your Orders</p>
        <div className="all-ordered-product-container js-all-ordered-product-container">
          {Orders.map((Order) => {
            return (
              <div
                key={Order.id}
                className="Order-container"
              >
                <div className="Order-container-header">
                  <div className="Order-container-header-leftside">
                    <div className="Order-container-header-leftside-div1">
                      <p className="Order-container-header-leftside-div1-p1">
                        Order Placed:
                      </p>
                      <p className="Order-container-header-leftside-div1-p2">
                        {dayjs(Order.orderTimeMs).format('MMMM D')}
                      </p>
                    </div>
                    <div className="Order-container-header-leftside-div2">
                      <p className="Order-container-header-leftside-div2-p1">
                        Total:
                      </p>
                      <p className="Order-container-header-leftside-div2-p2">
                        {(Order.totalCostCents / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="Order-container-header-rightside">
                    <p className="Order-container-header-rightside-p1">
                      Order ID:
                    </p>
                    <p className="Order-container-header-rightside-p2">
                      {Order.id}
                    </p>
                  </div>
                </div>
                {Order.products.map((OrderItems) => {
                  return (
                    <div
                      key={OrderItems.productId}
                      className="Order-container-body-grid"
                    >
                      <div className="Order-container-body-grid-imgdiv">
                        <img
                          className="Order-container-body-grid-imgdiv-img"
                          src={OrderItems.product.image}
                        />
                      </div>
                      <div className="Order-container-body-grid-proudctdetails">
                        <p className="Order-container-body-grid-proudctdetails-name">
                          {OrderItems.product.name}
                        </p>
                        <p className="Order-container-body-grid-proudctdetails-deliverydate">
                          {dayjs() >= dayjs(OrderItems.estimatedDeliveryTimeMs)
                            ? 'Delivered on'
                            : 'Arriving on'}{' '}
                          :
                          {dayjs(OrderItems.estimatedDeliveryTimeMs).format(
                            'MMMM D'
                          )}
                        </p>
                        <p className="Order-container-body-grid-proudctdetails-quantity">
                          Quantity: {OrderItems.quantity}
                        </p>
                        <button
                          className="Order-container-body-grid-proudctdetails-buy_again_btn "
                          onClick={async () => {
                            await axios.post(
                              'http://localhost:3000/api/cart-items',
                              {
                                productId: OrderItems.productId,
                                quantity: 1,
                              }
                            );
                            await LoadCart();
                          }}
                        >
                          <img src="images/icons/cart-icon.png" />
                          Add to Cart
                        </button>
                      </div>
                      <div className="Order-container-body-grid-trackpackage_btn_div">
                        <a
                          href={`./TrackOrder?orderId=${Order.id}&productId=${OrderItems.productId}`}
                        >
                          <button className="Order-container-body-grid-trackpackage_btn">
                            Track Package
                          </button>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </main>

      <Reset LoadCart={LoadCart} />
    </div>
  );
}
