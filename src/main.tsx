import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("Main.tsx loading...");
console.log("Env check: VITE_SUPABASE_URL present?", Boolean(import.meta.env?.VITE_SUPABASE_URL));
console.log("Env check: VITE_SUPABASE_PUBLISHABLE_KEY present?", Boolean(import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY));

const rootElement = document.getElementById("root");
console.log("Root element:", rootElement);

if (rootElement) {
  try {
    console.log("Creating React root...");
    createRoot(rootElement).render(<App />);
    console.log("React app rendered successfully");
  } catch (error) {
    console.error("Error rendering app:", error);
  }
} else {
  console.error("Root element not found!");
}
