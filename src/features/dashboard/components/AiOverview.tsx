import { motion } from 'framer-motion';
import { Card, CardContent } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { useLocale } from '@/core/i18n/I18nProvider';
import { Sparkles } from 'lucide-react';

export function AiOverview() {
  const { t } = useLocale();

  const highlights = [
    { label: t('dashboard.aiHighlightOnTrack'), value: '4 ' + t('common.collections') },
    { label: t('dashboard.aiHighlightNeedsAttention'), value: '1 ' + t('common.collections') },
    { label: t('dashboard.aiHighlightAvgReadiness'), value: '73%' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-primary/10 p-2.5 shrink-0">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-sm font-semibold">{t('dashboard.executiveOverview')}</h2>
                <Badge variant="secondary" className="text-[10px]">{t('dashboard.aiPowered')}</Badge>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t('dashboard.aiSummary')}
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                {highlights.map((h) => (
                  <div key={h.label} className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">{h.label}:</span>
                    <span className="font-medium">{h.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
