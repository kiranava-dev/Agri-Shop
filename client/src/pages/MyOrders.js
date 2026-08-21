import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/mine").then((res) => setOrders(res.data));
  }, []);

  return (
    <div>
      <h1>My Orders</h1>
      {orders.length === 0 && <p>No orders yet.</p>}
      {orders.map((o) => (
        <div className="card" key={o._id}>
          <p><strong>Order #{o._id.slice(-6)}</strong> — <span className={`badge ${o.status}`}>{o.status}</span></p>
          <ul>
            {o.items.map((it, idx) => (
              <li key={idx}>{it.name} x {it.quantity} — ₹{it.price * it.quantity}</li>
            ))}
          </ul>
          <p>Shipping: ₹{o.shippingCharge} | <strong>Total: ₹{o.totalAmount}</strong></p>
          <p style={{ fontSize: "0.85rem", color: "#666" }}>
            {o.shippingAddress?.addressLine}, {o.shippingAddress?.city} - {o.shippingAddress?.pincode}
          </p>
        </div>
      ))}
    </div>
  );
}
