import ProductCard from "./ProductCard";

function ProductList({ products, onView, onAdd }) {
  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onView={onView}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}

export default ProductList;
