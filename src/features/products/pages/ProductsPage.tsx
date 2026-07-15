import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { useLocale } from '@/core/i18n/I18nProvider';
import { getScoreColor } from '@/lib/score';
import type { Product } from '@/types';

const DEMO_PRODUCTS: Product[] = [
  { id: 'prod-1', collectionId: 'col-summer-2027', name: 'Linen Blend Blazer', sku: 'SU27-BL-001', status: 'production', size: 'XS-XL', color: 'Ecru', material: 'Linen Blend', supplier: 'Moda Fabrics', factory: 'GarmentCo Istanbul', costPrice: 55, recommendedPrice: 189, healthScore: 82, createdAt: '2026-08-01', updatedAt: '2026-12-20' },
  { id: 'prod-2', collectionId: 'col-summer-2027', name: 'Silk Dress Midi', sku: 'SU27-DR-002', status: 'production', size: 'XS-L', color: 'Dusty Rose', material: 'Silk', supplier: 'Luxury Yarns', factory: 'KnitPro Milan', costPrice: 48, recommendedPrice: 229, healthScore: 78, createdAt: '2026-08-15', updatedAt: '2026-12-18' },
  { id: 'prod-3', collectionId: 'col-spring-2027', name: 'Cotton Trench Coat', sku: 'SP27-TC-001', status: 'launched', size: 'S-XL', color: 'Khaki', material: 'Cotton Gabardine', supplier: 'EcoTextiles', factory: 'SewTech Vietnam', costPrice: 62, recommendedPrice: 259, healthScore: 95, createdAt: '2026-05-01', updatedAt: '2026-11-30' },
  { id: 'prod-4', collectionId: 'col-spring-2027', name: 'Wide-Leg Trousers', sku: 'SP27-TR-002', status: 'launched', size: 'XS-XL', color: 'Navy', material: 'Crepe', supplier: 'Moda Fabrics', factory: 'GarmentCo Istanbul', costPrice: 32, recommendedPrice: 139, healthScore: 91, createdAt: '2026-05-10', updatedAt: '2026-11-28' },
];

export function ProductsPage() {
  const { t } = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">{t('products.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t('products.description', { count: DEMO_PRODUCTS.length })}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DEMO_PRODUCTS.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Link to={`/products/${product.id}`}>
              <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                        {product.sku}
                      </p>
                    </div>
                    <span className={`text-lg font-bold ml-2 shrink-0 ${getScoreColor(product.healthScore)}`}>
                      {product.healthScore}%
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('products.color')}</span>
                      <span>{product.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('products.material')}</span>
                      <span>{product.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('products.factory')}</span>
                      <span className="text-right truncate max-w-[140px]">
                        {product.factory}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <Badge variant="outline" className="text-[10px]">
                        {t(`products.statusLabel.${product.status}`)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {product.size}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
