import { pgTable, text, timestamp, varchar, doublePrecision } from 'drizzle-orm/pg-core';

export const suppliers = pgTable('suppliers', {
  id: text('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  contactPerson: varchar('contact_person', { length: 255 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  address: text('address'),
  materialType: varchar('material_type', { length: 255 }),
  rating: doublePrecision('rating').default(0),
  status: varchar('status', { length: 20 }).default('active'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
