import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Checkout() {
  const navigate = useNavigate();
  const [address, setAddress] = useState({ addressLine: "", city: "", state: "", pincode: "", phone: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/orders", { shippingAddress: address });
      navigate("/my-orders");
    } catch (err) {
      setError(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="card" style={{ maxWidth: 460, margin: "20px auto" }}>
      <h2>Checkout - Shipping Address</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Address Line</label>
          <input name="addressLine" value={address.addressLine} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>City</label>
          <input name="city" value={address.city} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>State</label>
          <input name="state" value={address.state} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Pincode</label>
          <input name="pincode" value={address.pincode} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input name="phone" value={address.phone} onChange={handleChange} required />
        </div>
        <button className="btn" type="submit">Place Order (Pay via Wallet)</button>
      </form>
    </div>
  );
}
