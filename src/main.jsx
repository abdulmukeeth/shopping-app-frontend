import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { AlertProvider } from "./context/AlertContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { FilterProvider } from "./context/FilterContext";
import { SearchProvider } from "./context/SearchContext";
import { AddressProvider } from "./context/AddressContext";
import { OrderProvider } from "./context/OrderContext";
import "bootstrap/dist/css/bootstrap.min.css";

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
    <AlertProvider>
      <SearchProvider>
        <WishlistProvider>
          <CartProvider>
            <FilterProvider>
              <AddressProvider>
                <OrderProvider>
                  <App />
                </OrderProvider>
              </AddressProvider>
            </FilterProvider>
          </CartProvider>
        </WishlistProvider>
      </SearchProvider>
    </AlertProvider>
  </BrowserRouter>
  </StrictMode>
)
