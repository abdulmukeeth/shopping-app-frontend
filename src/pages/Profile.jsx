import { useState } from "react";
import { useAddress } from "../context/AddressContext";
import { useOrder } from "../context/OrderContext";
import { useAlert } from "../context/AlertContext";

export default function Profile() {
  const { addresses, addAddress, deleteAddress, updateAddress } = useAddress();
  const { orders } = useOrder();
  const { showAlert } = useAlert();

  const [form, setForm] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      updateAddress(editingId, form);
      showAlert("Address updated", "success");
      setEditingId(null);
    } else {
      addAddress(form);
      showAlert("Address added", "success");
    }

    setForm({ name: "", street: "", city: "", state: "", zip: "" });
  };

  const handleEdit = (addr) => {
    setEditingId(addr._id);
    setForm({
      name: addr.name,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
    });
  };

  return (
    <div className="container mt-4">
      <h3 className="fw-bold">User Profile</h3>

      <div className="card p-3 shadow-sm border-0 rounded-4 mb-4">
        <h5 className="fw-bold mb-2">Profile Details</h5>
        <p className="mb-1">
          <strong>Name:</strong> Abdul Mukeeth
        </p>
        <p className="mb-1">
          <strong>Email:</strong> abdul@email.com
        </p>
        <p className="mb-0">
          <strong>Phone:</strong> 9873456574
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm border-0 rounded-4">
            <h5 className="fw-bold mb-3">
              {editingId ? "Update Address" : "Add New Address"}
            </h5>

            <form onSubmit={handleSubmit}>
              <input
                className="form-control mb-2"
                placeholder="Name"
                value={form.name}
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="form-control mb-2"
                placeholder="Street"
                value={form.street}
                required
                onChange={(e) => setForm({ ...form, street: e.target.value })}
              />
              <input
                className="form-control mb-2"
                placeholder="City"
                value={form.city}
                required
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
              <input
                className="form-control mb-2"
                placeholder="State"
                value={form.state}
                required
                onChange={(e) => setForm({ ...form, state: e.target.value })}
              />
              <input
                className="form-control mb-2"
                placeholder="Zip Code"
                value={form.zip}
                required
                onChange={(e) => setForm({ ...form, zip: e.target.value })}
              />

              <button className="btn btn-primary w-100">
                {editingId ? "Update Address" : "Add Address"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 mt-2"
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      name: "",
                      street: "",
                      city: "",
                      state: "",
                      zip: "",
                    });
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </form>
          </div>
          <div className="card p-3 shadow-sm border-0 rounded-4 mt-4">
            <h5 className="fw-bold mb-3">Saved Addresses</h5>

            {addresses.length === 0 ? (
              <p className="text-muted">No saved addresses</p>
            ) : (
              addresses.map((a) => (
                <div
                  key={a._id}
                  className="border rounded p-2 mb-2 d-flex justify-content-between align-items-start"
                >
                  <div>
                    <p className="fw-semibold mb-1">{a.name}</p>
                    <p className="text-muted small mb-0">
                      {a.street}, {a.city}, {a.state} - {a.zip}
                    </p>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleEdit(a)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        deleteAddress(a._id);
                        showAlert("Address deleted", "danger");
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 shadow-sm border-0 rounded-4">
            <h5 className="fw-bold mb-3">Order History</h5>

            {orders.length === 0 ? (
              <p className="text-muted">No orders placed yet</p>
            ) : (
              orders.map((o) => (
                <div key={o._id} className="border rounded p-2 mb-2">
                  <p className="fw-semibold mb-1">Total: ₹{o.total}</p>
                  <p className="text-muted small mb-1">
                    Items: {o.items.length}
                  </p>
                  <p className="text-muted small mb-0">
                    Placed At: {o.placedAt}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
