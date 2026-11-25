import CartItem from "./CartItem";

function Cart({ items, onIncrease, onDecrease, onRemove, onContinue }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="message">
        <p>Your cart is empty.</p>
        <button className="btn" onClick={onContinue}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Cart</h2>

      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onRemove={onRemove}
        />
      ))}

      <div className="cart-total">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button className="btn-outline" onClick={onContinue}>
         Go to Main menu
        </button>
      </div>
    </div>
  );
}

export default Cart;
