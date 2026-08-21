import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [locality, setLocality] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (params = {}) => {
    setLoading(true);
    try {
      const { data } = await api.get("/products", { params });
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts({ q: q || undefined, locality: locality || undefined });
  };

  return (
    <div>
      <h1>Fresh from the Farm</h1>
      <form onSubmit={handleSearch} style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          placeholder="Search product or category"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ flex: 2, padding: 9, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <input
          placeholder="Locality"
          value={locality}
          onChange={(e) => setLocality(e.target.value)}
          style={{ flex: 1, padding: 9, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <button className="btn" type="submit">Search</button>
      </form>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
