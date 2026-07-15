import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { useLocale } from '@/core/i18n/I18nProvider';

interface ReadinessRadarProps {
  data: { category: string; score: number }[];
}

export function ReadinessRadar({ data }: ReadinessRadarProps) {
  const { t } = useLocale();
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 110;
  const levels = [20, 40, 60, 80, 100];
  const angleStep = (2 * Math.PI) / data.length;

  const getPoint = (value: number, index: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / 100) * radius;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const polygonPoints = data
    .map((d, i) => {
      const pt = getPoint(d.score, i);
      return `${pt.x},${pt.y}`;
    })
    .join(' ');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{t('collections.radarTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {levels.map((level) => {
            const points = data
              .map((_, i) => {
                const pt = getPoint(level, i);
                return `${pt.x},${pt.y}`;
              })
              .join(' ');
            return (
              <polygon
                key={level}
                points={points}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth={1}
                opacity={0.5}
              />
            );
          })}
          <polygon points={polygonPoints} fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth={2} />
          {data.map((d, i) => {
            const pt = getPoint(d.score, i);
            return <circle key={d.category} cx={pt.x} cy={pt.y} r={3} fill="hsl(var(--primary))" />;
          })}
          {data.map((d, i) => {
            const angle = angleStep * i - Math.PI / 2;
            const labelR = radius + 20;
            const lx = cx + labelR * Math.cos(angle);
            const ly = cy + labelR * Math.sin(angle);
            return (
              <text
                key={d.category}
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-muted-foreground text-[10px]"
              >
                {d.category}
              </text>
            );
          })}
        </svg>
      </CardContent>
    </Card>
  );
}
