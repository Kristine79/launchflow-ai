import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { useLocale } from '@/core/i18n/I18nProvider';
import { CollectionCard } from '../components/CollectionCard';
import type { Collection } from '@/types';

const DEMO_COLLECTIONS: Collection[] = [
  { id: 'col-summer-2027', name: 'Summer 2027', season: 'Summer 2027', launchDate: '2027-05-01', status: 'production', progress: 82, readinessScore: 82, productCount: 5, createdAt: '2026-06-01', updatedAt: '2026-12-20' },
  { id: 'col-spring-2027', name: 'Spring 2027 Capsule', season: 'Spring 2027', launchDate: '2027-03-15', status: 'launched', progress: 100, readinessScore: 96, productCount: 8, createdAt: '2026-03-01', updatedAt: '2026-11-30' },
  { id: 'col-fall-2027', name: 'Fall 2027 Premium', season: 'Fall 2027', launchDate: '2027-09-01', status: 'planning', progress: 15, readinessScore: 54, productCount: 3, createdAt: '2026-09-01', updatedAt: '2026-12-01' },
  { id: 'col-winter-2027', name: 'Winter 2027 Collection', season: 'Winter 2027', launchDate: '2027-11-01', status: 'design', progress: 35, readinessScore: 61, productCount: 4, createdAt: '2026-10-01', updatedAt: '2026-12-15' },
  { id: 'col-resort-2027', name: 'Resort 2027', season: 'Resort 2027', launchDate: '2027-07-15', status: 'sampling', progress: 55, readinessScore: 73, productCount: 6, createdAt: '2026-07-01', updatedAt: '2026-12-10' },
];

export function CollectionsPage() {
  const { t } = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">{t('collections.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t('collections.description', { count: DEMO_COLLECTIONS.length, launched: DEMO_COLLECTIONS.filter(c => c.status === 'launched').length })}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {DEMO_COLLECTIONS.map((collection, i) => (
          <CollectionCard key={collection.id} collection={collection} index={i} />
        ))}
      </div>
    </motion.div>
  );
}
