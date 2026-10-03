import { Heading } from '../Homepage-components/Homepage-Header';
import { HomepageProducts } from '../Homepage-components/Products-components';
import './Homepage.css';
import { Reset } from './Resestwebsite';
import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

export function Homepage({ CartItems, LoadCart }) {
  const [Products, setProducts] = useState([]);
  const [producIsLoaded, setproducIsLoaded] = useState('');

  const [params] = useSearchParams();
  const searchValue = params.get('search');

  useEffect(() => {
    async function loadproduct() {
      const response = await axios.get(
        `http://localhost:3000/api/products?search=${searchValue}`
      );
      setProducts(response.data);
      console.log(response.data.length);
      setproducIsLoaded('true');
    }
    if (searchValue === null) {
      axios.get('http://localhost:3000/api/products').then((response) => {
        setProducts(response.data);
      });
    } else {
      loadproduct();
    }
  }, [searchValue]);

  return (
    <>
      <Heading CartItems={CartItems} />
      <main className="maincontainer">
        {producIsLoaded === 'true' && Products.length === 0 && (
          <p>No products matched your search.</p>
        )}

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

      <Reset LoadCart={LoadCart} />
    </>
  );
}
