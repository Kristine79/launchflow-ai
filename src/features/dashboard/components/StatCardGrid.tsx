import { Layers, Shirt, Clock, Target } from 'lucide-react';
import { StatCard } from './StatCard';

const stats = [
  { labelKey: 'dashboard.statTotalCollections', value: 5, icon: <Layers className="h-5 w-5" />, trend: { value: 25, positive: true } },
  { labelKey: 'dashboard.statActiveCollections', value: 4, icon: <Clock className="h-5 w-5" />, trend: { value: 33, positive: true } },
  { labelKey: 'dashboard.statProductsInProduction', value: 8, icon: <Shirt className="h-5 w-5" />, trend: { value: 12, positive: true } },
  { labelKey: 'dashboard.statAvgReadiness', value: '73%', icon: <Target className="h-5 w-5" />, trend: { value: 8, positive: false } },
];

export function StatCardGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.labelKey} {...stat} />
      ))}
    </div>
  );
}
