export default function Footer() {
  return (
    <footer
      id="footer"
      className="border-t border-slate-200/60 bg-white/90"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-slate-900">Tech Insights Hub</p>
          <p>Fresh engineering notes, shipped weekly.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:hello@techinsightshub.com"
            className="transition hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            hello@techinsightshub.com
          </a>
          <span aria-hidden="true">|</span>
          <span>© 2026 Tech Insights Hub</span>
        </div>
      </div>
    </footer>
  );
}
