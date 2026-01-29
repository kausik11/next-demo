import Link from "next/link";

const navItems = [
  { label: "Home", href: "#top" },
  { label: "Latest", href: "#latest" },
  { label: "Categories", href: "#categories" },
  { label: "Contact", href: "#footer" },
];

export default function Header() {
  return (
    <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link
          className="text-lg font-semibold tracking-tight text-slate-900"
          href="#top"
        >
          Tech Insights Hub
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-600 transition hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="#latest"
          className="rounded-full border border-slate-200 bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
        >
          Browse Articles
        </Link>
      </div>
    </header>
  );
}
