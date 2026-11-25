import { useState, useEffect } from "react";
import { fetchProductById } from "../api";

function ProductDetails({ productId, onBack, onAdd }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchProductById(productId)
      .then((data) => {
        setProduct(data);
        setMainImage(data.images[0] || data.thumbnail);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <p className="message">Loading product...</p>;
  }

  if (error || !product) {
    return <p className="message error">{error || "Product not found."}</p>;
  }

  return (
    <div>
      <button className="btn-outline" onClick={onBack}>
        ← Back to products
      </button>

      <div className="details">
        <div className="details-images">
          <img className="main-image" src={mainImage} alt={product.title} />
          <div className="thumbs">
            {product.images.map((image) => (
              <img
                key={image}
                src={image}
                alt={product.title}
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </div>

        <div className="details-info">
          <h2>{product.title}</h2>
          <p className="muted">
            {product.brand ? `${product.brand} • ` : ""}
            {product.category}
          </p>
          <p className="price big">${product.price}</p>
          <p>⭐ {product.rating}</p>
          <p>{product.description}</p>
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
          <p>
            <strong>Availability:</strong> {product.availabilityStatus}
          </p>
          <p>
            <strong>Shipping:</strong> {product.shippingInformation}
          </p>
          <p>
            <strong>Warranty:</strong> {product.warrantyInformation}
          </p>
          <button className="btn" onClick={() => onAdd(product)}>
            Add to Cart
          </button>
        </div>
      </div>

      <div className="reviews">
        <h3>Customer Reviews</h3>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="review">
              <strong>{review.reviewerName}</strong> — ⭐ {review.rating}
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
