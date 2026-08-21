import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => {
      const p = res.data;
      setForm({
        name: p.name,
        category: p.category,
        description: p.description,
        price: p.price,
        quantity: p.quantity,
        unit: p.unit,
        locality: p.locality,
        shippingCharge: p.shippingCharge,
      });
    });
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.put(`/products/${id}`, form);
      navigate("/farmer");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update product");
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div className="card" style={{ maxWidth: 500, margin: "20px auto" }}>
      <h2>Edit Product</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input name="category" value={form.category} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} />
        </div>
        <div className="form-group">
          <label>Price (₹)</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} required min={0} />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input type="number" name="quantity" value={form.quantity} onChange={handleChange} required min={0} />
        </div>
        <div className="form-group">
          <label>Locality</label>
          <input name="locality" value={form.locality} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Shipping Charge (₹)</label>
          <input type="number" name="shippingCharge" value={form.shippingCharge} onChange={handleChange} min={0} />
        </div>
        <button className="btn" type="submit">Save Changes</button>
      </form>
    </div>
  );
}
