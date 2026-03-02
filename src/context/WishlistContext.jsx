import { createContext, useContext, useEffect, useState } from "react";
import { useAlert } from "./AlertContext";

const WishlistContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => useContext(WishlistContext);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const { showAlert } = useAlert();

    // FETCH WISHLIST ON LOAD
  useEffect(() => {
     const fetchWishlist = async () => {
    const res = await fetch(
      "https://shopping-app-backend-one.vercel.app/api/wishlist"
    );
    const data = await res.json();
    setWishlist(data.data.wishlist.items);
  };
    fetchWishlist();
  }, []);

  const addToWishlist = async (product) => {
    const res = await fetch(
      "https://shopping-app-backend-one.vercel.app/api/wishlist",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          title: product.title,
          price: product.price,
          image: product.image,
        }),
      }
    );

    const data = await res.json();
    setWishlist(data.data.wishlist.items);
    showAlert("Added to wishlist");
  };

  const removeFromWishlist = async (id) => {
    const res = await fetch(
      `https://shopping-app-backend-one.vercel.app/api/wishlist/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();
    setWishlist(data.data.wishlist.items);
    showAlert("Removed from wishlist", "danger");
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
