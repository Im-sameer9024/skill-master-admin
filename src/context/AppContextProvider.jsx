import React, { useState } from "react";
import  AppContext  from "./AppContext";

const AppContextProvider = ({ children }) => {
  const [state, setState] = useState(false);

  return (
    <AppContext.Provider value={{ state, setState,name }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
