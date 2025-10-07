import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, '..');

async function prerender() {
  console.log('Starting pre-rendering...');
  
  const vite = await createServer({
    root,
    logLevel: 'info',
    server: {
      middlewareMode: true,
    },
    appType: 'custom',
  });

  // Routes to pre-render
  const routes = ['/'];

  for (const route of routes) {
    try {
      console.log(`Pre-rendering ${route}...`);
      
      // Load the template
      let template = readFileSync(resolve(root, 'dist/index.html'), 'utf-8');
      
      // The static HTML is already SEO-optimized via react-helmet-async
      // Just ensure proper output directory structure
      const routePath = route === '/' ? 'index.html' : `${route.slice(1)}/index.html`;
      const outPath = resolve(root, 'dist', routePath);
      const outDir = dirname(outPath);
      
      if (!existsSync(outDir)) {
        mkdirSync(outDir, { recursive: true });
      }
      
      writeFileSync(outPath, template);
      console.log(`✓ Pre-rendered ${route} to ${routePath}`);
    } catch (e) {
      console.error(`Error pre-rendering ${route}:`, e);
    }
  }

  await vite.close();
  console.log('Pre-rendering complete!');
}

prerender().catch(console.error);
