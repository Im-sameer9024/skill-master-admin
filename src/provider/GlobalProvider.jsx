import AppContextProvider from "@/context/AppContextProvider";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./tanstackQuery";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";

const GlobalProvider = ({ children }) => {
  const isDevelopment = import.meta.env.VITE_NODE_ENV == "development";

  console.log(
    "Development mode : ",
    import.meta.env.VITE_NODE_ENV,
    isDevelopment
  );

  return (
    <AppContextProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-right" />
          {children}
          {isDevelopment && <ReactQueryDevtools />}
        </QueryClientProvider>
      </BrowserRouter>
    </AppContextProvider>
  );
};

export default GlobalProvider;
