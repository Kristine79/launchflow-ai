import { pgTable, text, timestamp, varchar, boolean } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
  id: text('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  status: varchar('status', { length: 50 }).notNull().default('todo'),
  priority: varchar('priority', { length: 20 }).notNull().default('medium'),
  assigneeId: text('assignee_id'),
  collectionId: text('collection_id'),
  productId: text('product_id'),
  dueDate: timestamp('due_date'),
  parentId: text('parent_id'),
  completed: boolean('completed').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
