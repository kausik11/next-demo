import type { MetadataRoute } from "next";
import { buildUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: buildUrl("/"),
      lastModified: new Date(),
    },
  ];
}
