import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        // Ensure a single React instance to avoid "dispatcher is null" hook errors
        react: path.resolve(__dirname, "./node_modules/react"),
        "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
        "react/jsx-runtime": path.resolve(__dirname, "./node_modules/react/jsx-runtime.js"),
      },
      dedupe: ["react", "react-dom", "react/jsx-runtime"],
    },
    build: {
      target: 'es2015',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // manualChunks removed to avoid build issues
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react/jsx-runtime', 'react-router-dom'],
      force: true,
    },
    // Removed Supabase env var injection; Lovable Cloud backend only
  };
});
