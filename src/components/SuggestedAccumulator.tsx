import type { ShortlistEntry } from "../data/types";

const ACCUMULATOR_LEG_COUNT = 3;

function decimalOddsFor(riskPercent: number): number {
  return 100 / riskPercent;
}

interface SuggestedAccumulatorProps {
  shortlist: ShortlistEntry[];
}

export function SuggestedAccumulator({ shortlist }: SuggestedAccumulatorProps) {
  const legs = [...shortlist]
    .sort((a, b) => b.risk.riskPercent - a.risk.riskPercent)
    .slice(0, ACCUMULATOR_LEG_COUNT);

  if (legs.length < 2) return null;

  const combinedOdds = legs.reduce(
    (acc, entry) => acc * decimalOddsFor(entry.risk.riskPercent),
    1,
  );

  const betslipUrl = "https://www.bet365.com/";

  return (
    <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4">
      <p className="text-xs font-semibold text-indigo-300">
        Suggested accumulator
      </p>
      <p className="mt-1 text-sm text-white">
        This game week's highest-risk picks, combined into one bet.
      </p>

      <ul className="mt-3 flex flex-col gap-1.5">
        {legs.map((entry) => (
          <li
            key={entry.player.id}
            className="flex items-center justify-between text-sm text-slate-300"
          >
            <span className="truncate">{entry.player.name} to be booked</span>
            <span className="shrink-0 text-slate-400">
              {decimalOddsFor(entry.risk.riskPercent).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-indigo-500/20 pt-3">
        <div>
          <p className="text-xs text-slate-400">
            Combined odds · This would be the best available odds for the player
            and could be themed to that bookmaker
          </p>
          <p className="text-lg font-bold text-white">
            {combinedOdds.toFixed(2)}
          </p>
        </div>
        <a
          href={betslipUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
        >
          Add to betslip
        </a>
      </div>
    </div>
  );
}
