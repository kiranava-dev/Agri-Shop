import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Wallet() {
  const { user, setUser } = useAuth();
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");

  const handleAddFunds = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const { data } = await api.post("/users/wallet/add", { amount: Number(amount) });
      const updatedUser = { ...user, walletBalance: data.walletBalance };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setMsg("Funds added successfully!");
      setAmount("");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to add funds");
    }
  };

  return (
    <div className="card" style={{ maxWidth: 400, margin: "20px auto" }}>
      <h2>Wallet</h2>
      <p>Current Balance: <strong>₹{user?.walletBalance}</strong></p>
      {msg && <p className="success">{msg}</p>}
      <form onSubmit={handleAddFunds}>
        <div className="form-group">
          <label>Add Amount (₹)</label>
          <input type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <button className="btn" type="submit">Add Funds</button>
      </form>
    </div>
  );
}
