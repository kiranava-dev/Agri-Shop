import { Link } from "react-router-dom";

const API_BASE = (process.env.REACT_APP_API_URL || "http://localhost:5000/api").replace("/api", "");

export default function ProductCard({ product }) {
  const image = product.images && product.images.length > 0 ? `${API_BASE}${product.images[0]}` : null;

  return (
    <Link to={`/products/${product._id}`} className="card">
      {image ? (
        <img src={image} alt={product.name} className="product-img" />
      ) : (
        <div className="product-img" />
      )}
      <h3>{product.name}</h3>
      <p>₹{product.price} / {product.unit}</p>
      <p style={{ fontSize: "0.85rem", color: "#666" }}>{product.locality}</p>
    </Link>
  );
}
