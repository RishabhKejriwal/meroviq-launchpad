import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

const PATHS = [
  "/", "/meroviq-360", "/services", "/services/development", "/services/marketing",
  "/launchpad", "/impact", "/tools",
  "/tools/digital-signature", "/tools/grammar-corrector", "/tools/file-converter", "/tools/qa-estimator",
  "/resources", "/resources/it-professionals-faq", "/resources/salesforce-career-faq", "/resources/qa-tester-faq",
  "/contact", "/privacy",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = PATHS.map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
