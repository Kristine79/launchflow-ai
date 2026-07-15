import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/constants';
import { useLocale } from '@/core/i18n/I18nProvider';
import {
  LayoutDashboard, Layers, Shirt, Kanban, MessageSquare, Store,
  Image, Factory, CheckSquare, Bell, BookOpen, Brain, BarChart3,
  Puzzle, History, Zap, ChevronLeft, ChevronRight, X,
} from 'lucide-react';
import { ScrollArea } from '@/core/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import type { ElementType } from 'react';
import logoSrc from '@/assets/logo.png';

const iconMap: Record<string, ElementType> = {
  LayoutDashboard, Layers, Shirt, Kanban, MessageSquare, Store,
  Image, Factory, CheckSquare, Bell, BookOpen, Brain, BarChart3,
  Puzzle, History, Zap,
};

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < breakpoint
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    setIsMobile(mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { t } = useLocale();
  const isMobile = useIsMobile();

  useEffect(() => {
    onMobileClose();
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const navContent = (
    <nav className="space-y-0.5 px-2">
      {NAV_ITEMS.map((item) => {
        const Icon = iconMap[item.icon] || LayoutDashboard;
        const isActive = location.pathname.startsWith(item.href);

        return (
          <NavLink
            key={item.href}
            to={item.href}
            onClick={() => isMobile && onMobileClose()}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              isActive
                ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                : 'text-sidebar-foreground/70',
              'group relative'
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <AnimatePresence>
              {(!collapsed || isMobile) && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="truncate flex-1"
                >
                  {t(item.labelKey)}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        );
      })}
    </nav>
  );

  const logoBlock = (!collapsed || isMobile) && (
    <div className="border-b overflow-hidden">
      <div className="flex items-center justify-center px-4 py-2">
        <img src={logoSrc} alt="LaunchFlow AI" className="w-3/4 h-auto object-contain" />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-sidebar-background md:hidden"
            >
              <div className="flex items-center justify-between border-b px-4 py-3">
                <img src={logoSrc} alt="LaunchFlow AI" className="h-8 w-auto object-contain" />
                <button
                  onClick={onMobileClose}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-sidebar-accent transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ScrollArea className="flex-1 py-2">
                {navContent}
              </ScrollArea>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <aside
      className={cn(
        'relative hidden md:flex flex-col border-r bg-sidebar-background transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {logoBlock}

      <ScrollArea className="flex-1 py-2">
        {navContent}
      </ScrollArea>

      <div className="border-t p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  );
}
