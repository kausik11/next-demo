import type { MetadataRoute } from "next";
import { buildUrl, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: buildUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
