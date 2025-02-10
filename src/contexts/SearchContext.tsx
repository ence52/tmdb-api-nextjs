"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type SearchState = {
  searchText: string;
  updateSearchText: (text: string) => void;
};
const SearchContext = createContext<SearchState | null>(null);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchText, setSearchText] = useState("");

  const updateSearchText = (text: string) => {
    setSearchText(text);
  };
  return (
    <SearchContext.Provider value={{ searchText, updateSearchText }}>
      {children}
    </SearchContext.Provider>
  );
};
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
