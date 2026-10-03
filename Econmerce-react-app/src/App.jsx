import { Homepage } from './pages/Homepage';
import { Checkout } from './pages/checkout';
import { OrdersPage } from './pages/Orderpage';
import { TrackOrder } from './pages/Trackorderpage';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

export function App() {
  const [CartItems, setCartItems] = useState([]);
  let cartIsLoaded = useRef(null);
  async function loadCart() {
    const response = await axios.get(
      'http://localhost:3000/api/cart-items?expand=product'
    );
    setCartItems(response.data);
    cartIsLoaded.current = 'done';

    console.log(response.data);
  }

  useEffect(() => {
    loadCart();
  }, []);
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <Homepage
              LoadCart={loadCart}
              CartItems={CartItems}
            />
          }
        />
        <Route
          path="Checkout"
          element={
            <Checkout
              cartIsLoaded={cartIsLoaded}
              LoadCart={loadCart}
              CartItems={CartItems}
            />
          }
        />
        <Route
          path="Orders"
          element={
            <OrdersPage
              CartItems={CartItems}
              LoadCart={loadCart}
            />
          }
        />
        <Route
          path="TrackOrder"
          element={
            <TrackOrder
              CartItems={CartItems}
              LoadCart={loadCart}
            />
          }
        />
      </Routes>
    </>
  );
}
