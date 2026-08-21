import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const fetchCart = async () => {
    const { data } = await api.get("/cart");
    setCart(data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (productId, quantity) => {
    await api.put("/cart", { productId, quantity });
    fetchCart();
  };

  const removeItem = async (productId) => {
    await api.delete(`/cart/${productId}`);
    fetchCart();
  };

  if (!cart) return <p>Loading...</p>;

  const total = cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.items.length === 0 ? (
        <p>Cart is empty. <Link to="/">Browse products</Link></p>
      ) : (
        <>
          {cart.items.map((i) => (
            <div className="card" key={i.product._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3>{i.product.name}</h3>
                <p>₹{i.product.price} x {i.quantity}</p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="number"
                  min={1}
                  value={i.quantity}
                  onChange={(e) => updateQty(i.product._id, Number(e.target.value))}
                  style={{ width: 60, padding: 6 }}
                />
                <button className="btn danger" onClick={() => removeItem(i.product._id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="card">
            <h3>Total: ₹{total}</h3>
            <button className="btn" onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
