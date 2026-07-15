import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { useLocale } from '@/core/i18n/I18nProvider';
import { getScoreColor } from '@/lib/score';

const DEMO_COLLECTIONS = [
  { id: 'col-summer-2027', name: 'Summer 2027', status: 'production', progress: 82, readinessScore: 82 },
  { id: 'col-spring-2027', name: 'Spring 2027', status: 'launched', progress: 100, readinessScore: 96 },
  { id: 'col-fall-2027', name: 'Fall 2027 Premium', status: 'planning', progress: 15, readinessScore: 54 },
  { id: 'col-winter-2027', name: 'Winter 2027', status: 'design', progress: 35, readinessScore: 61 },
];

export function RecentCollections() {
  const { t } = useLocale();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{t('dashboard.recentCollections')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {DEMO_COLLECTIONS.map((col, i) => (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
          >
            <Link
              to={`/collections/${col.id}`}
              className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                  {col.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden max-w-[120px]">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${col.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{col.progress}%</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="outline" className="text-[10px]">{t(`collections.status.${col.status}`)}</Badge>
                <span className={`text-sm font-mono ${getScoreColor(col.readinessScore)}`}>
                  {col.readinessScore}%
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
