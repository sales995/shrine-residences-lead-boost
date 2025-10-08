import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

// Routes to pre-render for SEO (excluding /auth to avoid SSR issues with Supabase client)
const routesToPrerender = [
  '/',
  '/privacy-policy',
]

;(async () => {
  for (const url of routesToPrerender) {
    const { appHtml, headTags } = render(url);
    let html = template
      .replace(`<!--app-html-->`, appHtml)
      .replace(`<!--app-helmet-->`, headTags);

    // Create nested directory structure for proper routing
    const filePath = url === '/' 
      ? toAbsolute('dist/index.html')
      : toAbsolute(`dist${url}/index.html`);
    
    const fileDir = path.dirname(filePath);
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }

    fs.writeFileSync(filePath, html)
    console.log('pre-rendered:', filePath)
  }
})()
