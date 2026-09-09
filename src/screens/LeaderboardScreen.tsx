import { useMemo, useState } from "react";
import { leaderboard, leaderboardOutcomes } from "../data/leaderboard.mock";
import { computeScoreResult } from "../game/scoring";
import type {
  PlayerPrediction,
  ResolvedOutcome,
  ScoreResult,
  ShortlistEntry,
} from "../data/types";
import { ScreenHeader } from "../components/ScreenHeader";

interface LeaderboardYou {
  predictions: PlayerPrediction[];
  outcomesByPlayerId: Map<string, ResolvedOutcome>;
  score: ScoreResult;
  submittedAt: string;
}

interface LeaderboardScreenProps {
  gameWeekLabel: string;
  gameWeekId: string;
  shortlist: ShortlistEntry[];
  you: LeaderboardYou | null;
  hasFinished: boolean;
}

interface LeaderboardRow {
  id: string;
  name: string;
  isYou: boolean;
  predictionsByPlayerId: Map<string, boolean>;
  outcomesByPlayerId: Map<string, ResolvedOutcome>;
  score: ScoreResult;
  submittedAt: string;
}

export function LeaderboardScreen({
  gameWeekLabel,
  gameWeekId,
  shortlist,
  you,
  hasFinished,
}: LeaderboardScreenProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const mockOutcomesByPlayerId = useMemo(
    () =>
      new Map(
        leaderboardOutcomes.map((outcome) => [outcome.playerId, outcome]),
      ),
    [],
  );

  const riskPercentByPlayerId = useMemo(
    () => new Map(shortlist.map((entry) => [entry.player.id, entry.risk.riskPercent])),
    [shortlist],
  );

  const rows: LeaderboardRow[] = useMemo(() => {
    const rivalRows = leaderboard.map((entry) => {
      const score = computeScoreResult(
        {
          gameWeekId,
          predictions: entry.predictions,
          tiebreakerGuessMinute: entry.tiebreakerGuessMinute,
        },
        leaderboardOutcomes,
        riskPercentByPlayerId,
      );
      return {
        id: entry.id,
        name: entry.name,
        isYou: false,
        predictionsByPlayerId: new Map(
          entry.predictions.map((p) => [p.playerId, p.willBeBooked]),
        ),
        outcomesByPlayerId: mockOutcomesByPlayerId,
        score,
        submittedAt: entry.submittedAt,
      };
    });

    const youRow: LeaderboardRow[] = you
      ? [
          {
            id: "you",
            name: "You",
            isYou: true,
            predictionsByPlayerId: new Map(
              you.predictions.map((p) => [p.playerId, p.willBeBooked]),
            ),
            outcomesByPlayerId: you.outcomesByPlayerId,
            score: you.score,
            submittedAt: you.submittedAt,
          },
        ]
      : [];

    return [...rivalRows, ...youRow].sort((a, b) => {
      if (b.score.correctPredictions !== a.score.correctPredictions) {
        return b.score.correctPredictions - a.score.correctPredictions;
      }

      if (b.score.insightPoints !== a.score.insightPoints) {
        return b.score.insightPoints - a.score.insightPoints;
      }

      const aDiff = a.score.tiebreakerDiff;
      const bDiff = b.score.tiebreakerDiff;
      if (aDiff !== bDiff) {
        if (aDiff === null) return 1;
        if (bDiff === null) return -1;
        return aDiff - bDiff;
      }

      return (
        new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
      );
    });
  }, [gameWeekId, mockOutcomesByPlayerId, riskPercentByPlayerId, you]);

  function toggleRow(id: string) {
    setExpandedId((current) => (current === id ? null : id));
  }

  if (!hasFinished) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8">
        <ScreenHeader
          eyebrow={gameWeekLabel}
          title="Leaderboard"
          subtitle="Standings aren't in yet."
        />

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-center">
          <p className="text-sm text-slate-300">
            The leaderboard will appear here once {gameWeekLabel} has finished.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
      <ScreenHeader
        eyebrow={gameWeekLabel}
        title="Leaderboard"
        subtitle="Ranked by correct predictions this game week."
      />

      <ul className="flex flex-col gap-2">
        {rows.map((row, index) => {
          const expanded = expandedId === row.id;

          return (
            <li
              key={row.id}
              className={`rounded-lg border ${
                row.isYou
                  ? "border-amber-400 bg-amber-500/10 ring-1 ring-amber-400/50"
                  : "border-slate-800 bg-slate-900/40"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleRow(row.id)}
                aria-expanded={expanded}
                className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-300">
                    {index + 1}
                  </span>
                  <p
                    className={`font-medium ${row.isYou ? "text-amber-300" : "text-white"}`}
                  >
                    {row.name}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-lg font-bold text-white">
                    {row.score.correctPredictions}/{row.score.totalPredictions}
                  </p>
                  <span
                    aria-hidden="true"
                    className={`text-slate-400 transition-transform ${expanded ? "rotate-180" : ""}`}
                  >
                    ▾
                  </span>
                </div>
              </button>

              {expanded && (
                <div className="flex flex-col gap-2 border-t border-slate-800 px-4 py-3">
                  <p className="text-xs text-slate-400">
                    Tiebreaker: guessed {row.score.tiebreakerGuessMinute}'
                    {row.score.tiebreakerActualMinute !== null && (
                      <>
                        {" "}
                        · actual {row.score.tiebreakerActualMinute}' · Δ
                        {row.score.tiebreakerDiff}
                      </>
                    )}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {shortlist.map((entry) => {
                      const outcome = row.outcomesByPlayerId.get(
                        entry.player.id,
                      );
                      const prediction = row.predictionsByPlayerId.get(
                        entry.player.id,
                      );
                      const hit =
                        outcome !== undefined &&
                        prediction !== undefined &&
                        prediction === outcome.wasBooked;

                      return (
                        <li
                          key={entry.player.id}
                          className={`flex items-center justify-between rounded-lg border px-3 py-2 ${
                            hit
                              ? "border-emerald-500/30 bg-emerald-500/10"
                              : "border-slate-800 bg-slate-900/40"
                          }`}
                        >
                          <div className="flex min-w-0 items-center gap-2">
                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                                hit
                                  ? "bg-emerald-500 text-slate-900"
                                  : "bg-slate-700 text-slate-400"
                              }`}
                            >
                              {hit ? "✓" : "✕"}
                            </span>
                            <p className="truncate text-sm font-medium text-white">
                              {entry.player.name}
                            </p>
                            <span className="shrink-0 whitespace-nowrap rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
                              {prediction
                                ? "Will be booked"
                                : "Won't be booked"}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          );
        })}

        {you === null && (
          <li className="flex items-center justify-between rounded-lg border border-amber-400 bg-amber-500/10 px-4 py-3 ring-1 ring-amber-400/50">
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-300">
                {rows.length + 1}
              </span>
              <p className="font-medium text-amber-300">You</p>
            </div>
            <p className="text-sm font-semibold text-slate-300">
              Play this game week to join
            </p>
          </li>
        )}
      </ul>
    </div>
  );
}
