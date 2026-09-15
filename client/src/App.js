import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import useMouseFlow from "./hooks/useMouseFlow";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Wallet from "./pages/Wallet";

import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import AddProduct from "./pages/farmer/AddProduct";
import EditProduct from "./pages/farmer/EditProduct";
import FarmerOrders from "./pages/farmer/FarmerOrders";

function App() {
  useMouseFlow();

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products/:id" element={<ProductDetails />} />

            <Route path="/cart" element={<PrivateRoute role="buyer"><Cart /></PrivateRoute>} />
            <Route path="/checkout" element={<PrivateRoute role="buyer"><Checkout /></PrivateRoute>} />
            <Route path="/my-orders" element={<PrivateRoute role="buyer"><MyOrders /></PrivateRoute>} />
            <Route path="/wallet" element={<PrivateRoute><Wallet /></PrivateRoute>} />

            <Route path="/farmer" element={<PrivateRoute role="farmer"><FarmerDashboard /></PrivateRoute>} />
            <Route path="/farmer/add-product" element={<PrivateRoute role="farmer"><AddProduct /></PrivateRoute>} />
            <Route path="/farmer/edit-product/:id" element={<PrivateRoute role="farmer"><EditProduct /></PrivateRoute>} />
            <Route path="/farmer/orders" element={<PrivateRoute role="farmer"><FarmerOrders /></PrivateRoute>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
