import './Homepage-Header.css';

export function Heading({ CartItems }) {
  return (
    <>
      <header className="heading">
        <div className="header-column1">
          <a href="../Amazon html/amazon-homepage.html">
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
          />
          <button className="js-header-column2-button">
            <img src="images/icons/search-icon.png" />
          </button>
        </div>
        <div className="header-column3">
          <a href="../Amazon html/Amazon-placedorder.html">
            <p className="header-p2-column3">Orders</p>
          </a>
        </div>
        <div className="header-column4">
          <a href="./Checkout">
            <img src="images/icons/cart-icon.png" />
            <p className="header-column4-p1">Cart</p>
            <p className="header-column4-p2 js-header-column4-p2">4</p>
          </a>
        </div>
      </header>
    </>
  );
}
