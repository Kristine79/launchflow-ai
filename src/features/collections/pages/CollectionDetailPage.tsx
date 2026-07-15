import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/core/ui/button';
import { useLocale } from '@/core/i18n/I18nProvider';
import { ReadinessScore } from '../components/ReadinessScore';
import { ReadinessRadar } from '../components/ReadinessRadar';
import { AiSummary } from '../components/AiSummary';
import { AiRecommendations } from '../components/AiRecommendations';
import { CollectionTimeline } from '../components/CollectionTimeline';
import { CollectionProducts } from '../components/CollectionProducts';
import type { LaunchReadinessScore, AiRecommendation } from '@/ai/types';
import type { Product } from '@/types';

const DEMO_READINESS: LaunchReadinessScore = {
  overall: 61,
  categories: {
    design: 90, samples: 75, production: 40,
    photos: 30, video: 20, seo: 55,
    wildberries: 45, ozon: 35,
    documents: 70, certificates: 80,
    tasks: 50, quality: 85, approval: 60,
  },
  summary: '',
  recommendations: [],
};

const DEMO_RECOMMENDATIONS: AiRecommendation[] = [
  { id: 'r1', type: 'production', title: '', description: '', priority: 'high', entityType: 'collection', entityId: 'col-fall-2027' },
  { id: 'r2', type: 'content', title: '', description: '', priority: 'high', entityType: 'collection', entityId: 'col-fall-2027' },
  { id: 'r3', type: 'launch', title: '', description: '', priority: 'medium', entityType: 'collection', entityId: 'col-fall-2027' },
];

const radarData = [
  { category: 'Design', score: 90 }, { category: 'Samples', score: 75 },
  { category: 'Prod\'n', score: 40 }, { category: 'Photos', score: 30 },
  { category: 'Video', score: 20 }, { category: 'SEO', score: 55 },
  { category: 'WB', score: 45 }, { category: 'Ozon', score: 35 },
  { category: 'Docs', score: 70 }, { category: 'Certif.', score: 80 },
  { category: 'Tasks', score: 50 }, { category: 'Quality', score: 85 },
  { category: 'Approval', score: 60 },
];

const timelineEvents = [
  { date: '2026-09-15', event: 'Design phase started', status: 'completed' as const },
  { date: '2026-10-20', event: 'First samples received', status: 'completed' as const },
  { date: '2026-11-10', event: 'Production started', status: 'completed' as const },
  { date: '2027-01-15', event: 'Photography completed', status: 'in_progress' as const },
  { date: '2027-02-01', event: 'Content creation', status: 'pending' as const },
  { date: '2027-03-01', event: 'Wildberries listing', status: 'pending' as const },
  { date: '2027-05-01', event: 'Launch date', status: 'pending' as const },
];

const DEMO_PRODUCTS: Product[] = [
  { id: 'prod-1', collectionId: 'col-fall-2027', name: 'Premium Wool Coat', sku: 'FW27-WC-001', status: 'production', size: 'S-XL', color: 'Charcoal', material: 'Italian Wool', supplier: 'Moda Fabrics', factory: 'GarmentCo Istanbul', costPrice: 85, recommendedPrice: 299, healthScore: 65, createdAt: '2026-10-01', updatedAt: '2026-12-15' },
  { id: 'prod-2', collectionId: 'col-fall-2027', name: 'Cashmere Blend Sweater', sku: 'FW27-CS-002', status: 'sample', size: 'XS-XL', color: 'Burgundy', material: 'Cashmere Blend', supplier: 'Luxury Yarns', factory: 'KnitPro Milan', costPrice: 45, recommendedPrice: 179, healthScore: 72, createdAt: '2026-10-05', updatedAt: '2026-12-10' },
  { id: 'prod-3', collectionId: 'col-fall-2027', name: 'Leather Ankle Boots', sku: 'FW27-LB-003', status: 'design', size: '36-41', color: 'Tan', material: 'Full-Grain Leather', supplier: 'LeatherCraft', factory: 'ShoeArt Portugal', costPrice: 65, recommendedPrice: 249, healthScore: 48, createdAt: '2026-11-01', updatedAt: '2026-11-28' },
];

export function CollectionDetailPage() {
  const { t } = useLocale();
  const readiness = {
    ...DEMO_READINESS,
    summary: t('aiDemo.collectionSummary', { name: 'Fall 2027 Premium' }),
    recommendations: [
      { ...DEMO_RECOMMENDATIONS[0], title: t('aiDemo.recProductionTitle'), description: t('aiDemo.recProductionDesc') },
      { ...DEMO_RECOMMENDATIONS[1], title: t('aiDemo.recPhotoTitle'), description: t('aiDemo.recPhotoDesc') },
      { ...DEMO_RECOMMENDATIONS[2], title: t('aiDemo.recMarketplaceTitle'), description: t('aiDemo.recMarketplaceDesc') },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link to="/collections">
            <ArrowLeft className="mr-1 h-4 w-4" />
            {t('collections.backToCollections')}
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight">
          Fall 2027 Premium
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">Fall 2027</p>
      </div>

      <div className="space-y-6">
        <ReadinessScore score={readiness} />
        <AiSummary summary={readiness.summary} />
        <div className="grid gap-6 lg:grid-cols-2">
          <ReadinessRadar data={radarData} />
          <CollectionTimeline events={timelineEvents} />
        </div>
        <AiRecommendations recommendations={readiness.recommendations} />
        <CollectionProducts products={DEMO_PRODUCTS} />
      </div>
    </motion.div>
  );
}
