import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const comments = pgTable('comments', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  entityType: varchar('entity_type', { length: 50 }).notNull(),
  entityId: text('entity_id').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
