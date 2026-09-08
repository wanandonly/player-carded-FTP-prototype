import { leaderboard } from '../data/leaderboard.mock'
import { ScreenHeader } from '../components/ScreenHeader'

interface LeaderboardScreenProps {
  gameWeekLabel: string
  you: { correctPredictions: number; totalPredictions: number } | null
}

interface Row {
  id: string
  name: string
  correctPredictions: number
  totalPredictions: number
  isYou: boolean
}

export function LeaderboardScreen({ gameWeekLabel, you }: LeaderboardScreenProps) {
  const rows: Row[] = [
    ...leaderboard.map((entry) => ({ ...entry, isYou: false })),
    {
      id: 'you',
      name: 'You',
      correctPredictions: you?.correctPredictions ?? 0,
      totalPredictions: you?.totalPredictions ?? 0,
      isYou: true,
    },
  ].sort((a, b) => b.correctPredictions - a.correctPredictions)

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
      <ScreenHeader eyebrow={gameWeekLabel} title="Leaderboard" subtitle="Ranked by correct predictions this game week." />

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
              <p className={`font-medium ${row.isYou ? 'text-amber-300' : 'text-white'}`}>{row.name}</p>
            </div>
            <p className="text-lg font-bold text-white">
              {you === null && row.isYou ? 'Play this game week to join' : `${row.correctPredictions}/${row.totalPredictions}`}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
