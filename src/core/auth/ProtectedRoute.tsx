import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const isDemo = typeof window !== 'undefined' && sessionStorage.getItem('launchflow-demo') === 'true';

  if (isDemo) {
    return <>{children}</>;
  }

  if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
    return <Navigate to="/auth/demo" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
