import type { Role } from '@/lib/constants';

export type Permission =
  | 'collections:read'
  | 'collections:write'
  | 'collections:delete'
  | 'products:read'
  | 'products:write'
  | 'products:delete'
  | 'tasks:read'
  | 'tasks:write'
  | 'tasks:delete'
  | 'users:read'
  | 'users:write'
  | 'content:read'
  | 'content:write'
  | 'production:read'
  | 'production:write'
  | 'analytics:read'
  | 'settings:read'
  | 'settings:write';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  owner: ['collections:read', 'collections:write', 'collections:delete', 'products:read', 'products:write', 'products:delete', 'tasks:read', 'tasks:write', 'tasks:delete', 'users:read', 'users:write', 'content:read', 'content:write', 'production:read', 'production:write', 'analytics:read', 'settings:read', 'settings:write'],
  ceo: ['collections:read', 'collections:write', 'products:read', 'products:write', 'tasks:read', 'tasks:write', 'users:read', 'content:read', 'production:read', 'analytics:read', 'settings:read'],
  product_manager: ['collections:read', 'collections:write', 'products:read', 'products:write', 'tasks:read', 'tasks:write', 'content:read', 'production:read', 'analytics:read'],
  designer: ['collections:read', 'products:read', 'products:write', 'tasks:read', 'tasks:write', 'content:read'],
  production_manager: ['products:read', 'production:read', 'production:write', 'tasks:read', 'tasks:write'],
  content_manager: ['products:read', 'content:read', 'content:write', 'tasks:read', 'tasks:write'],
  marketing: ['products:read', 'content:read', 'analytics:read', 'tasks:read', 'tasks:write'],
  employee: ['collections:read', 'products:read', 'tasks:read', 'tasks:write'],
  guest: ['collections:read', 'products:read'],
};
