import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { motion } from 'framer-motion';
import { Factory, Truck, Package, Star, Circle } from 'lucide-react';
import { useLocale } from '@/core/i18n/I18nProvider';

interface Supplier {
  id: string;
  name: string; contactPerson: string; materialType: string; rating: number; status: 'active' | 'inactive';
}

const DEMO_SUPPLIERS: Supplier[] = [
  { id: 's1', name: 'Moda Fabrics', contactPerson: 'Иван Петров', materialType: 'Ткани', rating: 4.8, status: 'active' },
  { id: 's2', name: 'Luxury Yarns', contactPerson: 'Анна Смирнова', materialType: 'Пряжа', rating: 4.6, status: 'active' },
  { id: 's3', name: 'EcoTextiles', contactPerson: 'Павел Орлов', materialType: 'Натуральные ткани', rating: 4.9, status: 'active' },
  { id: 's4', name: 'LeatherCraft', contactPerson: 'Дмитрий Кожин', materialType: 'Кожа', rating: 4.3, status: 'active' },
  { id: 's5', name: 'DenimCo', contactPerson: 'Максим Джинсов', materialType: 'Деним', rating: 4.1, status: 'inactive' },
];

interface Batch {
  id: string; productName: string; supplierName: string; quantity: number; status: 'planned' | 'in_progress' | 'completed' | 'delayed'; startDate: string; endDate?: string;
}

const DEMO_BATCHES: Batch[] = [
  { id: 'b1', productName: 'Wool Coat', supplierName: 'Moda Fabrics', quantity: 500, status: 'in_progress', startDate: '2026-12-01', endDate: '2027-01-15' },
  { id: 'b2', productName: 'Silk Dress', supplierName: 'Luxury Yarns', quantity: 300, status: 'completed', startDate: '2026-11-15', endDate: '2026-12-20' },
  { id: 'b3', productName: 'Linen Blazer', supplierName: 'EcoTextiles', quantity: 400, status: 'in_progress', startDate: '2026-12-10', endDate: '2027-01-20' },
  { id: 'b4', productName: 'Leather Boots', supplierName: 'LeatherCraft', quantity: 200, status: 'planned', startDate: '2027-01-05', endDate: '2027-02-10' },
  { id: 'b5', productName: 'Cotton Trench', supplierName: 'EcoTextiles', quantity: 350, status: 'delayed', startDate: '2026-11-20', endDate: '2027-01-05' },
];

const batchStatusBadge = (s: string) => {
  if (s === 'completed') return { variant: 'success' as const, icon: Package, dot: 'bg-green-500' };
  if (s === 'in_progress') return { variant: 'warning' as const, icon: Package, dot: 'bg-yellow-500' };
  if (s === 'delayed') return { variant: 'destructive' as const, icon: Package, dot: 'bg-red-500' };
  return { variant: 'secondary' as const, icon: Package, dot: 'bg-muted-foreground/30' };
};

export function ProductionPage() {
  const { t } = useLocale();

  const activeSuppliers = DEMO_SUPPLIERS.filter(s => s.status === 'active').length;
  const totalBatches = DEMO_BATCHES.length;
  const inProduction = DEMO_BATCHES.filter(b => b.status === 'in_progress').length;
  const completed = DEMO_BATCHES.filter(b => b.status === 'completed').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t('production.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('production.description')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: t('production.activeSuppliers'), value: activeSuppliers, icon: Factory, color: 'text-blue-500' },
          { label: t('production.totalBatches'), value: totalBatches, icon: Truck, color: 'text-purple-500' },
          { label: t('production.inProduction'), value: inProduction, icon: Package, color: 'text-yellow-500' },
          { label: t('production.completed'), value: completed, icon: Star, color: 'text-green-500' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card><CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`rounded-lg bg-muted p-2.5 ${stat.color}`}><stat.icon className="h-5 w-5" /></div>
                <div><p className="text-2xl font-bold">{stat.value}</p><p className="text-xs text-muted-foreground">{stat.label}</p></div>
              </div>
            </CardContent></Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><Factory className="h-4 w-4" /> {t('production.suppliers')}</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {DEMO_SUPPLIERS.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-3 rounded-lg border text-sm">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.materialType} • {s.contactPerson}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="text-xs font-mono">{s.rating}</span>
                    </div>
                    <div className={`h-2 w-2 rounded-full ${s.status === 'active' ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
                    <Badge variant={s.status === 'active' ? 'success' : 'secondary'} className="text-[9px]">
                      {t(`production.status.${s.status}`)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><Truck className="h-4 w-4" /> {t('production.batches')}</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {DEMO_BATCHES.map((b) => {
                const sb = batchStatusBadge(b.status);
                return (
                  <div key={b.id} className="p-3 rounded-lg border text-sm">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">{b.productName}</p>
                        <p className="text-xs text-muted-foreground">{b.supplierName} • {b.quantity} шт.</p>
                      </div>
                      <Badge variant={sb.variant} className="text-[9px] gap-1 shrink-0 ml-2">
                        <div className={`h-1.5 w-1.5 rounded-full ${sb.dot}`} />
                        {t(`production.status.${b.status}`)}
                      </Badge>
                    </div>
                    <div className="flex gap-3 mt-1.5 text-[10px] text-muted-foreground">
                      <span>{b.startDate}{b.endDate ? ` → ${b.endDate}` : ''}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
