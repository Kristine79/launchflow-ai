import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/core/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { CircularProgress } from '@/core/ui/circular-progress';
import { useLocale } from '@/core/i18n/I18nProvider';
import { AiRecommendations } from '@/features/collections/components/AiRecommendations';
import type { AiRecommendation } from '@/ai/types';
import type { Product } from '@/types';

const DEMO_PRODUCT: Product = {
  id: 'prod-1',
  collectionId: 'col-summer-2027',
  name: 'Linen Blend Blazer',
  sku: 'SU27-BL-001',
  status: 'production',
  size: 'XS-XL',
  color: 'Ecru',
  material: 'Linen Blend',
  supplier: 'Moda Fabrics',
  factory: 'GarmentCo Istanbul',
  costPrice: 55,
  recommendedPrice: 189,
  healthScore: 82,
  createdAt: '2026-08-01',
  updatedAt: '2026-12-20',
};

function getDemoRecommendations(t: (key: string, params?: Record<string, string | number>) => string): AiRecommendation[] {
  return [
    { id: 'pr1', type: 'content', title: t('aiDemo.recSizeGuideTitle'), description: t('aiDemo.recSizeGuideDesc'), priority: 'medium', entityType: 'product', entityId: 'prod-1' },
    { id: 'pr2', type: 'quality', title: t('aiDemo.recStitchingTitle'), description: t('aiDemo.recStitchingDesc'), priority: 'high', entityType: 'product', entityId: 'prod-1' },
  ];
}

export function ProductDetailPage() {
  const { t } = useLocale();
  const product = DEMO_PRODUCT;
  const recommendations = getDemoRecommendations(t);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link to="/products">
            <ArrowLeft className="mr-1 h-4 w-4" />
            {t('products.backToProducts')}
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight">{product.name}</h1>
        <p className="text-sm text-muted-foreground mt-0.5 font-mono">{product.sku}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-4">
          <Card>
            <CardHeader className="items-center pb-2">
              <CardTitle className="text-sm font-medium">{t('products.productHealth')}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center pb-6">
              <CircularProgress value={product.healthScore} size={140} strokeWidth={8} label={t('products.health')} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{t('products.details')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: t('products.status'), value: t(`products.statusLabel.${product.status}`) },
                { label: t('products.color'), value: product.color },
                { label: t('products.material'), value: product.material },
                { label: t('products.sizeRange'), value: product.size },
                { label: t('products.supplier'), value: product.supplier },
                { label: t('products.factory'), value: product.factory },
              ].map((row) => (
                <div key={row.label} className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{row.label}</span>
                  <span className="text-sm font-medium">{row.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{t('products.pricing')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{t('products.costPrice')}</span>
                <span className="text-sm font-medium">{product.costPrice} ₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{t('products.recommendedPrice')}</span>
                <span className="text-sm font-medium text-green-500">{product.recommendedPrice} ₽</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-sm text-muted-foreground">{t('products.margin')}</span>
                <Badge variant="secondary">
                  {Math.round((1 - product.costPrice / product.recommendedPrice) * 100)}%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <AiRecommendations recommendations={recommendations} />
        </div>
      </div>
    </motion.div>
  );
}
