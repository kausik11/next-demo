# Tech Insights Hub

A fast, SEO-optimized tech blog built with Next.js App Router, TypeScript, and Tailwind CSS. It fetches 10 posts from the Sling Academy sample API and provides combined search + category filtering with an accessible article modal.

## Live Links

- GitHub repo: <add your public repo URL>
- Vercel deployment: <add your live Vercel URL>

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4

## Getting Started

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
npm run start
```

## Environment Variables

Set the base URL for sitemap and metadata:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Lighthouse Audits

Add screenshots to `screenshots/` and update the paths below.

- Performance: `screenshots/lighthouse-performance.png`
- Accessibility: `screenshots/lighthouse-accessibility.png`
- Best Practices: `screenshots/lighthouse-best-practices.png`
- SEO: `screenshots/lighthouse-seo.png`

## SEO Strategy

- Meta tags: Implemented title + description on the layout and page, plus Open Graph and Twitter Card tags for shareability.
- Semantic HTML: Structured with `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`, and `<time>` while keeping a single H1 on the page.
- Image optimization: All images use Next.js `Image` with explicit sizes, descriptive alt text, and lazy loading (default behavior).
- Performance optimizations: Server-side data fetching with revalidation, lean Tailwind classes, responsive images, and a minimal JS client component.
- Structured data: JSON-LD for WebSite and Article entities is rendered on the homepage.
- Technical SEO: `robots.txt` and `sitemap.xml` generated via App Router metadata routes.

## Search and Filter Implementation

- Search queries are matched against `title`, `description`, and `content_text` using a normalized lower-case compare.
- Category filtering uses all unique categories from the fetched posts, plus an `All` option.
- The combined filter runs in a memoized selector to keep client-side interactions fast.

## Accessibility & UX

- Keyboard navigation: cards are focusable and open on Enter; ESC closes the modal; focus returns to the last active element.
- Modal semantics: `role="dialog"`, `aria-modal`, and labeled title/description.
- Color contrast meets WCAG AA on primary text elements.

## Challenges / Notes

- The API returns external image URLs, so `next.config.ts` allows the Sling Academy host via `remotePatterns`.
- If the API is unavailable, a friendly error state is shown on the homepage.

## Project Decisions

- The UI is built with Tailwind CSS for fast iteration and consistent spacing.
- Server components fetch data, while a focused client component handles search, filter, and modal behavior.

## Assumptions

- Search is client-side only, so the `SearchAction` schema points to a query string even though it is not currently parsed.

