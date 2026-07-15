import { motion } from 'framer-motion';
import { getScoreColorHex } from '@/lib/score';

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

export function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
  label,
  className,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  const color = getScoreColorHex(value);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold" style={{ color }}>{value}</span>
        {label && <span className="text-xs text-muted-foreground">{label}</span>}
      </div>
    </div>
  );
}
