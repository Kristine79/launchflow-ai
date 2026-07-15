import { useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/constants';
import { useLocale } from '@/core/i18n/I18nProvider';
import {
  LayoutDashboard, Layers, Shirt, Kanban, MessageSquare, Store,
  Image, Factory, CheckSquare, Bell, BookOpen, Brain, BarChart3,
  Puzzle, History, Zap, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { ScrollArea } from '@/core/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import type { ElementType } from 'react';
import logoSrc from '@/assets/logo.png';

const iconMap: Record<string, ElementType> = {
  LayoutDashboard, Layers, Shirt, Kanban, MessageSquare, Store,
  Image, Factory, CheckSquare, Bell, BookOpen,   Brain, BarChart3,
  Puzzle, History, Zap,
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { t } = useLocale();

  return (
    <aside
      className={cn(
        'relative flex flex-col border-r bg-sidebar-background transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b overflow-hidden"
          >
            <div className="flex items-center justify-center px-4 py-3">
              <img src={logoSrc} alt="LaunchFlow AI" className="w-full h-auto object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollArea className="flex-1 py-2">
        <nav className="space-y-0.5 px-2">
          {NAV_ITEMS.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const isActive = location.pathname.startsWith(item.href);

            return (
              <NavLink
                key={item.href}
                to={item.href}
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
                  {!collapsed && (
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
