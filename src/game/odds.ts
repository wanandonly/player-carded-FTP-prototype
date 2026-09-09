export function decimalOddsFromRiskPercent(riskPercent: number): number {
  return 100 / riskPercent
}

// Standard UK bookmaker fractional odds ladder, with each rung's decimal
// equivalent — real prices only, so results always look like odds a
// bookmaker would actually offer rather than an arbitrary reduced fraction.
const FRACTIONAL_ODDS_LADDER: Array<{ label: string; decimal: number }> = [
  { label: '1/100', decimal: 1.01 },
  { label: '1/50', decimal: 1.02 },
  { label: '1/33', decimal: 1.03 },
  { label: '1/25', decimal: 1.04 },
  { label: '1/20', decimal: 1.05 },
  { label: '1/16', decimal: 1.0625 },
  { label: '1/14', decimal: 1.0714 },
  { label: '1/12', decimal: 1.0833 },
  { label: '1/10', decimal: 1.1 },
  { label: '1/9', decimal: 1.1111 },
  { label: '1/8', decimal: 1.125 },
  { label: '2/15', decimal: 1.1333 },
  { label: '1/7', decimal: 1.1429 },
  { label: '2/13', decimal: 1.1538 },
  { label: '1/6', decimal: 1.1667 },
  { label: '2/11', decimal: 1.1818 },
  { label: '1/5', decimal: 1.2 },
  { label: '2/9', decimal: 1.2222 },
  { label: '1/4', decimal: 1.25 },
  { label: '2/7', decimal: 1.2857 },
  { label: '3/10', decimal: 1.3 },
  { label: '1/3', decimal: 1.3333 },
  { label: '4/11', decimal: 1.3636 },
  { label: '2/5', decimal: 1.4 },
  { label: '4/9', decimal: 1.4444 },
  { label: '1/2', decimal: 1.5 },
  { label: '8/15', decimal: 1.5333 },
  { label: '4/7', decimal: 1.5714 },
  { label: '8/13', decimal: 1.6154 },
  { label: '4/6', decimal: 1.6667 },
  { label: '8/11', decimal: 1.7273 },
  { label: '4/5', decimal: 1.8 },
  { label: '5/6', decimal: 1.8333 },
  { label: '10/11', decimal: 1.9091 },
  { label: 'Evens', decimal: 2.0 },
  { label: '11/10', decimal: 2.1 },
  { label: '6/5', decimal: 2.2 },
  { label: '5/4', decimal: 2.25 },
  { label: '11/8', decimal: 2.375 },
  { label: '6/4', decimal: 2.5 },
  { label: '13/8', decimal: 2.625 },
  { label: '7/4', decimal: 2.75 },
  { label: '15/8', decimal: 2.875 },
  { label: '2/1', decimal: 3.0 },
  { label: '9/4', decimal: 3.25 },
  { label: '5/2', decimal: 3.5 },
  { label: '11/4', decimal: 3.75 },
  { label: '3/1', decimal: 4.0 },
  { label: '7/2', decimal: 4.5 },
  { label: '4/1', decimal: 5.0 },
  { label: '9/2', decimal: 5.5 },
  { label: '5/1', decimal: 6.0 },
  { label: '11/2', decimal: 6.5 },
  { label: '6/1', decimal: 7.0 },
  { label: '13/2', decimal: 7.5 },
  { label: '7/1', decimal: 8.0 },
  { label: '15/2', decimal: 8.5 },
  { label: '8/1', decimal: 9.0 },
  { label: '9/1', decimal: 10.0 },
  { label: '10/1', decimal: 11.0 },
  { label: '12/1', decimal: 13.0 },
  { label: '14/1', decimal: 15.0 },
  { label: '16/1', decimal: 17.0 },
  { label: '20/1', decimal: 21.0 },
  { label: '25/1', decimal: 26.0 },
  { label: '33/1', decimal: 34.0 },
  { label: '50/1', decimal: 51.0 },
  { label: '100/1', decimal: 101.0 },
]

/** Snaps decimal odds to the nearest rung on the standard fractional odds ladder. */
export function toFractionalOdds(decimalOdds: number): string {
  if (!Number.isFinite(decimalOdds) || decimalOdds <= 1) return '0/1'

  let closest = FRACTIONAL_ODDS_LADDER[0]
  let smallestDiff = Math.abs(decimalOdds - closest.decimal)

  for (const rung of FRACTIONAL_ODDS_LADDER) {
    const diff = Math.abs(decimalOdds - rung.decimal)
    if (diff < smallestDiff) {
      smallestDiff = diff
      closest = rung
    }
  }

  return closest.label
}
