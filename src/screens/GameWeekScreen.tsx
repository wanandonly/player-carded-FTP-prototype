import { PICKS_PER_GAME_WEEK } from "../data/types";
import type { ShortlistEntry } from "../data/types";
import { PlayerCard } from "../components/PlayerCard";
import { RiskKey } from "../components/RiskKey";
import { ScreenHeader } from "../components/ScreenHeader";

interface GameWeekScreenProps {
  gameWeekLabel: string;
  shortlist: ShortlistEntry[];
  predictions: Record<string, boolean>;
  onSetPrediction: (playerId: string, willBeBooked: boolean | null) => void;
  onConfirm: () => void;
}

export function GameWeekScreen({
  gameWeekLabel,
  shortlist,
  predictions,
  onSetPrediction,
  onConfirm,
}: GameWeekScreenProps) {
  const answeredCount = shortlist.filter(
    (entry) => entry.player.id in predictions,
  ).length;
  const remaining = PICKS_PER_GAME_WEEK - answeredCount;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8">
      <ScreenHeader
        title={gameWeekLabel}
        subtitle="Predict whether each player will be booked this game week."
        right={
          <span className="rounded-full bg-slate-800 px-3 py-1 text-sm font-medium text-slate-200">
            {answeredCount} / {PICKS_PER_GAME_WEEK} predicted
          </span>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {shortlist.map((entry) => (
          <PlayerCard
            key={entry.player.id}
            entry={entry}
            prediction={
              entry.player.id in predictions
                ? predictions[entry.player.id]
                : null
            }
            onSetPrediction={(willBeBooked) =>
              onSetPrediction(entry.player.id, willBeBooked)
            }
          />
        ))}
        <RiskKey />
      </div>

      <div className="sticky bottom-4">
        <button
          type="button"
          disabled={remaining > 0}
          onClick={onConfirm}
          className="w-full rounded-xl bg-amber-500 py-3 font-semibold text-slate-900 shadow-lg shadow-amber-500/20 cursor-pointer transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none"
        >
          {remaining > 0
            ? `Predict ${remaining} more player${remaining === 1 ? "" : "s"}`
            : "Review Predictions"}
        </button>
      </div>
    </div>
  );
}
