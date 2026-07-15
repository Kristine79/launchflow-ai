import { motion } from 'framer-motion';
import { useLocale } from '@/core/i18n/I18nProvider';
import { StatCardGrid } from '../components/StatCardGrid';
import { AiOverview } from '../components/AiOverview';
import { RecentCollections } from '../components/RecentCollections';
import { ActivityFeed } from '../components/ActivityFeed';
import { QuickActions } from '../components/QuickActions';

export function DashboardPage() {
  const { t } = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t('dashboard.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('dashboard.description')}</p>
      </div>

      <AiOverview />
      <StatCardGrid />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentCollections />
        <div className="space-y-6">
          <QuickActions />
          <ActivityFeed />
        </div>
      </div>
    </motion.div>
  );
}
