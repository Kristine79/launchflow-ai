import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { useLocale } from '@/core/i18n/I18nProvider';

interface TimelineEvent {
  date: string;
  event: string;
  status: 'completed' | 'in_progress' | 'pending';
}

interface CollectionTimelineProps {
  events: TimelineEvent[];
}

const statusConfig = {
  completed: { badge: 'success' as const, dot: 'bg-green-500' },
  in_progress: { badge: 'default' as const, dot: 'bg-primary' },
  pending: { badge: 'secondary' as const, dot: 'bg-muted-foreground/30' },
};

export function CollectionTimeline({ events }: CollectionTimelineProps) {
  const { t } = useLocale();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{t('collections.timelineTitle')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {events.map((event, i) => {
            const config = statusConfig[event.status];
            return (
              <div key={i} className="flex gap-3 pb-4 relative last:pb-0">
                <div className="flex flex-col items-center">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${config.dot} ring-1 ring-background`} />
                  {i < events.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-1" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm">{event.event}</p>
                    <Badge variant={config.badge} className="text-[10px] capitalize">
                      {t(`collections.timelineStatus.${event.status}`)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{event.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
