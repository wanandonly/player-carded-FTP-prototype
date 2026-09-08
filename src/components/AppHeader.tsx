type Tab = "picks" | "leaderboard" | "results";

interface AppHeaderProps {
  activeTab: Tab;
  onNavigate: (tab: Tab) => void;
}

export function AppHeader({ activeTab, onNavigate }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-1.5 px-4 py-3">
        <p className="shrink-0 whitespace-nowrap text-base font-extrabold uppercase tracking-wide text-white sm:text-xl sm:tracking-wider">
          The Card <span className="text-amber-400">7</span>
        </p>

        <nav className="flex gap-0 rounded-full bg-slate-900 p-1">
          <button
            type="button"
            onClick={() => onNavigate("picks")}
            className={`rounded-full px-1.5 py-1.5 text-xs font-semibold cursor-pointer transition sm:px-3 sm:text-sm ${
              activeTab === "picks"
                ? "bg-amber-500 text-slate-900"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Picks
          </button>
          <button
            type="button"
            onClick={() => onNavigate("results")}
            className={`rounded-full px-1.5 py-1.5 text-xs font-semibold cursor-pointer transition sm:px-3 sm:text-sm ${
              activeTab === "results"
                ? "bg-amber-500 text-slate-900"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Results
          </button>
          <button
            type="button"
            onClick={() => onNavigate("leaderboard")}
            className={`rounded-full px-1.5 py-1.5 text-xs font-semibold cursor-pointer transition sm:px-3 sm:text-sm ${
              activeTab === "leaderboard"
                ? "bg-amber-500 text-slate-900"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Leaderboard
          </button>
        </nav>
      </div>
    </header>
  );
}
