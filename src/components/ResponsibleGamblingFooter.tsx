export function ResponsibleGamblingFooter() {
  return (
    <footer className="mt-10 border-t border-slate-800">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 px-4 py-6 text-center">
        <span className="rounded border border-slate-700 px-1.5 py-0.5 text-xs font-bold text-slate-400">
          18+
        </span>
        <p className="max-w-md text-xs text-slate-500">
          Betting content on this page is illustrative only and does not place real bets. When
          real, this game would only be available to players aged 18+. If gambling stops being
          fun, help is available at{" "}
          <a
            href="https://www.begambleaware.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 underline decoration-slate-600 hover:text-slate-300"
          >
            begambleaware.org
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
