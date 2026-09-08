import type { HistoryEntry, ShortlistEntry } from '../data/types'
import { RiskBadge } from '../components/RiskBadge'
import { ScreenHeader } from '../components/ScreenHeader'

interface ResultsScreenProps {
  gameWeekLabel: string
  shortlist: ShortlistEntry[]
  current: HistoryEntry | null
  pastEntries: HistoryEntry[]
  onGoToPicks: () => void
}

function PastResultsList({ pastEntries }: { pastEntries: HistoryEntry[] }) {
  if (pastEntries.length === 0) return null

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold text-amber-400">Past results</p>
      <ul className="flex flex-col gap-2">
        {pastEntries.map((entry) => {
          const entryIsJackpot = entry.score.correctPredictions === entry.score.totalPredictions

          return (
            <li
              key={entry.id}
              className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/40 px-4 py-3"
            >
              <div>
                <p className="text-sm text-slate-300">{new Date(entry.playedAt).toLocaleDateString()}</p>
                {entryIsJackpot && <p className="text-xs font-semibold text-amber-400">Jackpot!</p>}
              </div>
              <p className="text-lg font-bold text-white">
                {entry.score.correctPredictions}/{entry.score.totalPredictions}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function ResultsScreen({ gameWeekLabel, shortlist, current, pastEntries, onGoToPicks }: ResultsScreenProps) {
  if (current === null) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
        <ScreenHeader eyebrow={gameWeekLabel} title="Results" subtitle="No results yet." />

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-center">
          <p className="text-sm text-slate-300">
            Make your predictions — your results will appear here once the game week has finished.
          </p>
        </div>

        <button
          type="button"
          onClick={onGoToPicks}
          className="rounded-xl bg-amber-500 py-3 font-semibold text-slate-900 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
        >
          Make Your Picks
        </button>

        <PastResultsList pastEntries={pastEntries} />
      </div>
    )
  }

  const { score } = current
  const isJackpot = score.correctPredictions === score.totalPredictions
  const outcomesByPlayerId = new Map(current.outcomes.map((o) => [o.playerId, o]))
  const predictionsByPlayerId = new Map(current.predictions.map((p) => [p.playerId, p.willBeBooked]))

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
      <ScreenHeader eyebrow={gameWeekLabel} title="Results" subtitle="Here's how your predictions landed." />

      <div
        className={`rounded-xl border p-6 text-center ${
          isJackpot
            ? 'border-amber-400 bg-amber-500/20 ring-2 ring-amber-400/60'
            : 'border-amber-400/30 bg-amber-500/10'
        }`}
      >
        {isJackpot && (
          <p className="text-sm font-bold uppercase tracking-wider text-amber-300">Jackpot!</p>
        )}
        <p className="text-sm text-slate-300">You got</p>
        <p className="text-4xl font-bold text-white">
          {score.correctPredictions} / {score.totalPredictions}
        </p>
        <p className="text-sm text-slate-300">correct</p>
        {isJackpot && (
          <p className="mt-2 text-sm font-semibold text-amber-300">
            Perfect week — you've won the jackpot prize!
          </p>
        )}
      </div>

      <ul className="flex flex-col gap-2">
        {shortlist.map((entry) => {
          const outcome = outcomesByPlayerId.get(entry.player.id)
          const prediction = predictionsByPlayerId.get(entry.player.id)
          const hit = outcome !== undefined && prediction !== undefined && prediction === outcome.wasBooked

          const outcomeText = outcome?.wasBooked
            ? `booked (${outcome.cardType === 'red' ? 'red card' : 'yellow card'})`
            : 'not booked'

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
                <div className="min-w-0">
                  <p className="font-medium text-white">{entry.player.name}</p>
                  <p className="text-xs text-slate-400">
                    You predicted {prediction ? 'booked' : 'not booked'} — {outcomeText}
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
        onClick={onGoToPicks}
        className="rounded-xl bg-amber-500 py-3 font-semibold text-slate-900 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
      >
        Play Again
      </button>

      <PastResultsList pastEntries={pastEntries} />
    </div>
  )
}
