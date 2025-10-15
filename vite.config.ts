import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const devMockApi: Plugin = {
    name: 'dev-mock-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/submit-lead', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }
        let body = '';
        req.on('data', (chunk) => { body += chunk; });
        req.on('end', () => {
          let parsed: any = {};
          try { parsed = JSON.parse(body || '{}'); } catch {}
          const now = new Date().toISOString();
          // Simulate LOVABLE DB insert by validating payload shape
          const payload = {
            name: String(parsed?.name || '').trim(),
            phone: String(parsed?.phone || '').trim(),
            email: parsed?.email ? String(parsed.email).trim() : null,
            source: String(parsed?.source || 'contact-form'),
            created_at: now,
          };
          if (!payload.name || !payload.phone) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Invalid payload' }));
            return;
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true }));
        });
      });
    },
  };

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
      mode === 'development' && devMockApi,
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
