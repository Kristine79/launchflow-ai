import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const documents = pgTable('documents', {
  id: text('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  type: varchar('type', { length: 100 }).notNull(),
  description: text('description'),
  tags: text('tags').default(''),
  source: varchar('source', { length: 100 }).default('manual'),
  author: varchar('author', { length: 255 }).notNull(),
  fileUrl: text('file_url'),
  collectionId: text('collection_id'),
  productId: text('product_id'),
  metadata: text('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
