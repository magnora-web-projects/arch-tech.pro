export const motifShapes: Record<string, React.ReactNode> = {
  armchair: (
    <g>
      <path
        pathLength={100}
        d="M14 74 L14 44 Q14 30 28 30 L58 30 Q72 30 72 44 L72 74"
      />
      <path pathLength={100} d="M14 74 L14 92 M72 74 L72 92" />
      <path
        pathLength={100}
        d="M6 50 L6 74 Q6 80 14 80 M80 50 L80 74 Q80 80 72 80"
      />
      <path
        pathLength={100}
        d="M6 50 L6 40 Q6 34 14 34 M80 50 L80 40 Q80 34 72 34"
      />
      <path pathLength={100} d="M20 92 L20 84 M66 92 L66 84" />
    </g>
  ),
  pendant: (
    <g>
      <path pathLength={100} d="M43 4 L43 32" />
      <path pathLength={100} d="M20 32 L66 32 L58 62 L28 62 Z" />
      <circle pathLength={100} cx="43" cy="70" r="3" />
    </g>
  ),
  sofa: (
    <g>
      <path
        pathLength={100}
        d="M8 58 L8 40 Q8 28 22 28 L64 28 Q78 28 78 40 L78 58"
      />
      <path pathLength={100} d="M8 58 L8 74 M78 58 L78 74" />
      <path
        pathLength={100}
        d="M2 44 L2 58 Q2 64 8 64 M84 44 L84 58 Q84 64 78 64"
      />
      <path pathLength={100} d="M20 58 L20 40 M43 58 L43 38 M66 58 L66 40" />
      <path pathLength={100} d="M14 74 L14 68 M72 74 L72 68" />
    </g>
  ),
  shelving: (
    <g>
      <rect pathLength={100} x="10" y="6" width="60" height="82" />
      <path pathLength={100} d="M10 27 L70 27 M10 48 L70 48 M10 68 L70 68" />
      <path pathLength={100} d="M40 6 L40 88" />
      <circle pathLength={100} cx="24" cy="17" r="4" />
      <path pathLength={100} d="M50 60 L62 60 L62 68 L50 68 Z" />
    </g>
  ),
  sidetable: (
    <g>
      <ellipse pathLength={100} cx="30" cy="16" rx="16" ry="5" />
      <path pathLength={100} d="M16 16 L16 62 M44 16 L44 62" />
      <path pathLength={100} d="M10 62 L50 62" />
      <path pathLength={100} d="M56 40 Q50 24 60 10 Q70 24 62 40 Z" />
      <path pathLength={100} d="M58 40 L58 62 M64 40 L64 62 M58 62 L64 62" />
    </g>
  ),
  diningchair: (
    <g>
      <path pathLength={100} d="M16 8 L16 34 M52 8 L52 34" />
      <path pathLength={100} d="M16 34 L52 34 L52 46 L16 46 Z" />
      <path pathLength={100} d="M16 46 L10 88 M52 46 L58 88" />
      <path pathLength={100} d="M16 8 Q34 2 52 8" />
    </g>
  ),
  rug: (
    <g>
      <rect pathLength={100} x="4" y="4" width="88" height="58" rx="2" />
      <rect
        pathLength={100}
        x="14"
        y="14"
        width="68"
        height="38"
        rx="1"
        strokeDasharray="4,5"
      />
      <path
        pathLength={100}
        d="M4 4 L14 14 M92 4 L82 14 M4 62 L14 52 M92 62 L82 52"
      />
    </g>
  ),
};
