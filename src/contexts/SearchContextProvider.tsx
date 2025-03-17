"use client";

import React, { useState } from "react";

type TSearchContextProps = {
  children: React.ReactNode,
};

type TSearchContext = {
  searchQuery: string,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

export const SearchContext = React.createContext<TSearchContext | null>(null);


export default function SearchContextProvider({ children }: TSearchContextProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }
  return (
    <SearchContext.Provider value={{searchQuery, handleChange
    }}>{children}</SearchContext.Provider>
  )
}
