import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { useLocale } from '@/core/i18n/I18nProvider';
import { getScoreColor } from '@/lib/score';
import type { Product } from '@/types';

interface CollectionProductsProps {
  products: Product[];
}

export function CollectionProducts({ products }: CollectionProductsProps) {
  const { t } = useLocale();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          {t('collections.products', { count: products.length })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {product.sku} • {product.color}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Badge variant="outline" className="text-[10px]">
                    {t(`products.statusLabel.${product.status}`)}
                  </Badge>
                  <span className={`text-sm font-mono ${getScoreColor(product.healthScore)}`}>
                    {product.healthScore}%
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
