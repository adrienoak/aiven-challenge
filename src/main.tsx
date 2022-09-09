import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { makeQueryClient } from "./api/query";
import App, { GeoProvider } from "./App";

const appQueryClient = makeQueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={appQueryClient}>
        <GeoProvider>
          <App />
        </GeoProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
