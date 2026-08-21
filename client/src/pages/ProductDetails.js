import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const API_BASE = (process.env.REACT_APP_API_URL || "http://localhost:5000/api").replace("/api", "");

export default function ProductDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) return navigate("/login");
    if (user.role !== "buyer") return setMsg("Only buyers can add to cart.");
    try {
      await api.post("/cart", { productId: id, quantity: 1 });
      setMsg("Added to cart!");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to add to cart");
    }
  };

  if (!product) return <p>Loading...</p>;

  const image = product.images && product.images.length > 0 ? `${API_BASE}${product.images[0]}` : null;

  return (
    <div className="card" style={{ maxWidth: 600, margin: "20px auto" }}>
      {image && <img src={image} alt={product.name} className="product-img" style={{ height: 260 }} />}
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p><strong>Price:</strong> ₹{product.price} / {product.unit}</p>
      <p><strong>Available:</strong> {product.quantity} {product.unit}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Locality:</strong> {product.locality}</p>
      <p><strong>Shipping charge:</strong> ₹{product.shippingCharge}</p>
      <p><strong>Sold by:</strong> {product.farmer?.name}</p>
      {msg && <p className="success">{msg}</p>}
      <button className="btn" onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
