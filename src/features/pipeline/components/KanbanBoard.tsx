import { useState, useCallback } from 'react';
import { DragDropContext, type DropResult, Droppable } from '@hello-pangea/dnd';
import { KanbanColumn } from '../components/KanbanColumn';
import { PRODUCT_STATUSES } from '@/lib/constants';
import type { Product } from '@/types';

const DEMO_PRODUCTS: Product[] = [
  { id: 'p1', collectionId: 'c1', name: 'Linen Blazer', sku: 'LN-001', status: 'idea', size: 'XS-XL', color: 'Ecru', material: 'Linen', supplier: 'Moda', factory: 'Co Istanbul', costPrice: 55, recommendedPrice: 189, healthScore: 45, createdAt: '', updatedAt: '' },
  { id: 'p2', collectionId: 'c1', name: 'Silk Dress', sku: 'SK-002', status: 'sketch', size: 'XS-L', color: 'Rose', material: 'Silk', supplier: 'Luxury', factory: 'KnitPro', costPrice: 48, recommendedPrice: 229, healthScore: 30, createdAt: '', updatedAt: '' },
  { id: 'p3', collectionId: 'c1', name: 'Wool Coat', sku: 'WC-003', status: 'design', size: 'S-XL', color: 'Charcoal', material: 'Wool', supplier: 'WoolCo', factory: 'GarmentCo', costPrice: 85, recommendedPrice: 299, healthScore: 55, createdAt: '', updatedAt: '' },
  { id: 'p4', collectionId: 'c1', name: 'Cashmere Sweater', sku: 'CS-004', status: 'sample', size: 'XS-XL', color: 'Burgundy', material: 'Cashmere', supplier: 'Luxury Yarns', factory: 'KnitPro', costPrice: 45, recommendedPrice: 179, healthScore: 68, createdAt: '', updatedAt: '' },
  { id: 'p5', collectionId: 'c2', name: 'Leather Boots', sku: 'LB-005', status: 'approval', size: '36-41', color: 'Tan', material: 'Leather', supplier: 'LeatherCraft', factory: 'ShoeArt', costPrice: 65, recommendedPrice: 249, healthScore: 72, createdAt: '', updatedAt: '' },
  { id: 'p6', collectionId: 'c2', name: 'Cotton Trench', sku: 'CT-006', status: 'production', size: 'S-XL', color: 'Khaki', material: 'Cotton', supplier: 'EcoTextiles', factory: 'SewTech', costPrice: 62, recommendedPrice: 259, healthScore: 82, createdAt: '', updatedAt: '' },
  { id: 'p7', collectionId: 'c2', name: 'Wide Trousers', sku: 'WT-007', status: 'photo', size: 'XS-XL', color: 'Navy', material: 'Crepe', supplier: 'Moda', factory: 'GarmentCo', costPrice: 32, recommendedPrice: 139, healthScore: 88, createdAt: '', updatedAt: '' },
  { id: 'p8', collectionId: 'c3', name: 'Linen Shirt', sku: 'LS-008', status: 'content', size: 'XS-XL', color: 'White', material: 'Linen', supplier: 'EcoTextiles', factory: 'SewTech', costPrice: 28, recommendedPrice: 99, healthScore: 75, createdAt: '', updatedAt: '' },
  { id: 'p9', collectionId: 'c3', name: 'Denim Jacket', sku: 'DJ-009', status: 'wildberries', size: 'S-XL', color: 'Indigo', material: 'Denim', supplier: 'DenimCo', factory: 'Co Istanbul', costPrice: 52, recommendedPrice: 199, healthScore: 90, createdAt: '', updatedAt: '' },
  { id: 'p10', collectionId: 'c3', name: 'Summer Dress', sku: 'SD-010', status: 'launched', size: 'XS-L', color: 'Yellow', material: 'Cotton', supplier: 'Luxury', factory: 'KnitPro', costPrice: 38, recommendedPrice: 149, healthScore: 95, createdAt: '', updatedAt: '' },
];

const PIPELINE_STATUSES = PRODUCT_STATUSES;

function groupByStatus(products: Product[]) {
  const map: Record<string, Product[]> = {};
  for (const s of PIPELINE_STATUSES) map[s] = [];
  for (const p of products) {
    if (map[p.status]) map[p.status].push(p);
  }
  return map;
}

export function KanbanBoard() {
  const [products, setProducts] = useState(DEMO_PRODUCTS);

  const onDragEnd = useCallback((result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    setProducts(prev => {
      const next = prev.map(p =>
        p.id === draggableId ? { ...p, status: destination.droppableId as Product['status'] } : p
      );
      return next;
    });
  }, []);

  const grouped = groupByStatus(products);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-3 overflow-x-auto pb-4 min-h-[60vh]">
        {PIPELINE_STATUSES.map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex-1 min-w-[200px] max-w-[260px]"
              >
                <KanbanColumn
                  status={status}
                  products={grouped[status] || []}
                  isDraggingOver={snapshot.isDraggingOver}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
