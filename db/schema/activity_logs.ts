import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const activityLogs = pgTable('activity_logs', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  action: varchar('action', { length: 255 }).notNull(),
  entityType: varchar('entity_type', { length: 50 }).notNull(),
  entityId: text('entity_id').notNull(),
  metadata: text('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
