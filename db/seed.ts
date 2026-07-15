import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema';

const db = drizzle(sql, { schema });

async function seed() {
  console.log('Seeding database...');

  // Users
  await db.insert(schema.users).values([
    { id: 'demo-owner', email: 'demo@launchflow.ai', name: 'Alex Morgan', role: 'owner' },
    { id: 'demo-ceo', email: 'ceo@launchflow.ai', name: 'Sarah Chen', role: 'ceo' },
    { id: 'demo-pm', email: 'pm@launchflow.ai', name: 'James Wilson', role: 'product_manager' },
    { id: 'demo-designer', email: 'designer@launchflow.ai', name: 'Maria Garcia', role: 'designer' },
    { id: 'demo-production', email: 'production@launchflow.ai', name: 'David Kim', role: 'production_manager' },
  ]).onConflictDoNothing();

  // Collections
  await db.insert(schema.collections).values([
    { id: 'col-summer-2027', name: 'Summer 2027', season: 'Summer 2027', launchDate: new Date('2027-05-01'), status: 'production', progress: 82, readinessScore: 82 },
    { id: 'col-spring-2027', name: 'Spring 2027 Capsule', season: 'Spring 2027', launchDate: new Date('2027-03-15'), status: 'launched', progress: 100, readinessScore: 96 },
    { id: 'col-fall-2027', name: 'Fall 2027 Premium', season: 'Fall 2027', launchDate: new Date('2027-09-01'), status: 'planning', progress: 15, readinessScore: 54 },
    { id: 'col-winter-2027', name: 'Winter 2027 Collection', season: 'Winter 2027', launchDate: new Date('2027-11-01'), status: 'design', progress: 35, readinessScore: 61 },
    { id: 'col-resort-2027', name: 'Resort 2027', season: 'Resort 2027', launchDate: new Date('2027-07-15'), status: 'sampling', progress: 55, readinessScore: 73 },
  ]).onConflictDoNothing();

  // Products
  await db.insert(schema.products).values([
    { id: 'prod-linen-dress', collectionId: 'col-summer-2027', name: 'Linen Dress', sku: 'LF-S27-001', status: 'production', size: 'S-M-L', color: 'Natural White', material: 'Premium Linen', supplier: 'Italian Fabrics Co.', factory: 'Factory A', costPrice: 45, recommendedPrice: 189, healthScore: 92 },
    { id: 'prod-cotton-blazer', collectionId: 'col-summer-2027', name: 'Cotton Blazer', sku: 'LF-S27-002', status: 'photo', size: 'S-M-L-XL', color: 'Navy Blue', material: 'Organic Cotton', supplier: 'Organic Textiles Ltd.', factory: 'Factory A', costPrice: 65, recommendedPrice: 249, healthScore: 88 },
    { id: 'prod-silk-blouse', collectionId: 'col-summer-2027', name: 'Silk Blouse', sku: 'LF-S27-003', status: 'content', size: 'XS-S-M-L', color: 'Blush Pink', material: 'Mulberry Silk', supplier: 'Silk Road Imports', factory: 'Factory B', costPrice: 55, recommendedPrice: 219, healthScore: 94 },
    { id: 'prod-basic-shirt', collectionId: 'col-summer-2027', name: 'Basic Shirt', sku: 'LF-S27-004', status: 'production', size: 'S-M-L-XL', color: 'White', material: 'Cotton Poplin', supplier: 'Organic Textiles Ltd.', factory: 'Factory A', costPrice: 25, recommendedPrice: 99, healthScore: 78 },
    { id: 'prod-linen-pants', collectionId: 'col-summer-2027', name: 'Linen Pants', sku: 'LF-S27-005', status: 'wildberries', size: 'S-M-L', color: 'Beige', material: 'Premium Linen', supplier: 'Italian Fabrics Co.', factory: 'Factory B', costPrice: 40, recommendedPrice: 169, healthScore: 90 },
  ]).onConflictDoNothing();

  // Suppliers
  await db.insert(schema.suppliers).values([
    { id: 'sup-italian', name: 'Italian Fabrics Co.', contactPerson: 'Marco Rossi', email: 'marco@italianfabrics.com', phone: '+39 123 456 789', materialType: 'Linen, Cotton, Wool', rating: 4.8, status: 'active' },
    { id: 'sup-organic', name: 'Organic Textiles Ltd.', contactPerson: 'Emma Green', email: 'emma@organictextiles.com', phone: '+44 123 456 789', materialType: 'Organic Cotton, Bamboo', rating: 4.5, status: 'active' },
    { id: 'sup-silk', name: 'Silk Road Imports', contactPerson: 'Li Wei', email: 'li@silkroad.com', phone: '+86 123 456 789', materialType: 'Mulberry Silk, Satin', rating: 4.9, status: 'active' },
  ]).onConflictDoNothing();

  // Tasks
  await db.insert(schema.tasks).values([
    { id: 'task-1', title: 'Complete product photography for Linen Dress', status: 'in_progress', priority: 'high', assigneeId: 'demo-designer', collectionId: 'col-summer-2027', productId: 'prod-linen-dress', dueDate: new Date('2027-02-20') },
    { id: 'task-2', title: 'Upload quality certificates', status: 'todo', priority: 'high', assigneeId: 'demo-pm', collectionId: 'col-summer-2027', dueDate: new Date('2027-02-25') },
    { id: 'task-3', title: 'Prepare Wildberries listing', status: 'in_progress', priority: 'medium', assigneeId: 'demo-production', collectionId: 'col-summer-2027', dueDate: new Date('2027-03-01') },
    { id: 'task-4', title: 'Review sample for Cotton Blazer', status: 'review', priority: 'high', assigneeId: 'demo-designer', collectionId: 'col-summer-2027', productId: 'prod-cotton-blazer', dueDate: new Date('2027-02-18') },
    { id: 'task-5', title: 'Finalize pricing for Summer 2027', status: 'todo', priority: 'medium', assigneeId: 'demo-ceo', collectionId: 'col-summer-2027', dueDate: new Date('2027-03-10') },
    { id: 'task-6', title: 'Design lookbook Spring 2027', status: 'done', priority: 'medium', assigneeId: 'demo-designer', collectionId: 'col-spring-2027', dueDate: new Date('2027-01-15') },
    { id: 'task-7', title: 'Source new linen supplier', status: 'in_progress', priority: 'low', assigneeId: 'demo-pm', dueDate: new Date('2027-03-20') },
    { id: 'task-8', title: 'Prepare Ozon card for Linen Pants', status: 'todo', priority: 'medium', assigneeId: 'demo-production', collectionId: 'col-summer-2027', productId: 'prod-linen-pants', dueDate: new Date('2027-02-28') },
  ]).onConflictDoNothing();

  // Notifications
  await db.insert(schema.notifications).values([
    { id: 'notif-1', userId: 'demo-owner', title: 'Production Delay', message: 'Cotton Blazer production is delayed by 4 days', type: 'warning', read: false },
    { id: 'notif-2', userId: 'demo-owner', title: 'Material Low Stock', message: 'Linen fabric is running low — reorder needed', type: 'warning', read: false },
    { id: 'notif-3', userId: 'demo-owner', title: 'Photos Missing', message: '3 products still need photos', type: 'error', read: false },
    { id: 'notif-4', userId: 'demo-owner', title: 'Launch Readiness Update', message: 'Spring 2027 Capsule is 96% ready for launch', type: 'success', read: true },
    { id: 'notif-5', userId: 'demo-owner', title: 'New Reviews Available', message: '734 new reviews — AI analysis ready', type: 'info', read: false },
    { id: 'notif-6', userId: 'demo-owner', title: 'AI Recommendation', message: 'Increase first batch of Linen Dress', type: 'info', read: false },
    { id: 'notif-7', userId: 'demo-owner', title: 'Return Risk Alert', message: 'Basic Shirt has higher than expected return rate', type: 'error', read: false },
    { id: 'notif-8', userId: 'demo-ceo', title: 'Executive Report Ready', message: 'Morning report for today is ready', type: 'info', read: false },
  ]).onConflictDoNothing();

  // Reviews
  await db.insert(schema.reviews).values([
    { id: 'rev-1', productId: 'prod-basic-shirt', rating: 4, content: 'Great basic shirt, fits well. Will buy again.', author: 'Anna K.', platform: 'Wildberries', sentiment: 'positive' },
    { id: 'rev-2', productId: 'prod-basic-shirt', rating: 2, content: 'Runs small, order a size up. Fabric is nice though.', author: 'Elena M.', platform: 'Wildberries', sentiment: 'negative' },
    { id: 'rev-3', productId: 'prod-basic-shirt', rating: 5, content: 'Perfect fit and excellent quality!', author: 'Olga S.', platform: 'Ozon', sentiment: 'positive' },
    { id: 'rev-4', productId: 'prod-silk-blouse', rating: 5, content: 'Beautiful silk blouse, true to size. Love the color!', author: 'Maria L.', platform: 'Wildberries', sentiment: 'positive' },
    { id: 'rev-5', productId: 'prod-silk-blouse', rating: 4, content: 'Elegant design, slightly sheer but works for evening', author: 'Tatiana P.', platform: 'Ozon', sentiment: 'positive' },
    { id: 'rev-6', productId: 'prod-linen-dress', rating: 5, content: 'Perfect summer dress! Linen is high quality.', author: 'Natasha R.', platform: 'Wildberries', sentiment: 'positive' },
    { id: 'rev-7', productId: 'prod-linen-pants', rating: 4, content: 'Comfortable and stylish. Runs a bit long.', author: 'Irina D.', platform: 'Ozon', sentiment: 'neutral' },
    { id: 'rev-8', productId: 'prod-cotton-blazer', rating: 3, content: 'Nice blazer but the sizing is inconsistent', author: 'Svetlana K.', platform: 'Wildberries', sentiment: 'neutral' },
    { id: 'rev-9', productId: 'prod-basic-shirt', rating: 1, content: 'Shrank after first wash. Disappointed.', author: 'Anastasia V.', platform: 'Ozon', sentiment: 'negative' },
    { id: 'rev-10', productId: 'prod-linen-dress', rating: 5, content: 'Got so many compliments! Ordering in another color.', author: 'Daria N.', platform: 'Wildberries', sentiment: 'positive' },
  ]).onConflictDoNothing();

  console.log('Seed completed successfully!');
}

seed()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(() => process.exit(0));
