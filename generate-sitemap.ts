import fs from "fs";
import path from "path";
import { SitemapStream, streamToPromise } from "sitemap";
import { promisify } from "util";
import glob from "glob";

const globP = promisify(glob);
const SITE_URL = "https://www.shriramproperties-park63.in";

async function generate() {
  // Explicit routes to include in sitemap
  const routes = ['/', '/privacy-policy'];
  const smStream = new SitemapStream({ hostname: SITE_URL });

  for (const route of routes) {
    smStream.write({
      url: route,
      changefreq: "weekly",
      priority: route === "/" ? 1.0 : 0.8,
      lastmod: new Date().toISOString()
    });
  }

  smStream.end();
  const data = await streamToPromise(smStream);
  fs.writeFileSync(path.resolve(__dirname, "public", "sitemap.xml"), data.toString());
  console.log("✅ sitemap.xml generated at /public/sitemap.xml");
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
