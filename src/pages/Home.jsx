import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFilter } from "../context/FilterContext";
import Loader from "../components/Loader";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { setCategoryFilter } = useFilter();

  useEffect(() => {
    fetch("https://shopping-app-backend-one.vercel.app/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data.categories);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  return (
  <div className="px-4 mt-2">
    <h3 className="mb-4">Featured Categories</h3>

    {/* FIRST ROW - MEN & WOMEN (2 Wide Cards) */}
    <div className="row mb-4">
      {categories
        .filter(
          (cat) => cat.name === "Men Clothing" || cat.name === "Women Clothing"
        )
        .map((cat) => (
          <div key={cat._id} className="col-md-6 mb-3">
            <div
              className="card shadow-sm border border-grey rounded-4 overflow-hidden"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setCategoryFilter(cat.name);
                navigate("/products");
              }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="fw-bold">{cat.name}</h5>
              </div>
            </div>
          </div>
        ))}
    </div>

    {/* SECOND ROW - 3 CARDS */}
    <div className="row">
      {categories
        .filter(
          (cat) =>
            cat.name === "Accessories" ||
            cat.name === "Footwear" ||
            cat.name === "Kids"
        )
        .map((cat) => (
          <div key={cat._id} className="col-md-4 mb-3">
            <div
              className="card shadow-sm border border-grey rounded-4 overflow-hidden"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setCategoryFilter(cat.name);
                navigate("/products");
              }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h6 className="fw-bold">{cat.name}</h6>
              </div>
            </div>
          </div>
        ))}
    </div>
  </div>  );
}
