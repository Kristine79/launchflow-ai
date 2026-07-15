import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { DemoBanner } from './DemoBanner';
import { Skeleton } from '@/core/ui/skeleton';

function PageFallback() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-72" />
      <div className="grid gap-4 md:grid-cols-3 mt-6">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
    </div>
  );
}

export function AppLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <DemoBanner />
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Suspense fallback={<PageFallback />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
