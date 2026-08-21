import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function FarmerDashboard() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await api.get("/products/farmer/mine");
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>My Products</h1>
        <Link className="btn" to="/farmer/add-product">+ Add Product</Link>
      </div>
      {products.length === 0 && <p>You haven't listed any products yet.</p>}
      <div className="grid">
        {products.map((p) => (
          <div className="card" key={p._id}>
            <h3>{p.name}</h3>
            <p>₹{p.price} / {p.unit} — Stock: {p.quantity}</p>
            <p style={{ fontSize: "0.85rem", color: "#666" }}>{p.category} • {p.locality}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <Link className="btn secondary" to={`/farmer/edit-product/${p._id}`}>Edit</Link>
              <button className="btn danger" onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
