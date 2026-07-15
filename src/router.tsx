import { createBrowserRouter, Navigate } from 'react-router';
import { lazy, Suspense } from 'react';
import { AppLayout } from '@/core/layout/AppLayout';
import { ProtectedRoute } from '@/core/auth/ProtectedRoute';
import { DemoAuth } from '@/core/auth/DemoAuth';
import { Skeleton } from '@/core/ui/skeleton';

const SignInPage = lazy(() => import('@/features/auth/pages/SignInPage').then(m => ({ default: m.SignInPage })));
const SignUpPage = lazy(() => import('@/features/auth/pages/SignUpPage').then(m => ({ default: m.SignUpPage })));
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const CollectionsPage = lazy(() => import('@/features/collections/pages/CollectionsPage').then(m => ({ default: m.CollectionsPage })));
const CollectionDetailPage = lazy(() => import('@/features/collections/pages/CollectionDetailPage').then(m => ({ default: m.CollectionDetailPage })));
const ProductsPage = lazy(() => import('@/features/products/pages/ProductsPage').then(m => ({ default: m.ProductsPage })));
const ProductDetailPage = lazy(() => import('@/features/products/pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const PipelinePage = lazy(() => import('@/features/pipeline/pages/PipelinePage').then(m => ({ default: m.PipelinePage })));
const ReviewsPage = lazy(() => import('@/features/reviews/pages/ReviewsPage').then(m => ({ default: m.ReviewsPage })));
const MarketplacePage = lazy(() => import('@/features/marketplace/pages/MarketplacePage').then(m => ({ default: m.MarketplacePage })));
const ContentPage = lazy(() => import('@/features/content/pages/ContentPage').then(m => ({ default: m.ContentPage })));
const ProductionPage = lazy(() => import('@/features/production/pages/ProductionPage').then(m => ({ default: m.ProductionPage })));
const TasksPage = lazy(() => import('@/features/tasks/pages/TasksPage').then(m => ({ default: m.TasksPage })));
const NotificationsPage = lazy(() => import('@/features/notifications/pages/NotificationsPage').then(m => ({ default: m.NotificationsPage })));
const KnowledgePage = lazy(() => import('@/features/knowledge/pages/KnowledgePage').then(m => ({ default: m.KnowledgePage })));
const InsightsPage = lazy(() => import('@/features/insights/pages/InsightsPage').then(m => ({ default: m.InsightsPage })));
const AnalyticsPage = lazy(() => import('@/features/analytics/pages/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const IntegrationsPage = lazy(() => import('@/features/integrations/pages/IntegrationsPage').then(m => ({ default: m.IntegrationsPage })));
const SettingsPage = lazy(() => import('@/features/settings/pages/SettingsPage').then(m => ({ default: m.SettingsPage })));
const AuditLogPage = lazy(() => import('@/features/audit/pages/AuditLogPage').then(m => ({ default: m.AuditLogPage })));
const ScenarioSimulatorPage = lazy(() => import('@/features/simulator/pages/ScenarioSimulatorPage').then(m => ({ default: m.ScenarioSimulatorPage })));

const AuthSuspense = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><Skeleton className="h-8 w-48" /></div>}>
    {children}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/auth/demo',
    element: <AuthSuspense><DemoAuth /></AuthSuspense>,
  },
  {
    path: '/auth/sign-in',
    element: <AuthSuspense><SignInPage /></AuthSuspense>,
  },
  {
    path: '/auth/sign-up',
    element: <AuthSuspense><SignUpPage /></AuthSuspense>,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'collections', element: <CollectionsPage /> },
      { path: 'collections/:id', element: <CollectionDetailPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:id', element: <ProductDetailPage /> },
      { path: 'pipeline', element: <PipelinePage /> },
      { path: 'reviews', element: <ReviewsPage /> },
      { path: 'marketplace', element: <MarketplacePage /> },
      { path: 'content', element: <ContentPage /> },
      { path: 'production', element: <ProductionPage /> },
      { path: 'tasks', element: <TasksPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'knowledge', element: <KnowledgePage /> },
      { path: 'insights', element: <InsightsPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'integrations', element: <IntegrationsPage /> },
      { path: 'audit-log', element: <AuditLogPage /> },
      { path: 'scenario-simulator', element: <ScenarioSimulatorPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);
