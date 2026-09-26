import { Homepage } from './pages/Homepage';
import { Checkout } from './pages/checkout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

export function App() {
  const [CartItems, setCartItems] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/cart-items?expand=product')
      .then((response) => {
        setCartItems(response.data);
        console.log(response.data);
      });
  }, []);
  return (
    <>
      <Routes>
        <Route
          index
          element={<Homepage CartItems={CartItems} />}
        />
        <Route
          path="Checkout"
          element={<Checkout CartItems={CartItems} />}
        />
      </Routes>
    </>
  );
}
