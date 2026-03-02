import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { cart, addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(
        `https://shopping-app-backend-one.vercel.app/api/products/${id}`
      );
      const data = await res.json();
      setProduct(data.data.product);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <h4 className="text-center mt-4">Loading...</h4>;
  if (!product) return <h4 className="text-center mt-4">Product not found</h4>;

  const inCart = cart.some((i) => i._id === product._id);
  const inWishlist = wishlist.some((i) => i._id === product._id);

  return (
    <div className="container mt-4">
      <div className="row g-4">
        <div className="col-md-5">
          <div className="card shadow-sm border-0 rounded-4 p-3 bg-light">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid"
              style={{ height: "320px", objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="col-md-7">
          <h2 className="fw-bold">{product.title}</h2>

          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="badge bg-warning text-dark">
              ⭐ {product.rating}
            </span>
            <span className="text-muted small">
              Category: {product.category}
            </span>
          </div>

          <h4 className="fw-semibold mb-3">₹{product.price}</h4>

          <div className="d-flex gap-2 mb-4">
            {inCart ? (
              <button
                className="btn btn-success"
                onClick={() => navigate("/cart")}
              >
                Go to Cart
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            )}

            {inWishlist ? (
              <button
                className="btn btn-outline-danger"
                onClick={() => removeFromWishlist(product._id)}
              >
                Remove Wishlist
              </button>
            ) : (
              <button
                className="btn btn-outline-danger"
                onClick={() => addToWishlist(product)}
              >
                Add to Wishlist
              </button>
            )}
          </div>

          <div className="card border-0 shadow-sm rounded-4 p-3">
            <h5 className="fw-bold mb-2">Product Description</h5>
            <p className="text-muted mb-0">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
