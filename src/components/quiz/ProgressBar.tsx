interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-charcoal/60">
          Question {current} of {total}
        </span>
        <span className="text-sm text-charcoal/50">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="h-2 bg-charcoal/8 rounded-full overflow-hidden">
        <div
          className="h-full bg-gold rounded-full transition-all duration-500 ease-out shadow-sm shadow-gold/20"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
