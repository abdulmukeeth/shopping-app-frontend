import { createContext, useContext, useEffect, useState } from "react";
import { useAlert } from "./AlertContext";

const CartContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { showAlert } = useAlert();

    // FETCH CART ON LOAD
    useEffect(() => {
        const fetchCart = async () => {
      const res = await fetch(
          "https://shopping-app-backend-one.vercel.app/api/cart"
        );
        const data = await res.json();
        setCart(data.data.cart.items);
    };
      fetchCart();
    }, []);
  const addToCart = async (product) => {
    const res = await fetch(
      "https://shopping-app-backend-one.vercel.app/api/cart",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            productId: product._id,
            title: product.title,
            price: product.price,
            image: product.image,
            rating: product.rating
        }),
      }
    );

    const data = await res.json();
    setCart(data.data.cart.items);
    showAlert("Added to cart");
  };

  const removeFromCart = async (id) => {
    const res = await fetch(
      `https://shopping-app-backend-one.vercel.app/api/cart/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();
    setCart(data.data.cart.items);
    showAlert("Removed from cart", "danger");
  };

  const increaseQty = async (id) => {
    const res = await fetch(
      `https://shopping-app-backend-one.vercel.app/api/cart/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "increase" }),
      }
    );

    const data = await res.json();
    setCart(data.data.cart.items);
  };

  const decreaseQty = async (id) => {
    const res = await fetch(
      `https://shopping-app-backend-one.vercel.app/api/cart/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "decrease" }),
      }
    );

    const data = await res.json();
    setCart(data.data.cart.items);
  };

  const clearCart = async () => {
    await fetch("https://shopping-app-backend-one.vercel.app/api/cart", {
      method: "DELETE",
    });
    setCart([]);
  };

  const totalPrice = cart.reduce((a, c) => a + c.price * c.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
