import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    unit: "kg",
    locality: "",
    shippingCharge: "",
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      images.forEach((img) => fd.append("images", img));

      await api.post("/products", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/farmer");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="card" style={{ maxWidth: 500, margin: "20px auto" }}>
      <h2>Add Product</h2>
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
          <label>Unit</label>
          <select name="unit" value={form.unit} onChange={handleChange}>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="dozen">dozen</option>
            <option value="litre">litre</option>
            <option value="piece">piece</option>
          </select>
        </div>
        <div className="form-group">
          <label>Locality</label>
          <input name="locality" value={form.locality} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Shipping Charge (₹)</label>
          <input type="number" name="shippingCharge" value={form.shippingCharge} onChange={handleChange} min={0} />
        </div>
        <div className="form-group">
          <label>Images</label>
          <input type="file" multiple accept="image/*" onChange={(e) => setImages(Array.from(e.target.files))} />
        </div>
        <button className="btn" type="submit">Add Product</button>
      </form>
    </div>
  );
}
