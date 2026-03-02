import { useEffect, useState } from "react";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import { useFilter } from "../context/FilterContext";
import { useSearch } from "../context/SearchContext";
import { applyFilters } from "../utils/filterUtils";

export default function ProductListing() {
  const { filters } = useFilter();
  const { searchText } = useSearch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://shopping-app-backend-one.vercel.app/api/products"
        );
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data.data.products);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <h4 className="text-center mt-4">Loading...</h4>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const filteredProducts = applyFilters(products, filters, searchText);

  return (
    <div className="container-fluid">
      <div className="row">
        <aside className="col-md-3">
          <Filters />
        </aside>

        <main className="col-md-9">
          <div className="row">
            {filteredProducts.length === 0 ? (
              <h5>No products found</h5>
            ) : (
              filteredProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
