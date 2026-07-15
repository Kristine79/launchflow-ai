import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLocale } from '@/core/i18n/I18nProvider';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { AnimatedNumber } from './AnimatedNumber';
import { Sparkline } from './Sparkline';

interface StatCardProps {
  labelKey: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: number; positive: boolean };
  variant?: 'default' | 'primary';
  sparklineData?: number[];
  className?: string;
}

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K';
  return n.toLocaleString('ru-RU');
}

export function StatCard({ labelKey, value, icon, trend, variant = 'default', sparklineData, className }: StatCardProps) {
  const { t } = useLocale();
  const isPrimary = variant === 'primary';
  const numericValue = typeof value === 'number' ? value : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        'rounded-xl border bg-card shadow-[var(--card-shadow)]',
        'transition-all duration-200 ease-out',
        'hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-0.5',
        isPrimary ? 'p-6 sm:col-span-2' : 'p-5',
        isPrimary && 'relative overflow-hidden',
        className
      )}
    >
      {isPrimary && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none" />
      )}
      <div className={cn('flex', isPrimary ? 'items-start justify-between gap-6' : 'items-start justify-between')}>
        <div className={cn('space-y-1', isPrimary && 'flex-1')}>
          <p className={cn('text-muted-foreground', isPrimary ? 'text-xs font-medium uppercase tracking-wider' : 'text-sm')}>
            {t(labelKey)}
          </p>
          <div className={cn('font-semibold tracking-tight', isPrimary ? 'text-4xl' : 'text-3xl')}>
            {numericValue !== undefined ? (
              <AnimatedNumber value={numericValue} formatFn={isPrimary ? formatCurrency : undefined} />
            ) : (
              value
            )}
          </div>
          {trend && (
            <div className="flex items-center gap-1.5 text-xs">
              {trend.positive ? (
                <TrendingUp className="h-3 w-3 text-success" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={trend.positive ? 'text-success' : 'text-destructive'}>
                {trend.positive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-muted-foreground">{t('common.vsLastMonth')}</span>
            </div>
          )}
        </div>
        <div className={cn(
          'rounded-lg shrink-0',
          isPrimary ? 'bg-primary/10 p-3.5' : 'bg-primary/10 p-2.5',
          'text-primary'
        )}>
          {icon}
        </div>
      </div>
      {sparklineData && !isPrimary && (
        <div className="mt-3 opacity-60">
          <Sparkline data={sparklineData} />
        </div>
      )}
    </motion.div>
  );
}
