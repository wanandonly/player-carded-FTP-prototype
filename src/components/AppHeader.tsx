interface AppHeaderProps {
  activeTab: 'picks' | 'leaderboard'
  onNavigate: (tab: 'picks' | 'leaderboard') => void
}

export function AppHeader({ activeTab, onNavigate }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3">
        <p className="text-xl font-extrabold uppercase tracking-wider text-white">
          The Card <span className="text-amber-400">7</span>
        </p>

        <nav className="flex gap-1 rounded-full bg-slate-900 p-1">
          <button
            type="button"
            onClick={() => onNavigate('picks')}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
              activeTab === 'picks' ? 'bg-amber-500 text-slate-900' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Picks
          </button>
          <button
            type="button"
            onClick={() => onNavigate('leaderboard')}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
              activeTab === 'leaderboard' ? 'bg-amber-500 text-slate-900' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Leaderboard
          </button>
        </nav>
      </div>
    </header>
  )
}
