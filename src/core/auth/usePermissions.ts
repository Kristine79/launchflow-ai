import { ROLE_PERMISSIONS, type Role } from '@/types';
import type { Permission } from '@/types/roles';

export function usePermissions() {
  const isDemo = typeof window !== 'undefined' && sessionStorage.getItem('launchflow-demo') === 'true';
  const demoUser = typeof window !== 'undefined'
    ? JSON.parse(sessionStorage.getItem('launchflow-demo-user') || '{}')
    : {};
  const role: Role = isDemo ? (demoUser.role || 'owner') : 'employee';
  const permissions = ROLE_PERMISSIONS[role] || [];

  return {
    role,
    isDemo,
    can: (permission: Permission) => permissions.includes(permission),
    user: isDemo ? demoUser : null,
  };
}
