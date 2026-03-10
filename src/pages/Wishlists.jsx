import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!wishlist.length)
    return <h4 className="text-center mt-4">Wishlist is empty</h4>;

  return (
    <div className="px-4 mt-4">
      <h3>My Wishlist</h3>

      <div className="row mt-4">
        {wishlist.map((item) => (
          <div key={item._id} className="col-md-3">
            <div className="card p-3">
              <img
                src={item.image}
                alt={item.title}
                className="img-fluid mb-4"
                style={{ height: "150px", objectFit: "contain" }}
              />
              <h6 className="px-2">{item.title}</h6>
              <p className="px-2">₹{item.price}</p>

              <button
                className="btn btn-primary btn-sm mb-2"
                onClick={() => {
                  addToCart(item);
                  removeFromWishlist(item.productId);
                }}
              >
                Move to Cart
              </button>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeFromWishlist(item.productId)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
