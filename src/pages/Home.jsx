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
    <div className="container mt-4">
      <h3>Featured Categories</h3>
      <div className="row">
        {categories.map((cat) => (
          <div key={cat._id} className="col-md-3">
            <div
              className="card p-4 text-center"
              onClick={() => {
                setCategoryFilter(cat.name);
                navigate("/products");
              }}
              style={{ cursor: "pointer" }}
            >
              <h5>{cat.name}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
