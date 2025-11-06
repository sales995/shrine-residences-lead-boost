import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { UnitsProvider } from "@/contexts/UnitsContext";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <UnitsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UnitsProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);

// Render app (CSR only)
createRoot(rootElement).render(app);
