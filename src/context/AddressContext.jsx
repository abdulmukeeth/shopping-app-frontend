import { createContext, useContext, useEffect, useState } from "react";

const AddressContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useAddress = () => useContext(AddressContext);

export function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    fetch("https://shopping-app-backend-one.vercel.app/api/addresses")
      .then((res) => res.json())
      .then((data) => setAddresses(data.data.addresses));
  }, []);

  const addAddress = async (address) => {
    const res = await fetch(
      "https://shopping-app-backend-one.vercel.app/api/addresses",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(address),
      }
    );

    const data = await res.json();
    setAddresses((prev) => [...prev, data.data.address]);
  };

  const deleteAddress = async (id) => {
    await fetch(
      `https://shopping-app-backend-one.vercel.app/api/addresses/${id}`,
      {
        method: "DELETE",
      }
    );

    setAddresses((prev) => prev.filter((a) => a._id !== id));
  };

  const updateAddress = async (id, updatedData) => {
    const res = await fetch(
      `https://shopping-app-backend-one.vercel.app/api/addresses/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      }
    );

    const data = await res.json();

    setAddresses((prev) =>
      prev.map((a) => (a._id === id ? data.data.address : a))
    );
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        selectedAddress,
        setSelectedAddress,
        addAddress,
        deleteAddress,
        updateAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}
