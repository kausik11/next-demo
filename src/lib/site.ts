export const siteConfig = {
  name: "Tech Insights Hub",
  description:
    "A fast, SEO-focused tech blog featuring practical engineering notes, product breakdowns, and industry analysis.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og-tech-blog.svg",
};

export const siteUrl = siteConfig.url.replace(/\/+$/, "");

export const buildUrl = (path = "") => {
  if (!path) {
    return siteUrl;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${siteUrl}${path.startsWith("/") ? "" : "/"}${path}`;
};
