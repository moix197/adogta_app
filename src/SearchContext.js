import React from "react";

const SearchContext = React.createContext({
  breedsAry: [],
  sheltersAry: [],
  petsAry: [],
  filterItems: null,
  filterBySize: null
});

export const Provider = SearchContext.Provider;
export const Consumer = SearchContext.Consumer;
