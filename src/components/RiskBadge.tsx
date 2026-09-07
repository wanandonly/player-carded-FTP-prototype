interface RiskBadgeProps {
  riskPercent: number
  size?: 'sm' | 'lg'
}

function riskTone(riskPercent: number) {
  if (riskPercent >= 70) return { bg: 'bg-red-500/15', text: 'text-red-400', ring: 'ring-red-500/30' }
  if (riskPercent >= 40) return { bg: 'bg-amber-500/15', text: 'text-amber-400', ring: 'ring-amber-500/30' }
  return { bg: 'bg-emerald-500/15', text: 'text-emerald-400', ring: 'ring-emerald-500/30' }
}

export function RiskBadge({ riskPercent, size = 'sm' }: RiskBadgeProps) {
  const tone = riskTone(riskPercent)
  const sizeClasses = size === 'lg' ? 'text-2xl px-4 py-1.5' : 'text-sm px-2.5 py-1'

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ring-1 ${tone.bg} ${tone.text} ${tone.ring} ${sizeClasses}`}
    >
      {riskPercent}% risk
    </span>
  )
}
