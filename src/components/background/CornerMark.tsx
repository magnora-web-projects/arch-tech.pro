export default function CornerMark({
  className = "",
  color,
}: {
  className?: string;
  color: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`absolute w-6 h-6 opacity-70 ${className}`}
    >
      <path
        d="M2 14 L2 2 L14 2"
        fill="none"
        stroke={`rgba(${color}, 0.9)`}
        strokeWidth="1.1"
      />
    </svg>
  );
}
