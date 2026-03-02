import { createContext, useContext, useState } from "react";

const SearchContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = () => useContext(SearchContext);

export function SearchProvider({ children }) {
  const [searchText, setSearchText] = useState("");

  return (
    <SearchContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </SearchContext.Provider>
  );
}
