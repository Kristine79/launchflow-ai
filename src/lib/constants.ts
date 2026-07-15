export const NAV_ITEMS = [
  { labelKey: 'nav.dashboard', href: '/dashboard', icon: 'LayoutDashboard', phase: 3 },
  { labelKey: 'nav.collections', href: '/collections', icon: 'Layers', phase: 2 },
  { labelKey: 'nav.products', href: '/products', icon: 'Shirt', phase: 2 },
  { labelKey: 'nav.pipeline', href: '/pipeline', icon: 'Kanban', phase: 4 },
  { labelKey: 'nav.reviews', href: '/reviews', icon: 'MessageSquare', phase: 5 },
  { labelKey: 'nav.marketplace', href: '/marketplace', icon: 'Store', phase: 5 },
  { labelKey: 'nav.contentStudio', href: '/content', icon: 'Image', phase: 6 },
  { labelKey: 'nav.production', href: '/production', icon: 'Factory', phase: 6 },
  { labelKey: 'nav.tasks', href: '/tasks', icon: 'CheckSquare', phase: 7 },
  { labelKey: 'nav.notifications', href: '/notifications', icon: 'Bell', phase: 7 },
  { labelKey: 'nav.knowledgeBase', href: '/knowledge', icon: 'BookOpen', phase: 7 },
  { labelKey: 'nav.executiveInsights', href: '/insights', icon: 'Brain', phase: 8 },
  { labelKey: 'nav.analytics', href: '/analytics', icon: 'BarChart3', phase: 8 },
  { labelKey: 'nav.integrations', href: '/integrations', icon: 'Puzzle', phase: 8 },
] as const;

export const COLLECTION_STATUSES = ['planning', 'design', 'sampling', 'production', 'content', 'marketplace', 'launched'] as const;
export const PRODUCT_STATUSES = ['idea', 'sketch', 'design', 'sample', 'approval', 'production', 'photo', 'content', 'wildberries', 'ozon', 'launched', 'optimization'] as const;
export const TASK_PRIORITIES = ['low', 'medium', 'high', 'urgent'] as const;
export const ROLES = ['owner', 'ceo', 'product_manager', 'designer', 'production_manager', 'content_manager', 'marketing', 'employee', 'guest'] as const;

export type CollectionStatus = typeof COLLECTION_STATUSES[number];
export type ProductStatus = typeof PRODUCT_STATUSES[number];
export type TaskPriority = typeof TASK_PRIORITIES[number];
export type Role = typeof ROLES[number];

export const NAV_LABEL_KEYS = {
  'Collections': 'collections',
  'Products': 'products',
  'Pipeline': 'pipeline',
  'Reviews': 'reviews',
  'Marketplace': 'marketplace',
  'Content Studio': 'contentStudio',
  'Production': 'production',
  'Tasks': 'tasks',
  'Notifications': 'notifications',
  'Knowledge Base': 'knowledgeBase',
  'Executive Insights': 'executiveInsights',
  'Analytics': 'analytics',
  'Integrations': 'integrations',
} as const;
