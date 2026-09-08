import { MAX_PICKS } from '../data/types'
import type { ShortlistEntry } from '../data/types'
import { RiskBadge } from '../components/RiskBadge'
import { ScreenHeader } from '../components/ScreenHeader'

interface ConfirmPicksScreenProps {
  gameWeekLabel: string
  picks: ShortlistEntry[]
  onBack: () => void
  onLockIn: () => void
}

export function ConfirmPicksScreen({ gameWeekLabel, picks, onBack, onLockIn }: ConfirmPicksScreenProps) {
  const picksRemaining = MAX_PICKS - picks.length
  const averageRisk = Math.round(
    picks.reduce((sum, entry) => sum + entry.risk.riskPercent, 0) / picks.length,
  )

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
      <ScreenHeader eyebrow={gameWeekLabel} title="Confirm your picks" subtitle="Last chance to change your mind." />

      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-sm text-slate-400">
          Your picks average <span className="font-semibold text-white">{averageRisk}%</span> risk
        </p>
      </div>

      {picksRemaining > 0 && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
          <p className="text-sm text-amber-300">
            You need {picksRemaining} more pick{picksRemaining === 1 ? '' : 's'} before you can lock in.
          </p>
        </div>
      )}

      <ul className="flex flex-col gap-2">
        {picks.map((entry) => (
          <li
            key={entry.player.id}
            className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/40 px-4 py-3"
          >
            <div>
              <p className="font-medium text-white">{entry.player.name}</p>
              <p className="text-xs text-slate-400">
                {entry.team.shortName} vs {entry.opponent.shortName}
              </p>
            </div>
            <RiskBadge riskPercent={entry.risk.riskPercent} />
          </li>
        ))}
      </ul>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-xl border border-slate-700 py-3 font-semibold text-slate-300 transition hover:border-slate-500"
        >
          Back to edit
        </button>
        <button
          type="button"
          disabled={picksRemaining > 0}
          onClick={onLockIn}
          className="flex-1 rounded-xl bg-amber-500 py-3 font-semibold text-slate-900 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none"
        >
          Lock In Picks
        </button>
      </div>
    </div>
  )
}
