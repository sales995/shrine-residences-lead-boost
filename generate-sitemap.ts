import fs from "fs";
import path from "path";
import { SitemapStream, streamToPromise } from "sitemap";
import { promisify } from "util";
import glob from "glob";

const globP = promisify(glob);
const SITE_URL = "https://shriramproperties-park63.in";

async function generate() {
  const pages = await globP("src/pages/**/*.tsx", { ignore: ["**/_*", "**/*.test.tsx"] });
  const smStream = new SitemapStream({ hostname: SITE_URL });

  for (const file of pages) {
    let route = file.replace(/^src\/pages/, "").replace(/index\.tsx$/, "").replace(/\.tsx$/, "");
    if (!route) route = "/";
    // compute lastmod from file mtime if possible
    let lastmod;
    try {
      const stats = fs.statSync(path.resolve(file));
      lastmod = stats.mtime.toISOString();
    } catch (e) {
      lastmod = new Date().toISOString();
    }
    smStream.write({
      url: route,
      changefreq: "weekly",
      priority: route === "/" ? 1.0 : 0.8,
      lastmod
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
