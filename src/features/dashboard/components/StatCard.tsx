import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLocale } from '@/core/i18n/I18nProvider';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  labelKey: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: number; positive: boolean };
  className?: string;
}

export function StatCard({ labelKey, value, icon, trend, className }: StatCardProps) {
  const { t } = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'rounded-xl border bg-card p-5 shadow-sm',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{t(labelKey)}</p>
          <p className="text-3xl font-semibold tracking-tight">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 text-xs">
              {trend.positive ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={trend.positive ? 'text-green-500' : 'text-red-500'}>
                {t('common.vsLastMonth', { n: trend.value })}
              </span>
            </div>
          )}
        </div>
        <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
