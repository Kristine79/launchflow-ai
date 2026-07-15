import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { useLocale } from '@/core/i18n/I18nProvider';
import { getScoreColor, getScoreBg } from '@/lib/score';
import type { LaunchReadinessScore } from '@/ai/types';

interface ReadinessScoreProps {
  score: LaunchReadinessScore;
}

export function ReadinessScore({ score }: ReadinessScoreProps) {
  const { t } = useLocale();
  const categories = [
    { label: t('collections.categories.design'), value: score.categories.design },
    { label: t('collections.categories.samples'), value: score.categories.samples },
    { label: t('collections.categories.production'), value: score.categories.production },
    { label: t('collections.categories.photos'), value: score.categories.photos },
    { label: t('collections.categories.video'), value: score.categories.video },
    { label: t('collections.categories.seo'), value: score.categories.seo },
    { label: t('collections.categories.wildberries'), value: score.categories.wildberries },
    { label: t('collections.categories.ozon'), value: score.categories.ozon },
    { label: t('collections.categories.documents'), value: score.categories.documents },
    { label: t('collections.categories.certificates'), value: score.categories.certificates },
    { label: t('collections.categories.tasks'), value: score.categories.tasks },
    { label: t('collections.categories.quality'), value: score.categories.quality },
    { label: t('collections.categories.approval'), value: score.categories.approval },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{t('collections.launchReadiness')}</CardTitle>
          <div className={`text-3xl font-bold ${getScoreColor(score.overall)}`}>
            {score.overall}%
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((cat) => (
            <div key={cat.label} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground truncate mr-2">{cat.label}</span>
              <div className="flex items-center gap-2 shrink-0">
                <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getScoreBg(cat.value)} transition-all duration-500`}
                    style={{ width: `${cat.value}%` }}
                  />
                </div>
                <span className={`text-xs font-mono w-7 text-right ${getScoreColor(cat.value)}`}>
                  {cat.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
