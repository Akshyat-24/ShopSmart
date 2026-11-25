function ProductCard({ product, onView, onAdd }) {
  return (
    <div className="card">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="muted">{product.category}</p>
      <p className="price">${product.price}</p>
      <p> {product.rating}</p>
      <div className="card-buttons">
        <button className="btn-outline" onClick={() => onView(product.id)}>
          Details
        </button>
        <button className="btn" onClick= {() =>{
          onAdd(product)
        }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
