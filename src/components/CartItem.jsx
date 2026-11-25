function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} />

      <div className="cart-info">
        <h4>{item.title}</h4>
        <p>${item.price} each</p>
      </div>

      <div className="quantity">
        <button className="btn-outline" onClick={() => onDecrease(item.id)}>
          -
        </button>
        <span>{item.quantity}</span>
        <button className="btn-outline" onClick={() => onIncrease(item.id)}>
          +
        </button>
      </div>

      <p className="price">${(item.price * item.quantity).toFixed(2)}</p>

      <button className="btn-danger" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </div>
  );
}

export default CartItem;
