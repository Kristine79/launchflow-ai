import { Suspense, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { DemoBanner } from './DemoBanner';
import { ChatWidget } from '@/features/chat/components/ChatWidget';
import { Skeleton } from '@/core/ui/skeleton';
import { initDemoEvents } from '@/core/events';

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
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => { initDemoEvents(); }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className="flex flex-1 flex-col min-w-0">
        <DemoBanner />
        <Header onMenuToggle={() => setMobileOpen(prev => !prev)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Suspense fallback={<PageFallback />}>
            <Outlet />
          </Suspense>
        </main>
        <ChatWidget />
      </div>
    </div>
  );
}
