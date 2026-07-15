import { pgTable, text, timestamp, varchar, boolean } from 'drizzle-orm/pg-core';

export const notifications = pgTable('notifications', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  type: varchar('type', { length: 20 }).notNull().default('info'),
  read: boolean('read').default(false),
  channel: varchar('channel', { length: 20 }).default('in_app'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
