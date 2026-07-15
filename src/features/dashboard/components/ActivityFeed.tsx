import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { useLocale } from '@/core/i18n/I18nProvider';

const DEMO_ACTIVITIES = [
  { actionKey: 'activity.collectionLaunched', target: 'Spring 2027 Capsule', userKey: 'demoUser.name', timeKey: '2 hours ago' },
  { actionKey: 'activity.photosCompleted', target: 'Linen Blend Blazer', userKey: 'Studio', timeKey: '5 hours ago' },
  { actionKey: 'activity.productionStarted', target: 'Summer 2027 Collection', userKey: 'Factory A', timeKey: '1 day ago' },
  { actionKey: 'activity.newRecommendation', target: 'Fall 2027 Premium — ' + 'production delay risk', userKey: 'AI', timeKey: '2 days ago' },
  { actionKey: 'activity.samplesApproved', target: 'Cashmere Blend Sweater', userKey: 'QC Team', timeKey: '3 days ago' },
  { actionKey: 'activity.marketplacePublished', target: 'Silk Dress Midi on Wildberries', userKey: 'System', timeKey: '4 days ago' },
];

export function ActivityFeed() {
  const { t } = useLocale();

  const translateTarget = (target: string) => target;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{t('dashboard.recentActivity')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {DEMO_ACTIVITIES.map((activity, i) => (
            <div key={activity.actionKey} className="relative flex gap-3 pb-5 last:pb-0">
              {i < DEMO_ACTIVITIES.length - 1 && (
                <div className="absolute left-[4px] top-3 bottom-0 w-px bg-border" />
              )}
              <div className="mt-1.5 h-2 w-2 rounded-full bg-primary/40 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{t(activity.actionKey)}</span>
                  <span className="text-muted-foreground"> — {activity.target}</span>
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground">{activity.userKey}</span>
                  <span className="text-xs text-muted-foreground/50">•</span>
                  <span className="text-xs text-muted-foreground">{activity.timeKey}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
