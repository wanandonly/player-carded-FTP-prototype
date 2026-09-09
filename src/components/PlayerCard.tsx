import { useState } from "react";
import type { ShortlistEntry } from "../data/types";
import { decimalOddsFromRiskPercent, toFractionalOdds } from "../game/odds";
import { FormChips } from "./FormChips";
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
  const [showRefStats, setShowRefStats] = useState(false);

  const fractionalOdds = toFractionalOdds(
    decimalOddsFromRiskPercent(risk.riskPercent),
  );

  return (
    <div className="flex w-full flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-left">
      <div>
        <p className="font-semibold text-white">{player.name}</p>
        <p className="text-xs text-slate-400">
          <span className="font-semibold text-slate-300">
            {team.shortName}
          </span>{" "}
          vs {opponent.shortName} · {player.position}
        </p>
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
            Ref:{" "}
            <button
              type="button"
              onClick={() => setShowRefStats((v) => !v)}
              aria-expanded={showRefStats}
              className="cursor-pointer border-0 bg-transparent p-0 align-baseline text-slate-200 hover:text-slate-100"
            >
              {referee.name}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`ml-0.5 inline-block h-2.5 w-2.5 align-middle transition-transform ${
                  showRefStats ? "rotate-180" : ""
                }`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>{" "}
            <span className="text-slate-500">
              ({referee.avgCardsPerGame.toFixed(1)} cards/game)
            </span>
          </p>
        </div>
        <FormChips form={stats.last5Form} />
      </div>

      {showRefStats && (
        <div className="grid grid-cols-3 gap-x-4 gap-y-1 rounded-lg bg-slate-800/60 p-3">
          <div className="flex flex-col text-xs text-slate-400">
            <span>Games</span>
            <span className="font-medium text-slate-200">
              {referee.gamesOfficiatedSeason}
            </span>
          </div>
          <div className="flex flex-col text-xs text-slate-400">
            <span>Yellow cards</span>
            <span className="font-medium text-slate-200">
              {referee.yellowCardsIssuedSeason}
            </span>
          </div>
          <div className="flex flex-col text-xs text-slate-400">
            <span>Red cards</span>
            <span className="font-medium text-slate-200">
              {referee.redCardsIssuedSeason}
            </span>
          </div>
        </div>
      )}

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

      <div className="flex items-center justify-between gap-3 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-2">
        <p className="min-w-0 truncate text-sm text-white">
          {player.name} to be booked
        </p>
        <span className="flex shrink-0 flex-col items-center rounded-lg bg-indigo-500 px-3 py-1.5 leading-tight text-white">
          <span className="text-sm font-bold">{fractionalOdds}</span>
          <span className="text-[9px] font-medium uppercase tracking-wide text-indigo-100">
            Add to betslip
          </span>
        </span>
      </div>
    </div>
  );
}
