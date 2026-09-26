import { Heading } from '../Homepage-components/Homepage-Header';
import './Homepage.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export function Homepage({ CartItems }) {
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
            <div
              key={Product.id}
              className="main-div"
            >
              <div className="main-div-img">
                <img src={Product.image} />
              </div>
              <div className="main-div-discription">{Product.name}</div>
              <div className="main-rating-div">
                <img
                  className="main-rating-img-div"
                  src={`images/ratings/rating-${Product.rating.stars * 10}.png`}
                />
                <p className="main-rating-p1-div">{Product.rating.count}</p>
              </div>
              <p className="main-p1-div">
                {(Product.priceCents / 100).toFixed(2)}
              </p>
              <select
                data-product-id="${products.id}"
                name="quantity"
                className="main-dropdownmenu-div js-main-dropdownmenu-div"
              >
                <option
                  value="1"
                  selected
                >
                  1
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="5">4</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <div
                className="main-addedcartbtn-message js-main-addedcartbtn-message"
                data-product-id="${products.id}"
              >
                <img src="../Amazon images/checkmark.Amazon.png" /> Added
              </div>
              <button
                className="main-addcartbtn-div js-main-addcartbtn"
                data-product-id="${products.id}"
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </main>
    </>
  );
}
