export function CheckoutHeader() {
  return (
    <header className="checkout-header">
      <a href="/">
        <img
          className="amazon-logo"
          src="images/logo.png"
        />
      </a>
      <p className="header-p1">
        Checkout (
        <a
          className="header-p1-span js-header-p1-span"
          href="/"
        >
          1 items
        </a>
        )
      </p>
      <img
        className="checkout-lock-icon"
        src=" images/icons/checkout-lock-icon.png"
      />
    </header>
  );
}
