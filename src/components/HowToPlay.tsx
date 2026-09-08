import { PICKS_PER_GAME_WEEK } from '../data/types'

const RULES = [
  `Each game week features ${PICKS_PER_GAME_WEEK} players who could pick up a card.`,
  "Predict “Will be booked” or “Won’t be booked” for every player.",
  `Once all ${PICKS_PER_GAME_WEEK} are predicted, review and lock in — no changes after that.`,
  `Your score is how many of the ${PICKS_PER_GAME_WEEK} you got right, shown as X / ${PICKS_PER_GAME_WEEK}.`,
]

export function HowToPlay() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-sm font-semibold text-amber-400">How to Play</p>
        <ul className="mt-2 flex flex-col gap-1.5 text-sm text-slate-300">
          {RULES.map((rule) => (
            <li key={rule} className="flex gap-2">
              <span className="text-amber-400">•</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
