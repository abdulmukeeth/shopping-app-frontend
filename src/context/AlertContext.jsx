import { createContext, useContext, useState } from "react";

const AlertContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useAlert = () => useContext(AlertContext);

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 2500);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
}
