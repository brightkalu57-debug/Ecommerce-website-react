import { useState, useRef } from 'react';
import axios from 'axios';

export function HomepageProducts({ Product, LoadCart }) {
  const [SelectsValue, setSelectsValue] = useState(1);
  const addToCartMessage = useRef(null);

  return (
    <div className="main-div">
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
      <p className="main-p1-div">{(Product.priceCents / 100).toFixed(2)}</p>
      <select
        onChange={(event) => {
          setSelectsValue(Number(event.target.value));
        }}
        data-product-id="${products.id}"
        value={SelectsValue}
        className="main-dropdownmenu-div js-main-dropdownmenu-div"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <div
        ref={addToCartMessage}
        className="main-addedcartbtn-message js-main-addedcartbtn-message"
        data-product-id="${products.id}"
      >
        <img src="images/icons/checkmark.png" /> Added
      </div>
      <button
        onClick={async () => {
          await axios.post('http://localhost:3000/api/cart-items', {
            productId: Product.id,
            quantity: SelectsValue,
          });
          LoadCart();
          addToCartMessage.current.style.opacity = `1`;

          setTimeout(() => {
            addToCartMessage.current.style.opacity = `0`;
          }, 2000);
        }}
        className="main-addcartbtn-div js-main-addcartbtn"
        data-product-id="${products.id}"
      >
        Add to Cart
      </button>
    </div>
  );
}
