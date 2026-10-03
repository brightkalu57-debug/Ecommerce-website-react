import './Homepage-Header.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Heading({ CartItems }) {
  const [HeaderSearchInput, setHeaderSearchInput] = useState([]);
  const Navigate = useNavigate();
  let cartIconQuantity = 0;
  CartItems.forEach((CartItem) => {
    cartIconQuantity += CartItem.quantity;
  });

  return (
    <>
      <header className="heading">
        <div className="header-column1">
          <a href="./">
            <img
              className="header-img-column1"
              src="images/logo-white.png"
            />
          </a>
        </div>
        <div className="header-column2">
          <input
            placeholder="Search"
            className="js-header-column2-input"
            onKeyDown={(event) => {
              event.key === 'Enter' &&
                Navigate(`./?search=${HeaderSearchInput}`);
            }}
            onChange={(event) => {
              setHeaderSearchInput(event.target.value);
            }}
          />
          <a
            className="js-header-column2-button"
            href={`./?search=${HeaderSearchInput}`}
          >
            <button className="js-header-column2-button">
              <img src="images/icons/search-icon.png" />
            </button>
          </a>
        </div>
        <div className="header-column3">
          <a href="./Orders">
            <p className="header-p2-column3">Orders</p>
          </a>
        </div>
        <div className="header-column4">
          <a href="./Checkout">
            <img src="images/icons/cart-icon.png" />
            <p className="header-column4-p1">Cart</p>
            <p className="header-column4-p2 js-header-column4-p2">
              {cartIconQuantity}
            </p>
          </a>
        </div>
      </header>
    </>
  );
}
