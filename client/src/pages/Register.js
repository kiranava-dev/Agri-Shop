import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "buyer",
    locality: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await register(form);
      navigate(user.role === "farmer" ? "/farmer" : "/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="card" style={{ maxWidth: 460, margin: "40px auto" }}>
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>I am a</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="buyer">Buyer</option>
            <option value="farmer">Farmer</option>
          </select>
        </div>
        <div className="form-group">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Locality</label>
          <input name="locality" value={form.locality} onChange={handleChange} required />
        </div>
        <button className="btn" type="submit">Create Account</button>
      </form>
      <p style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
