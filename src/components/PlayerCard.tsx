import type { ShortlistEntry } from "../data/types";
import { FormChips } from "./FormChips";
import { RiskBadge } from "./RiskBadge";
import { StatBar } from "./StatBar";

interface PlayerCardProps {
  entry: ShortlistEntry;
  prediction: boolean | null;
  onSetPrediction: (willBeBooked: boolean | null) => void;
}

export function PlayerCard({
  entry,
  prediction,
  onSetPrediction,
}: PlayerCardProps) {
  const { player, team, opponent, referee, stats, risk } = entry;

  return (
    <div className="flex w-full flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-left">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-white">{player.name}</p>
          <p className="text-xs text-slate-400">
            <span className="font-semibold text-slate-300">
              {team.shortName}
            </span>{" "}
            vs {opponent.shortName} · {player.position}
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
            Ref: <span className="text-slate-200">{referee.name}</span>{" "}
            <span className="text-slate-500">
              ({referee.avgCardsPerGame.toFixed(1)} cards/game avg)
            </span>
          </p>
        </div>
        <FormChips form={stats.last5Form} />
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={() => onSetPrediction(prediction === true ? null : true)}
          aria-pressed={prediction === true}
          className={`flex-1 rounded-lg border py-2 text-sm font-semibold transition cursor-pointer ${
            prediction === true
              ? "border-amber-400 bg-amber-500 text-slate-900"
              : "border-slate-700 text-slate-300 hover:border-slate-500"
          }`}
        >
          Will be booked
        </button>
        <button
          type="button"
          onClick={() => onSetPrediction(prediction === false ? null : false)}
          aria-pressed={prediction === false}
          className={`flex-1 rounded-lg border py-2 text-sm font-semibold transition cursor-pointer ${
            prediction === false
              ? "border-amber-400 bg-amber-500 text-slate-900"
              : "border-slate-700 text-slate-300 hover:border-slate-500"
          }`}
        >
          Won't be booked
        </button>
      </div>
    </div>
  );
}
