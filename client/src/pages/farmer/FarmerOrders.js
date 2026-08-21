import { useEffect, useState } from "react";
import api from "../../api/axios";

const STATUS_OPTIONS = ["placed", "shipped", "delivered", "cancelled"];

export default function FarmerOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { data } = await api.get("/orders/farmer");
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    await api.put(`/orders/${orderId}/status`, { status });
    fetchOrders();
  };

  return (
    <div>
      <h1>Orders for My Products</h1>
      {orders.length === 0 && <p>No orders yet.</p>}
      {orders.map((o) => (
        <div className="card" key={o._id}>
          <p><strong>Order #{o._id.slice(-6)}</strong></p>
          <ul>
            {o.items.map((it, idx) => (
              <li key={idx}>{it.name} x {it.quantity} — ₹{it.price * it.quantity}</li>
            ))}
          </ul>
          <p style={{ fontSize: "0.85rem", color: "#666" }}>
            Ship to: {o.shippingAddress?.addressLine}, {o.shippingAddress?.city} - {o.shippingAddress?.pincode} ({o.shippingAddress?.phone})
          </p>
          <div className="form-group" style={{ maxWidth: 200 }}>
            <label>Status</label>
            <select value={o.status} onChange={(e) => handleStatusChange(o._id, e.target.value)}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
