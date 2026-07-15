import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { useLocale } from '@/core/i18n/I18nProvider';
import { AlertTriangle, CheckCircle2, Info, Lightbulb } from 'lucide-react';
import type { AiRecommendation } from '@/ai/types';

interface AiRecommendationsProps {
  recommendations: AiRecommendation[];
}

const priorityConfig = {
  high: { icon: AlertTriangle, badge: 'destructive' as const, color: 'text-destructive' },
  medium: { icon: Info, badge: 'warning' as const, color: 'text-warning' },
  low: { icon: Lightbulb, badge: 'secondary' as const, color: 'text-muted-foreground' },
};

export function AiRecommendations({ recommendations }: AiRecommendationsProps) {
  const { t } = useLocale();

  if (!recommendations.length) {
    return (
      <Card>
        <CardContent className="flex items-center gap-2 py-8 text-sm text-muted-foreground justify-center">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          {t('common.noRecommendations')}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{t('collections.aiRecommendations')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((rec) => {
          const config = priorityConfig[rec.priority];
          const Icon = config.icon;
          return (
            <div key={rec.id} className="flex gap-3 p-3 rounded-lg border bg-card">
              <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${config.color}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{rec.title}</p>
                  <Badge variant={config.badge} className="text-[10px] capitalize">
                    {t(`aiRec.${rec.priority}`)}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{rec.description}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
