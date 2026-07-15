import { FlaskConical } from 'lucide-react';
import { useLocale } from '@/core/i18n/I18nProvider';

export function DemoBanner() {
  const { t } = useLocale();
  const isDemo = typeof window !== 'undefined' && sessionStorage.getItem('launchflow-demo') === 'true';
  if (!isDemo) return null;

  return (
    <div className="bg-primary/10 border-b border-primary/20 px-4 py-1.5 text-center text-xs font-medium text-primary flex items-center justify-center gap-2">
      <FlaskConical className="h-3 w-3" />
      <span>{t('demo.banner')}</span>
    </div>
  );
}
