import type { CautionResult } from '../data/types'

const CHIP_STYLES: Record<CautionResult, string> = {
  Y: 'bg-amber-400 text-slate-900',
  R: 'bg-red-500 text-white',
  '-': 'bg-slate-700 text-slate-500',
}

export function FormChips({ form }: { form: CautionResult[] }) {
  return (
    <div className="flex items-center gap-1">
      {form.map((result, index) => (
        <span
          key={index}
          className={`flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold ${CHIP_STYLES[result]}`}
        >
          {result === '-' ? '' : result}
        </span>
      ))}
    </div>
  )
}
