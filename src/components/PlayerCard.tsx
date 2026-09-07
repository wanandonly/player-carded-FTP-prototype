import type { ShortlistEntry } from '../data/types'
import { FormChips } from './FormChips'
import { RiskBadge } from './RiskBadge'
import { StatBar } from './StatBar'

interface PlayerCardProps {
  entry: ShortlistEntry
  selected: boolean
  disabled: boolean
  onToggle: () => void
}

export function PlayerCard({ entry, selected, disabled, onToggle }: PlayerCardProps) {
  const { player, team, opponent, referee, stats, risk } = entry

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled && !selected}
      className={`flex w-full flex-col gap-3 rounded-xl border p-4 text-left transition ${
        selected
          ? 'border-fuchsia-400 bg-fuchsia-500/10 ring-1 ring-fuchsia-400/50'
          : 'border-slate-800 bg-slate-900/60 hover:border-slate-600'
      } ${disabled && !selected ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-white">{player.name}</p>
          <p className="text-xs text-slate-400">
            <span style={{ color: team.color }}>{team.shortName}</span> vs {opponent.shortName} ·{' '}
            {player.position}
          </p>
        </div>
        <RiskBadge riskPercent={risk.riskPercent} />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <StatBar
          label="Fouls / game"
          value={stats.foulsPerGame.toFixed(1)}
          fraction={stats.foulsPerGame / 3}
        />
        <StatBar
          label="Cards this season"
          value={`${stats.yellowCardsSeason}Y ${stats.redCardsSeason}R`}
          fraction={(stats.yellowCardsSeason + stats.redCardsSeason * 2) / 12}
        />
      </div>

      <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-xs text-slate-400">
        <div>
          <p>
            Ref: <span className="text-slate-200">{referee.name}</span>{' '}
            <span className="text-slate-500">({referee.avgCardsPerGame.toFixed(1)} cards/game avg)</span>
          </p>
        </div>
        <FormChips form={stats.last5Form} />
      </div>
    </button>
  )
}
