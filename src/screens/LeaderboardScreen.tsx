import { POINTS_PER_CORRECT_PICK } from '../data/types'
import { leaderboard } from '../data/leaderboard.mock'
import { ScreenHeader } from '../components/ScreenHeader'

interface LeaderboardScreenProps {
  gameWeekLabel: string
  you: { correctPicks: number; totalPicks: number } | null
}

interface Row {
  id: string
  name: string
  correctPicks: number
  totalPicks: number
  points: number
  isYou: boolean
}

export function LeaderboardScreen({ gameWeekLabel, you }: LeaderboardScreenProps) {
  const rows: Row[] = [
    ...leaderboard.map((entry) => ({
      ...entry,
      points: entry.correctPicks * POINTS_PER_CORRECT_PICK,
      isYou: false,
    })),
    {
      id: 'you',
      name: 'You',
      correctPicks: you?.correctPicks ?? 0,
      totalPicks: you?.totalPicks ?? 0,
      points: (you?.correctPicks ?? 0) * POINTS_PER_CORRECT_PICK,
      isYou: true,
    },
  ].sort((a, b) => b.points - a.points)

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
      <ScreenHeader
        eyebrow={gameWeekLabel}
        title="Leaderboard"
        subtitle={`${POINTS_PER_CORRECT_PICK} points per player carded correctly.`}
      />

      <ul className="flex flex-col gap-2">
        {rows.map((row, index) => (
          <li
            key={row.id}
            className={`flex items-center justify-between rounded-lg border px-4 py-3 ${
              row.isYou
                ? 'border-amber-400 bg-amber-500/10 ring-1 ring-amber-400/50'
                : 'border-slate-800 bg-slate-900/40'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-300">
                {index + 1}
              </span>
              <div>
                <p className={`font-medium ${row.isYou ? 'text-amber-300' : 'text-white'}`}>{row.name}</p>
                <p className="text-xs text-slate-400">
                  {you === null && row.isYou
                    ? 'Play this game week to join'
                    : `${row.correctPicks} / ${row.totalPicks} correct`}
                </p>
              </div>
            </div>
            <p className="text-lg font-bold text-white">{row.points} pts</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
