// Minimal SSR entry to avoid server-side rendering issues during build
export function render(_url: string) {
  // Return empty strings so prerender writes the CSR template.
  // This prevents SSR from importing components that rely on browser-only APIs.
  return { appHtml: '', headTags: '' };
}

