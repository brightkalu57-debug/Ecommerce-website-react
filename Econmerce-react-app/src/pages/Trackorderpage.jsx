import { useEffect } from 'react';
import { useState, useRef } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';

import './Trackorder.css';
import { Heading } from '../Homepage-components/Homepage-Header';

export function TrackOrder({ CartItems }) {
  const [OrderedProducts, setOrderedProducts] = useState([]);
  const progressbar = useRef(null);

  const params = new URLSearchParams(window.location.search);

  const paramsOrderId = params.get('orderId');
  const paramsProductId = params.get('productId');

  let orderIsLoaded = useRef(null);

  useEffect(() => {
    async function loadOrder() {
      const response = await axios.get(
        `http://localhost:3000/api/orders/${paramsOrderId}?expand=products`
      );
      setOrderedProducts(response.data);
      orderIsLoaded.current = 'done';

      console.log(response.data);
    }
    loadOrder();
  }, [paramsOrderId]);

  if (orderIsLoaded.current === 'done') {
    const matchingItem = OrderedProducts.products.find(
      (OrderedProduct) => OrderedProduct.productId === paramsProductId
    );

    const orderTime = dayjs(OrderedProducts.orderTimeMs);
    const currentTime = dayjs();
    const deliveryTime = dayjs(matchingItem.estimatedDeliveryTimeMs);

    const totalTime = deliveryTime.diff(orderTime);
    const elaspedTime = currentTime.diff(orderTime);

    let progressBarPercentage = Math.max(
      5,
      Math.min((elaspedTime / totalTime) * 100, 100)
    );
    console.log(progressBarPercentage);
    setTimeout(() => {
      if (progressbar) {
        progressbar.current.style.width = `${progressBarPercentage}%`;
      }
    }, 50);

    return (
      <div className="trackOrderContainer">
        <Heading CartItems={CartItems} />
        <main className="htmlbody">
          <a
            className="Viewallorders-lnk"
            href="./Orders"
          >
            View all orders
          </a>
          <div className="js-Trackproduct-container">
            <p className="deliverystatus">
              {progressBarPercentage === 100 ? 'Delivered on' : 'Arriving on'}{' '}
              {dayjs(matchingItem.estimatedDeliveryTimeMs).format('MMMM D')}
            </p>
            <p className="product-name">{matchingItem.product.name}</p>
            <p className="product-Quantity">
              Quantity: {matchingItem.quantity}
            </p>
            <div className="img-container">
              <img src={matchingItem.product.image} />
            </div>
            <div className="delivery-container">
              <div className="delivery-container-p-div">
                <p className="delivery-container-p js-delivery-container-p1">
                  Preparing
                </p>
                <p className="delivery-container-p js-delivery-container-p2">
                  Shipped
                </p>
                <p className="delivery-container-p js-delivery-container-p3">
                  Delivered
                </p>
              </div>
              <div className="deliveryprogressbar-container ">
                <div
                  className="deliveryprogressbar js-deliveryprogressbar"
                  ref={progressbar}
                ></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
