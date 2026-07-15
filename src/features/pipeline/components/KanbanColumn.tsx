import { useLocale } from '@/core/i18n/I18nProvider';
import { KanbanCard } from './KanbanCard';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  status: string;
  products: Product[];
  isDraggingOver: boolean;
}

export function KanbanColumn({ status, products, isDraggingOver }: KanbanColumnProps) {
  const { t } = useLocale();

  return (
    <div
      className={cn(
        'rounded-xl border bg-muted/30 flex flex-col h-full transition-colors',
        isDraggingOver && 'bg-primary/5 border-primary/30'
      )}
    >
      <div className="flex items-center justify-between px-3 py-2.5 border-b">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t(`products.statusLabel.${status}`)}
        </h3>
        <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
          {products.length}
        </span>
      </div>

      <div className="flex-1 p-2 space-y-2 min-h-[120px]">
        {products.map((product, index) => (
          <KanbanCard key={product.id} product={product} index={index} />
        ))}
        {products.length === 0 && (
          <div className="flex items-center justify-center h-20 text-xs text-muted-foreground/50 text-center">
            {t('pipeline.noProducts')}
          </div>
        )}
      </div>
    </div>
  );
}
