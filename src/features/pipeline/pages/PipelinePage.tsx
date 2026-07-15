import { motion } from 'framer-motion';
import { useLocale } from '@/core/i18n/I18nProvider';
import { KanbanBoard } from '../components/KanbanBoard';

export function PipelinePage() {
  const { t } = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">{t('pipeline.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('pipeline.description')}</p>
      </div>

      <KanbanBoard />
    </motion.div>
  );
}
