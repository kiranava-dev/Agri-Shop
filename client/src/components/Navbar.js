import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/" className="brand">🌾 Agri Shop</Link>
      <div>
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {user && user.role === "buyer" && (
          <>
            <Link to="/cart">Cart</Link>
            <Link to="/my-orders">My Orders</Link>
            <Link to="/wallet">Wallet (₹{user.walletBalance})</Link>
          </>
        )}
        {user && user.role === "farmer" && (
          <>
            <Link to="/farmer">My Products</Link>
            <Link to="/farmer/orders">Orders</Link>
            <Link to="/wallet">Wallet (₹{user.walletBalance})</Link>
          </>
        )}
        {user && (
          <a href="#!" onClick={handleLogout}>
            Logout ({user.name})
          </a>
        )}
      </div>
    </div>
  );
}
