interface Props {
  size?: 'sm' | 'md' | 'lg';
}

const dims = { sm: '0.7em', md: '0.85em', lg: '1.1em' };

export default function HereticTickReact({ size = 'md' }: Props) {
  const dim = dims[size];
  const id = `tick-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        marginLeft: '0.1em',
        transform: 'translateY(-0.05em)',
      }}
      className="heretic-tick"
    >
      <defs>
        <linearGradient id={`gs-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7E7B5"/>
          <stop offset="40%" stopColor="#E0B45C"/>
          <stop offset="100%" stopColor="#C8922A"/>
        </linearGradient>
        <filter id={`gl-${id}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur"/>
          <feColorMatrix in="blur" type="matrix"
            values="1 0.7 0 0 0.15 0.8 0.55 0 0 0.08 0 0 0 0 0 0 0 0 0.6 0" result="glow"/>
          <feMerge>
            <feMergeNode in="glow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#gl-${id})`}>
        <path
          className="tick-main"
          d="M180 470 L380 740 L860 185"
          fill="none"
          stroke={`url(#gs-${id})`}
          strokeWidth="72"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="tick-shine"
          d="M180 470 L380 740 L860 185"
          fill="none"
          stroke="#FFF6D5"
          strokeOpacity="0.35"
          strokeWidth="28"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
