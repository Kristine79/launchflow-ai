import { pgTable, text, timestamp, varchar, integer, doublePrecision } from 'drizzle-orm/pg-core';
import { products } from './products';

export const reviews = pgTable('reviews', {
  id: text('id').primaryKey(),
  productId: text('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  rating: integer('rating').notNull(),
  content: text('content').notNull(),
  author: varchar('author', { length: 255 }),
  platform: varchar('platform', { length: 50 }).default('website'),
  sentiment: varchar('sentiment', { length: 20 }).default('neutral'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
