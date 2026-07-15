import { Draggable } from '@hello-pangea/dnd';
import { Badge } from '@/core/ui/badge';
import { getScoreColor } from '@/lib/score';
import type { Product } from '@/types';

interface KanbanCardProps {
  product: Product;
  index: number;
}

export function KanbanCard({ product, index }: KanbanCardProps) {
  return (
    <Draggable draggableId={product.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="rounded-lg border bg-card p-3 space-y-1.5 text-sm transition-shadow hover:shadow-sm"
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? 0.85 : 1,
          }}
        >
          <div className="flex items-start justify-between gap-2">
            <p className="font-medium text-xs leading-snug line-clamp-2">{product.name}</p>
            <span className={`text-xs font-mono shrink-0 ${getScoreColor(product.healthScore)}`}>
              {product.healthScore}%
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <span className="font-mono">{product.sku}</span>
            <span>•</span>
            <span>{product.color}</span>
          </div>
          <div className="flex items-center gap-2 pt-0.5">
            <Badge variant="outline" className="text-[9px] px-1 py-0 h-4">
              {product.material}
            </Badge>
          </div>
        </div>
      )}
    </Draggable>
  );
}
