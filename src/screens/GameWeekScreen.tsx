import { MAX_PICKS } from '../data/types'
import type { ShortlistEntry } from '../data/types'
import { PlayerCard } from '../components/PlayerCard'
import { ScreenHeader } from '../components/ScreenHeader'

interface GameWeekScreenProps {
  gameWeekLabel: string
  shortlist: ShortlistEntry[]
  selectedPlayerIds: string[]
  onTogglePlayer: (playerId: string) => void
  onConfirm: () => void
}

export function GameWeekScreen({
  gameWeekLabel,
  shortlist,
  selectedPlayerIds,
  onTogglePlayer,
  onConfirm,
}: GameWeekScreenProps) {
  const picksRemaining = MAX_PICKS - selectedPlayerIds.length

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8">
      <ScreenHeader
        eyebrow="Player Card Betting"
        title={gameWeekLabel}
        subtitle="Pick the players you think will be booked this game week."
        right={
          <span className="rounded-full bg-slate-800 px-3 py-1 text-sm font-medium text-slate-200">
            {selectedPlayerIds.length} / {MAX_PICKS} picked
          </span>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {shortlist.map((entry) => (
          <PlayerCard
            key={entry.player.id}
            entry={entry}
            selected={selectedPlayerIds.includes(entry.player.id)}
            disabled={picksRemaining === 0}
            onToggle={() => onTogglePlayer(entry.player.id)}
          />
        ))}
      </div>

      <div className="sticky bottom-4">
        <button
          type="button"
          disabled={selectedPlayerIds.length === 0}
          onClick={onConfirm}
          className="w-full rounded-xl bg-fuchsia-500 py-3 font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none"
        >
          Review Picks ({selectedPlayerIds.length})
        </button>
      </div>
    </div>
  )
}
