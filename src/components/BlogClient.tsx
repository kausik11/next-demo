"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { BlogPost } from "@/types/blog";

interface BlogClientProps {
  posts: BlogPost[];
}

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

export default function BlogClient({ posts }: BlogClientProps) {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const query = searchParams.get("q")?.trim();
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  const categories = useMemo(() => {
    const unique = new Set(posts.map((post) => post.category.trim()));
    return ["All", ...Array.from(unique).sort()];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return posts.filter((post) => {
      const normalizedCategory = post.category.trim();
      const matchesCategory =
        activeCategory === "All" || normalizedCategory === activeCategory;
      if (!matchesCategory) {
        return false;
      }

      if (!query) {
        return true;
      }

      const searchable = `${post.title} ${post.description} ${post.content_text}`.toLowerCase();
      return searchable.includes(query);
    });
  }, [activeCategory, posts, searchTerm]);

  useEffect(() => {
    setVisibleCount(Math.min(6, filteredPosts.length));
  }, [filteredPosts]);

  useEffect(() => {
    if (visibleCount >= filteredPosts.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((current) =>
            Math.min(current + 6, filteredPosts.length)
          );
        }
      },
      { rootMargin: "200px" }
    );

    const target = loadMoreRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
    };
  }, [filteredPosts.length, visibleCount]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  const openModal = (post: BlogPost) => {
    lastFocusedElement.current = document.activeElement as HTMLElement;
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
    lastFocusedElement.current?.focus();
  };

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPost]);

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="latest" className="text-2xl font-semibold text-slate-900">
            Latest Articles
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Showing {filteredPosts.length} of {posts.length} articles.
          </p>
        </div>
        <label className="w-full md:w-80">
          <span className="sr-only">Search articles</span>
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by title, description, or content"
            className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          />
        </label>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
          Categories
        </p>
        <nav aria-label="Article categories" className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 ${
                  isActive
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900"
                }`}
                aria-pressed={isActive}
              >
                {category}
              </button>
            );
          })}
        </nav>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-12 text-center text-slate-600">
          <p className="text-lg font-semibold text-slate-900">No results found</p>
          <p className="mt-2 text-sm">
            Try a different search term or category.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {displayedPosts.map((post) => (
            <article
              id={`post-${post.id}`}
              key={post.id}
              onClick={() => openModal(post)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openModal(post);
                }
              }}
              role="button"
              tabIndex={0}
              className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
              aria-label={`Open article ${post.title}`}
            >
              <div className="relative h-44 w-full">
                <Image
                  src={post.photo_url}
                  alt={`Cover image for ${post.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex h-full flex-col gap-4 p-6">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <span>{post.category.trim()}</span>
                  <time dateTime={post.created_at}>
                    {formatDate(post.created_at)}
                  </time>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-slate-900 transition group-hover:text-slate-700">
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {post.description}
                  </p>
                </div>
                <span className="mt-auto text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Read full story
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {filteredPosts.length > 0 && visibleCount < filteredPosts.length ? (
        <div
          ref={loadMoreRef}
          className="flex items-center justify-center py-6 text-xs font-semibold uppercase tracking-[0.4em] text-slate-400"
          aria-live="polite"
        >
          Loading more articles...
        </div>
      ) : null}

      {selectedPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
          onClick={closeModal}
          role="presentation"
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-content"
          >
            <div className="relative h-56 w-full">
              <Image
                src={selectedPost.photo_url}
                alt={`Featured image for ${selectedPost.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
              <button
                ref={closeButtonRef}
                onClick={closeModal}
                className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-900 shadow-md transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
                aria-label="Close article"
                type="button"
              >
                X
              </button>
            </div>
            <div className="space-y-4 overflow-y-auto p-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  {selectedPost.category.trim()}
                </p>
                <h3
                  id="modal-title"
                  className="text-2xl font-semibold text-slate-900"
                >
                  {selectedPost.title}
                </h3>
                <time
                  dateTime={selectedPost.created_at}
                  className="text-sm text-slate-500"
                >
                  {formatDate(selectedPost.created_at)}
                </time>
              </div>
              <p className="text-sm leading-relaxed text-slate-700">
                {selectedPost.description}
              </p>
              <div className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">
                {selectedPost.content_text}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
