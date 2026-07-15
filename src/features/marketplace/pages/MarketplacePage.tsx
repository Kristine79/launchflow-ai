import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { Button } from '@/core/ui/button';
import { motion } from 'framer-motion';
import { Store, Globe, Package, ExternalLink, CheckCircle2, Clock, Layers } from 'lucide-react';
import { useLocale } from '@/core/i18n/I18nProvider';

interface MarketplaceConnection {
  id: string;
  name: string;
  icon: 'wildberries' | 'ozon';
  connected: boolean;
  totalProducts: number;
  listed: number;
  apiKey?: string;
}

const DEMO_MARKETPLACES: MarketplaceConnection[] = [
  { id: 'wb', name: 'Wildberries', icon: 'wildberries', connected: true, totalProducts: 12, listed: 8 },
  { id: 'ozon', name: 'Ozon', icon: 'ozon', connected: true, totalProducts: 10, listed: 6 },
];

interface MarketplaceProduct {
  id: string;
  name: string; sku: string; marketplace: string; status: 'listed' | 'pending' | 'error'; price: number; updatedAt: string;
}

const DEMO_PRODUCTS: MarketplaceProduct[] = [
  { id: 'mp1', name: 'Linen Blazer', sku: 'LN-001', marketplace: 'Wildberries', status: 'listed', price: 3890, updatedAt: '2026-12-20' },
  { id: 'mp2', name: 'Silk Dress', sku: 'SK-002', marketplace: 'Wildberries', status: 'listed', price: 4590, updatedAt: '2026-12-19' },
  { id: 'mp3', name: 'Wool Coat', sku: 'WC-003', marketplace: 'Wildberries', status: 'pending', price: 5990, updatedAt: '2026-12-18' },
  { id: 'mp4', name: 'Cashmere Sweater', sku: 'CS-004', marketplace: 'Ozon', status: 'listed', price: 3590, updatedAt: '2026-12-17' },
  { id: 'mp5', name: 'Leather Boots', sku: 'LB-005', marketplace: 'Ozon', status: 'listed', price: 4990, updatedAt: '2026-12-16' },
  { id: 'mp6', name: 'Cotton Trench', sku: 'CT-006', marketplace: 'Ozon', status: 'error', price: 5190, updatedAt: '2026-12-15' },
];

const statusBadge = (status: string) => {
  if (status === 'listed') return { variant: 'success' as const, icon: CheckCircle2 };
  if (status === 'error') return { variant: 'destructive' as const, icon: Clock };
  return { variant: 'warning' as const, icon: Clock };
};

export function MarketplacePage() {
  const { t } = useLocale();

  const totalProducts = DEMO_MARKETPLACES.reduce((s, m) => s + m.totalProducts, 0);
  const activeListings = DEMO_MARKETPLACES.reduce((s, m) => s + m.listed, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t('marketplace.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('marketplace.description')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {DEMO_MARKETPLACES.map((mp) => (
          <motion.div
            key={mp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-muted p-2.5">
                      <Store className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{mp.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Badge variant={mp.connected ? 'success' : 'secondary'} className="text-[10px]">
                          {mp.connected ? t('marketplace.connected') : t('marketplace.disconnected')}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <ExternalLink className="h-3 w-3" />
                    {t('marketplace.productsOn', { name: mp.name })}
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <p className="text-lg font-bold">{mp.totalProducts}</p>
                    <p className="text-[10px] text-muted-foreground">{t('marketplace.totalProducts')}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-500">{mp.listed}</p>
                    <p className="text-[10px] text-muted-foreground">{t('marketplace.listed')}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-yellow-500">{mp.totalProducts - mp.listed}</p>
                    <p className="text-[10px] text-muted-foreground">{t('marketplace.pending')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Layers className="h-4 w-4" />
              {t('marketplace.totalProducts')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalProducts}</p>
            <p className="text-xs text-muted-foreground mt-1">{t('marketplace.totalProducts')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Globe className="h-4 w-4" />
              {t('marketplace.activeListings')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{activeListings}</p>
            <p className="text-xs text-muted-foreground mt-1">{Math.round(activeListings / totalProducts * 100)}% {t('marketplace.listed')}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            <Package className="h-4 w-4 inline mr-1.5" />
            {t('marketplace.productsOn', { name: t('marketplace.wildberries') })} / {t('marketplace.productsOn', { name: t('marketplace.ozon') })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {DEMO_PRODUCTS.map((p) => {
              const sb = statusBadge(p.status);
              const Icon = sb.icon;
              return (
                <div key={p.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg border text-sm">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <Icon className={`h-4 w-4 shrink-0 ${p.status === 'listed' ? 'text-green-500' : p.status === 'error' ? 'text-destructive' : 'text-yellow-500'}`} />
                    <div className="min-w-0">
                      <p className="font-medium truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{p.sku} • {p.marketplace}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 pl-7 sm:pl-0">
                    <span className="text-sm font-mono">{p.price} ₽</span>
                    <Badge variant={sb.variant} className="text-[9px]">{t(`marketplace.${p.status}`)}</Badge>
                    <span className="text-[10px] text-muted-foreground hidden sm:inline">{p.updatedAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
