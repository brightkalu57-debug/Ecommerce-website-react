import { Homepage } from './pages/Homepage';
import { Checkout } from './pages/checkout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

export function App() {
  const [CartItems, setCartItems] = useState([]);
  async function loadCart() {
    const response = await axios.get(
      'http://localhost:3000/api/cart-items?expand=product'
    );
    setCartItems(response.data);
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
              LoadCart={loadCart}
              CartItems={CartItems}
            />
          }
        />
      </Routes>
    </>
  );
}
