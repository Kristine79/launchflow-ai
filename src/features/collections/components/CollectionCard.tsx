import { Link } from 'react-router';
import { Card, CardContent, CardHeader } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { formatDate } from '@/lib/utils';
import { getScoreColor } from '@/lib/score';
import { useLocale } from '@/core/i18n/I18nProvider';
import { motion } from 'framer-motion';
import type { Collection } from '@/types';

const statusVariants: Record<string, 'default' | 'secondary' | 'success' | 'warning' | 'destructive'> = {
  launched: 'success',
  production: 'warning',
  planning: 'secondary',
  design: 'default',
  sampling: 'default',
  content: 'warning',
  marketplace: 'warning',
};

interface CollectionCardProps {
  collection: Collection;
  index: number;
}

export function CollectionCard({ collection, index }: CollectionCardProps) {
  const { t } = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link to={`/collections/${collection.id}`}>
        <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer h-full">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {collection.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">{collection.season}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${getScoreColor(collection.readinessScore)}`}>
                  {collection.readinessScore}%
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <Badge variant={statusVariants[collection.status] || 'default'}>
                {t(`collections.status.${collection.status}`)}
              </Badge>
              <span className="text-muted-foreground">
                {t('common.launchPrefix', { date: formatDate(collection.launchDate) })}
              </span>
            </div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${collection.progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">{t('common.countProducts', { n: collection.productCount || 0 })}</span>
              <span className="text-xs text-muted-foreground">{t('common.completePercent', { n: collection.progress })}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
