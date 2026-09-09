import { PICKS_PER_GAME_WEEK } from "../data/types";
import type { ShortlistEntry } from "../data/types";
import { PlayerCard } from "../components/PlayerCard";
import { ScreenHeader } from "../components/ScreenHeader";
import { SponsorAdPlaceholder } from "../components/SponsorAdPlaceholder";
import { SuggestedAccumulator } from "../components/SuggestedAccumulator";

interface GameWeekScreenProps {
  gameWeekLabel: string;
  shortlist: ShortlistEntry[];
  predictions: Record<string, boolean>;
  onSetPrediction: (playerId: string, willBeBooked: boolean | null) => void;
  tiebreakerGuessMinute: number | null;
  onSetTiebreakerGuessMinute: (minute: number | null) => void;
  onConfirm: () => void;
}

export function GameWeekScreen({
  gameWeekLabel,
  shortlist,
  predictions,
  onSetPrediction,
  tiebreakerGuessMinute,
  onSetTiebreakerGuessMinute,
  onConfirm,
}: GameWeekScreenProps) {
  const answeredCount = shortlist.filter(
    (entry) => entry.player.id in predictions,
  ).length;
  const remaining = PICKS_PER_GAME_WEEK - answeredCount;
  const tiebreakerAnswered = tiebreakerGuessMinute !== null;
  const readyToReview = remaining === 0 && tiebreakerAnswered;

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
        <SponsorAdPlaceholder />
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <label htmlFor="tiebreaker-minute" className="block text-sm font-semibold text-white">
          Tiebreaker: what minute will the game week's first yellow card be shown?
        </label>
        <p className="mt-1 text-xs text-slate-400">
          If more than one player gets all {PICKS_PER_GAME_WEEK} correct, the closest guess wins the jackpot.
        </p>
        <input
          id="tiebreaker-minute"
          type="number"
          inputMode="numeric"
          min={1}
          max={90}
          placeholder="e.g. 23"
          value={tiebreakerGuessMinute ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "") {
              onSetTiebreakerGuessMinute(null);
              return;
            }
            const minute = Math.min(90, Math.max(1, Number(value)));
            onSetTiebreakerGuessMinute(minute);
          }}
          className="mt-3 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-amber-400"
        />
      </div>

      <SuggestedAccumulator shortlist={shortlist} />

      <div className="sticky bottom-4">
        <button
          type="button"
          disabled={!readyToReview}
          onClick={onConfirm}
          className="w-full rounded-xl bg-amber-500 py-3 font-semibold text-slate-900 shadow-lg shadow-amber-500/20 cursor-pointer transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none"
        >
          {remaining > 0
            ? `Predict ${remaining} more player${remaining === 1 ? "" : "s"}`
            : !tiebreakerAnswered
              ? "Answer the tiebreaker"
              : "Review Predictions"}
        </button>
      </div>
    </div>
  );
}
