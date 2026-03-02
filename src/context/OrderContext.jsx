import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useOrder = () => useContext(OrderContext);

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://shopping-app-backend-one.vercel.app/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data.data.orders));
  }, []);

  const placeOrder = async (orderData) => {
    const res = await fetch(
      "https://shopping-app-backend-one.vercel.app/api/orders",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      }
    );

    const savedOrder = await res.json();
    setOrders((prev) => [...prev, savedOrder.data.order]);
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
