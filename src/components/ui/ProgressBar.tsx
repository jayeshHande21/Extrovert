type ProgressBarProps = {
  step: number
  total?: number
}

export function ProgressBar({ step, total = 4 }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (step / total) * 100))

  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-ext-border">
      <div
        className="h-full rounded-full bg-ext-accent transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
