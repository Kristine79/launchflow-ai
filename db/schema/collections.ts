import { pgTable, text, timestamp, integer, varchar, doublePrecision } from 'drizzle-orm/pg-core';

export const collections = pgTable('collections', {
  id: text('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  season: varchar('season', { length: 100 }).notNull(),
  launchDate: timestamp('launch_date').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('planning'),
  progress: integer('progress').default(0),
  readinessScore: doublePrecision('readiness_score').default(0),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
