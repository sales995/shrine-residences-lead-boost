import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

console.log("Main.tsx loading...");
console.log("Env check: VITE_SUPABASE_URL present?", Boolean(import.meta.env?.VITE_SUPABASE_URL));
console.log("Env check: VITE_SUPABASE_PUBLISHABLE_KEY present?", Boolean(import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY));

const rootElement = document.getElementById("root");
console.log("Root element:", rootElement);

if (rootElement) {
  (async () => {
    try {
      console.log("Creating React root...");
      const root = createRoot(rootElement);
      const hasUrl = Boolean(import.meta.env?.VITE_SUPABASE_URL);
      const hasKey = Boolean(import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY);

      if (!hasUrl || !hasKey) {
        console.error("Missing required envs:", { hasUrl, hasKey });
        root.render(
          <div style={{ padding: 24, fontFamily: 'system-ui' }}>
            <h1>Configuration error</h1>
            <p>Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY.</p>
          </div>
        );
        return;
      }

      const { default: App } = await import("./App.tsx");
      root.render(
        <HelmetProvider>
          <App />
        </HelmetProvider>
      );
      console.log("React app rendered successfully");
    } catch (error) {
      console.error("Error rendering app:", error);
    }
  })();
} else {
  console.error("Root element not found!");
}
