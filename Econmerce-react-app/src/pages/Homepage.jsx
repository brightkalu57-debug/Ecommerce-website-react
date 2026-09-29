import { Heading } from '../Homepage-components/Homepage-Header';
import { HomepageProducts } from '../Homepage-components/Products-components';
import './Homepage.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export function Homepage({ CartItems, LoadCart }) {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/products').then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      <Heading CartItems={CartItems} />
      <main className="maincontainer">
        {Products.map((Product) => {
          return (
            <HomepageProducts
              key={Product.id}
              Product={Product}
              LoadCart={LoadCart}
            />
          );
        })}
      </main>
    </>
  );
}
