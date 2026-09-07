interface StatBarProps {
  label: string
  value: string
  fraction: number
}

export function StatBar({ label, value, fraction }: StatBarProps) {
  const percent = Math.round(Math.min(1, Math.max(0, fraction)) * 100)

  return (
    <div>
      <div className="flex items-baseline justify-between text-xs text-slate-400">
        <span>{label}</span>
        <span className="font-medium text-slate-200">{value}</span>
      </div>
      <div className="mt-1 h-1.5 w-full rounded-full bg-slate-700/60">
        <div className="h-1.5 rounded-full bg-slate-400" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
