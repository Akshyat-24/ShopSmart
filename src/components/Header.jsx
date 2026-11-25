import ProductCard from "./ProductCard";

function Header({ cartCount, onHome, onCart }) {
  return (
    <header className="header">
      <h1 className="logo" onClick={onHome}>ShopSmart</h1>
      <button className="btn" onClick={onCart}>
        Cart({cartCount})
      </button>
    </header>
  );
}

export default Header;
