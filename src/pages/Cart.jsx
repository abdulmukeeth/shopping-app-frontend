import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty, totalPrice } =
    useCart();
  const { addToWishlist } = useWishlist();

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  if (!cart.length) {
    return (
      <div className="px-4 mt-4 text-center">
        <h3 className="fw-bold">My Cart</h3>
        <div className="card p-4 mt-3 shadow-sm border border-grey rounded-4">
          <h5 className="mb-2">Your cart is empty 🛒</h5>
          <p className="text-muted mb-3">
            Looks like you haven’t added anything yet.
          </p>
          <Link to="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 mt-4">
      <h3 className="fw-bold mb-3">My Cart</h3>

      <div className="row g-4">
        {/* LEFT: CART ITEMS */}
        <div className="col-md-8">
          {cart.map((item) => (
            <div
              key={item._id}
              className="card shadow-sm border border-grey rounded-4 mb-3"
            >
              <div className="card-body">
                <div className="d-flex gap-3 align-items-center">
                  {/* IMAGE */}
                  <div
                    className="bg-light rounded-3 d-flex align-items-center justify-content-center"
                    style={{ width: "110px", height: "130px" }}
                  >
                    {console.log(item)}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid"
                      style={{ height: "130px", objectFit: "contain" }}
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-1">{item.title}</h6>
                    <p className="text-muted mb-1">⭐ {item.rating}</p>
                    <h6 className="mb-2">₹{item.price}</h6>

                    {/* QUANTITY */}
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => decreaseQty(item.productId)}
                      >
                        -
                      </button>

                      <span className="fw-semibold">{item.qty}</span>

                      <button
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => increaseQty(item.productId)}
                      >
                        +
                      </button>

                      <span className="ms-3 text-muted small">
                        Subtotal: ₹{item.price * item.qty}
                      </span>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="mt-3 d-flex gap-2 flex-wrap">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeFromCart(item.productId)}
                      >
                        Remove
                      </button>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => {
                          addToWishlist(item);
                          removeFromCart(item.productId);
                        }}
                      >
                        Move to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: PRICE SUMMARY */}
        <div className="col-md-4">
          <div className="card shadow-sm border border-grey rounded-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Price Details</h5>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Items</span>
                <span className="fw-semibold">{totalItems}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Total Price</span>
                <span className="fw-semibold">₹{totalPrice}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold">Grand Total</span>
                <span className="fw-bold">₹{totalPrice}</span>
              </div>

              <Link to="/checkout" className="btn btn-success w-100">
                Checkout
              </Link>

              <Link
                to="/products"
                className="btn btn-outline-primary w-100 mt-2"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
