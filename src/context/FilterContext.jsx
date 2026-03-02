import { createContext, useContext, useState } from "react";

const FilterContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useFilter = () => useContext(FilterContext);

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    category: [],
    rating: 0,
    sortBy: null,
  });

  // Reseting all filters
  const clearFilters = () => {
    setFilters({
      category: [],
      rating: 0,
      sortBy: null,
    });
  };

  const setCategoryFilter = (categoryName) => {
    setFilters((prev) => ({
      ...prev,
      category: [categoryName],
    }));
  };

  return (
    <FilterContext.Provider
      value={{ filters, setFilters, clearFilters, setCategoryFilter }}
    >
      {children}
    </FilterContext.Provider>
  );
}
