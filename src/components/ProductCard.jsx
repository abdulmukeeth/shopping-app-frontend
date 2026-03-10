import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const { cart, addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  const inCart = cart.some((i) => i._id === product._id);
  const inWishlist = wishlist.some((i) => i._id === product._id);

  return (
    <div className="col-md-4 mb-4 border-danger">
      <div className="card h-100 shadow-sm border border-grey rounded-4 overflow-hidden">
        <div className="bg-light d-flex align-items-center justify-content-center p-3">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ height: "180px", objectFit: "contain" }}
          />
        </div>

        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h6 className="fw-bold mb-0">{product.title}</h6>

            <span className="badge   text-dark">⭐ {product.rating}</span>
          </div>

          <p className="text-muted small mb-2" style={{ minHeight: "40px" }}>
            {product.description?.slice(0, 60)}...
          </p>

          <h6 className="fw-semibold mb-3">₹{product.price}</h6>

          <div className="mt-auto">
            <Link
              to={`/products/${product._id}`}
              className="btn btn-outline-primary btn-sm w-100 mb-2"
            >
              View Details
            </Link>

            {inCart ? (
              <button
                className="btn btn-success btn-sm w-100 mb-2"
                onClick={() => navigate("/cart")}
              >
                Go to Cart
              </button>
            ) : (
              <button
                className="btn btn-dark btn-sm w-100 mb-2"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            )}

            {inWishlist ? (
              <button
                className="btn btn-outline-danger btn-sm w-100"
                onClick={() => removeFromWishlist(product._id)}
              >
                Remove from Wishlist
              </button>
            ) : (
              <button
                className="btn btn-outline-danger btn-sm w-100"
                onClick={() => addToWishlist(product)}
              >
                Add to Wishlist
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
