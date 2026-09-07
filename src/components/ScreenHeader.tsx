import type { ReactNode } from 'react'

interface ScreenHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  right?: ReactNode
}

export function ScreenHeader({ eyebrow, title, subtitle, right }: ScreenHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-800 pb-4">
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wider text-fuchsia-400">{eyebrow}</p>
        )}
        <h1 className="mt-1 text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
      </div>
      {right && <div>{right}</div>}
    </div>
  )
}
