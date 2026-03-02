import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAddress } from "../context/AddressContext";
import { useOrder } from "../context/OrderContext";
import { useAlert } from "../context/AlertContext";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { addresses, selectedAddress, setSelectedAddress } = useAddress();
  const { placeOrder } = useOrder();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    placeOrder({
      items: cart,
      total: totalPrice,
      address: selectedAddress,
      placedAt: new Date().toLocaleString(),
    });
    clearCart();
    setOrderPlaced(true);
    showAlert("Order Placed Successfully", "success");
    setTimeout(() => {
      navigate("/profile");
    }, 2000);
  };

  return (
    <div className="container mt-4">
      <h3 className="fw-bold">Checkout</h3>

      {orderPlaced && (
        <div className="alert alert-success mt-3">
          <h5 className="mb-1">Order Placed Successfully</h5>
          <p className="mb-0">Go to Profile → Order History</p>
        </div>
      )}

      <div className="row g-4 mt-2">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm border-0 rounded-4">
            <h5 className="fw-bold mb-3">Select Delivery Address</h5>

            {addresses.length === 0 ? (
              <div className="text-center">
                <p className="text-muted mb-2">
                  No addresses found. Please add an address first.
                </p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate("/profile")}
                >
                  Go to Profile & Add Address
                </button>
              </div>
            ) : (
              addresses.map((a) => (
                <div
                  key={a._id}
                  className="border rounded p-2 mb-2 d-flex align-items-start gap-2"
                >
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddress?._id === a._id}
                    onChange={() => setSelectedAddress(a)}
                    className="mt-1"
                  />

                  <div>
                    <p className="fw-semibold mb-1">{a.name}</p>
                    <p className="mb-0 text-muted small">
                      {a.street}, {a.city}, {a.state} - {a.zip}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 shadow-sm border-0 rounded-4">
            <h5 className="fw-bold mb-3">Order Summary</h5>

            {cart.length === 0 ? (
              <p className="text-muted">Cart is empty</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item._id}
                  className="d-flex justify-content-between border-bottom py-2"
                >
                  <span>
                    {item.title} × {item.qty}
                  </span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))
            )}

            <div className="d-flex justify-content-between mt-3">
              <span className="fw-bold">Total</span>
              <span className="fw-bold">₹{totalPrice}</span>
            </div>

            <button
              className="btn btn-success w-100 mt-3"
              disabled={!selectedAddress || cart.length === 0 || orderPlaced}
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
