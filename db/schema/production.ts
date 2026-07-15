import { pgTable, text, timestamp, varchar, integer } from 'drizzle-orm/pg-core';
import { products } from './products';
import { suppliers } from './suppliers';

export const production = pgTable('production', {
  id: text('id').primaryKey(),
  productId: text('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  supplierId: text('supplier_id').references(() => suppliers.id),
  quantity: integer('quantity').default(0),
  status: varchar('status', { length: 50 }).default('planned'),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
