import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { useLocale } from '@/core/i18n/I18nProvider';
import { Sparkles } from 'lucide-react';

interface AiSummaryProps {
  summary: string;
}

export function AiSummary({ summary }: AiSummaryProps) {
  const { t } = useLocale();

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm font-medium">{t('collections.aiSummary')}</CardTitle>
          <Badge variant="secondary" className="ml-auto text-[10px]">{t('dashboard.aiPowered')}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed">{summary}</p>
      </CardContent>
    </Card>
  );
}
