import { Layers, Shirt, Clock, Target, DollarSign } from 'lucide-react';
import { StatCard } from './StatCard';

const revenueSparkline = [420, 485, 460, 510, 540, 580, 620, 590, 645, 680, 720, 780];
const sparklineData = {
  collections: [3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5],
  active: [2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4],
  production: [4, 5, 6, 5, 6, 7, 7, 8, 8, 8, 8, 8],
  readiness: [55, 58, 62, 60, 65, 68, 70, 71, 72, 73, 73, 73],
};

export function StatCardGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        labelKey="dashboard.statRevenue"
        value={890000}
        icon={<DollarSign className="h-5 w-5" />}
        trend={{ value: 23, positive: true }}
        variant="primary"
        sparklineData={revenueSparkline}
      />
      <StatCard
        labelKey="dashboard.statTotalCollections"
        value={5}
        icon={<Layers className="h-5 w-5" />}
        trend={{ value: 25, positive: true }}
        sparklineData={sparklineData.collections}
      />
      <StatCard
        labelKey="dashboard.statActiveCollections"
        value={4}
        icon={<Clock className="h-5 w-5" />}
        trend={{ value: 33, positive: true }}
        sparklineData={sparklineData.active}
      />
      <StatCard
        labelKey="dashboard.statProductsInProduction"
        value={8}
        icon={<Shirt className="h-5 w-5" />}
        trend={{ value: 12, positive: true }}
        sparklineData={sparklineData.production}
      />
      <StatCard
        labelKey="dashboard.statAvgReadiness"
        value="73%"
        icon={<Target className="h-5 w-5" />}
        trend={{ value: 8, positive: false }}
        sparklineData={sparklineData.readiness}
      />
    </div>
  );
}
