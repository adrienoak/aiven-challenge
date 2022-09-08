import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { makeQueryClient } from "./api/query";
import App from "./App";
import "./index.css";

const appQueryClient = makeQueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={appQueryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
