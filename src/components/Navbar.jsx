import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar() {
  const { searchText, setSearchText } = useSearch();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const wishlistCount = wishlist.length;

  return (
    <nav className="navbar navbar-light bg-light px-4 shadow-sm sticky-top">
      <Link className="navbar-brand fw-bold" to="/">
        MyShoppingSite
      </Link>

      <input
        className="form-control w-50"
        placeholder="Search products..."
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          navigate("/products");
        }}
      />

      <div className="d-flex gap-4 align-items-center">
        <Link to="/profile" className="text-dark text-decoration-none">
          <FaUser size={20} />
        </Link>

        <Link to="/wishlist" className="position-relative text-dark">
          <FaHeart size={20} />
          {wishlistCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {wishlistCount}
            </span>
          )}
        </Link>

        <Link to="/cart" className="position-relative text-dark">
          <FaShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
