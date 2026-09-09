import { riskTone } from "./RiskBadge";

const TIERS = [
  { label: "High risk", range: "70%+", sample: 75 },
  { label: "Medium risk", range: "40–69%", sample: 55 },
  { label: "Low risk", range: "Below 40%", sample: 20 },
];

export function RiskKey() {
  return (
    <div className="flex w-full flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div>
        <p className="text-sm font-semibold text-amber-400">Risk key</p>
        <p className="text-xs text-slate-400">What the badge on each card means.</p>
      </div>

      <ul className="flex flex-col gap-2.5">
        {TIERS.map((tier) => {
          const tone = riskTone(tier.sample);
          return (
            <li key={tier.label} className="flex items-center gap-3">
              <span className={`h-3 w-3 shrink-0 rounded-full ${tone.dot}`} />
              <p className="text-sm text-slate-200">
                {tier.label}{" "}
                <span className={`text-xs ${tone.text}`}>({tier.range})</span>
              </p>
            </li>
          );
        })}
      </ul>

      <div className="flex min-h-24 flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-slate-700 p-4 text-center">
        <p className="text-xs font-semibold text-slate-500">Sponsor ad placeholder</p>
        <p className="text-xs text-slate-600">Space reserved for a future sponsor</p>
      </div>
    </div>
  );
}
