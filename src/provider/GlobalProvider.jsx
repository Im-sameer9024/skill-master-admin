import React from "react";
import { BrowserRouter } from "react-router-dom";

const GlobalProvider = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default GlobalProvider;
