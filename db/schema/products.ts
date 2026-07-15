import { pgTable, text, timestamp, varchar, doublePrecision, integer } from 'drizzle-orm/pg-core';
import { collections } from './collections';

export const products = pgTable('products', {
  id: text('id').primaryKey(),
  collectionId: text('collection_id').notNull().references(() => collections.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  sku: varchar('sku', { length: 100 }).notNull().unique(),
  status: varchar('status', { length: 50 }).notNull().default('idea'),
  size: varchar('size', { length: 50 }),
  color: varchar('color', { length: 100 }),
  material: varchar('material', { length: 255 }),
  supplier: varchar('supplier', { length: 255 }),
  factory: varchar('factory', { length: 255 }),
  costPrice: doublePrecision('cost_price').default(0),
  recommendedPrice: doublePrecision('recommended_price').default(0),
  healthScore: doublePrecision('health_score').default(100),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
