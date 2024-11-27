import React, { createContext, useState } from "react";

export const SavedBooksContext = createContext();

export const SavedBooksProvider = ({ children }) => {
  const [savedBooks, setSavedBooks] = useState([]);

  const addBook = (book) => {
    setSavedBooks((prevBooks) => [...prevBooks, book]);
  };

  return (
    <SavedBooksContext.Provider value={{ savedBooks, addBook }}>
      {children}
    </SavedBooksContext.Provider>
  );
};
