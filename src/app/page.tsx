import type { Metadata } from "next";
import Image from "next/image";
import BlogClient from "@/components/BlogClient";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { fetchBlogPosts } from "@/lib/api";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tech Insights Blogs Hub | Modern Engineering Notes",
  description:
    "A fast, SEO-optimized tech blog featuring engineering insights, product deep dives, and practical guides.",
  openGraph: {
    title: "Tech Insights Blogs Hub | Modern Engineering Notes",
    description:
      "A fast, SEO-optimized tech blog featuring engineering insights, product deep dives, and practical guides.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Tech Insights Hub cover image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Insights Hub | Modern Engineering Notes",
    description:
      "A fast, SEO-optimized tech blog featuring engineering insights, product deep dives, and practical guides.",
    images: [siteConfig.ogImage],
  },
};

export default async function HomePage() {
  const { posts, error } = await fetchBlogPosts();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const articlesSchema = posts.map((post) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    content: post.content_text,
    image: post.photo_url,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    mainEntityOfPage: `${siteConfig.url}/#post-${post.id}`,
  }));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-12">
        <section className="grid gap-8 rounded-[32px] border border-slate-200 bg-gradient-to-br from-white via-white to-slate-100 p-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
              Tech Blog
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
              Ideas, Guides, and Practical Insights
            </h1>
            <p className="text-base leading-relaxed text-slate-600">
              Explore practical insights on architecture, performance, and design.
              Search and filter across the latest posts to find exactly what you
              need.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                10 curated posts
              </div>
              <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Updated daily
              </div>
              <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Performance tuned
              </div>
            </div>
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-3xl">  
            <Image
              src="/Hero.png"
              alt="Illustrated workspace with laptop and analytics panels"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              priority
            />
          </div>
        </section>

        {error ? (
          <section className="rounded-3xl border border-dashed border-red-200 bg-red-50/40 p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              Unable to load articles
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {error} Please refresh the page to try again.
            </p>
          </section>
        ) : (
          <BlogClient posts={posts} />
        )}
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([websiteSchema, ...articlesSchema]),
        }}
      />
    </div>
  );
}
