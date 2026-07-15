import { Link } from 'react-router';
import { Card, CardContent } from '@/core/ui/card';
import { useLocale } from '@/core/i18n/I18nProvider';
import { Layers, Shirt, CheckSquare, MessageSquare } from 'lucide-react';

const actions = [
  { labelKey: 'dashboard.newCollection', descKey: 'dashboard.newCollectionDesc', href: '/collections', icon: Layers },
  { labelKey: 'dashboard.newProduct', descKey: 'dashboard.newProductDesc', href: '/products', icon: Shirt },
  { labelKey: 'dashboard.viewTasks', descKey: 'dashboard.viewTasksDesc', href: '/tasks', icon: CheckSquare },
  { labelKey: 'dashboard.openReviews', descKey: 'dashboard.openReviewsDesc', href: '/reviews', icon: MessageSquare },
];

export function QuickActions() {
  const { t } = useLocale();

  return (
    <div className="grid gap-3 grid-cols-2">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Link key={action.labelKey} to={action.href}>
            <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer h-full">
              <CardContent className="p-4">
                <div className="rounded-lg bg-primary/10 p-2 w-fit mb-3 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm font-medium group-hover:text-primary transition-colors">
                  {t(action.labelKey)}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{t(action.descKey)}</p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
