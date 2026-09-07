import type { ResolvedOutcome, ScoreResult, ShortlistEntry } from '../data/types'
import { RiskBadge } from '../components/RiskBadge'
import { ScreenHeader } from '../components/ScreenHeader'

interface ResultsScreenProps {
  gameWeekLabel: string
  picks: ShortlistEntry[]
  outcomesByPlayerId: Map<string, ResolvedOutcome>
  score: ScoreResult
  onPlayAgain: () => void
}

export function ResultsScreen({
  gameWeekLabel,
  picks,
  outcomesByPlayerId,
  score,
  onPlayAgain,
}: ResultsScreenProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
      <ScreenHeader eyebrow={gameWeekLabel} title="Results" subtitle="Here's how your picks landed." />

      <div className="rounded-xl border border-fuchsia-400/30 bg-fuchsia-500/10 p-6 text-center">
        <p className="text-sm text-slate-300">You got</p>
        <p className="text-4xl font-bold text-white">
          {score.correctPicks} / {score.totalPicks}
        </p>
        <p className="text-sm text-slate-300">correct</p>
      </div>

      <ul className="flex flex-col gap-2">
        {picks.map((entry) => {
          const outcome = outcomesByPlayerId.get(entry.player.id)
          const hit = outcome?.wasBooked ?? false

          return (
            <li
              key={entry.player.id}
              className={`flex items-center justify-between rounded-lg border px-4 py-3 ${
                hit ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-slate-800 bg-slate-900/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    hit ? 'bg-emerald-500 text-slate-900' : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {hit ? '✓' : '✕'}
                </span>
                <div>
                  <p className="font-medium text-white">{entry.player.name}</p>
                  <p className="text-xs text-slate-400">
                    {hit
                      ? `Booked (${outcome?.cardType === 'red' ? 'red card' : 'yellow card'})`
                      : 'Not booked'}
                  </p>
                </div>
              </div>
              <RiskBadge riskPercent={entry.risk.riskPercent} />
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        onClick={onPlayAgain}
        className="rounded-xl bg-fuchsia-500 py-3 font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:bg-fuchsia-400"
      >
        Play Again
      </button>
    </div>
  )
}
