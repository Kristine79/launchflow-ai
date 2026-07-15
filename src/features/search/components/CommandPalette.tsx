import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocale } from '@/core/i18n/I18nProvider';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/constants';
import {
  Search, Layers, Shirt, LayoutDashboard, FileText, MessageSquare, Star,
  Kanban, MessageSquareMore, Store, Image, Factory, CheckSquare, Bell,
  BookOpen, Brain, BarChart3, Puzzle,
} from 'lucide-react';

const ICON_MAP: Record<string, typeof LayoutDashboard> = {
  LayoutDashboard, Layers, Shirt, Kanban, MessageSquareMore, Store, Image,
  Factory, CheckSquare, Bell, BookOpen, Brain, BarChart3, Puzzle,
};

interface ResultItem {
  type: 'action' | 'nav';
  labelKey: string;
  href: string;
  Icon: typeof LayoutDashboard;
}

const SUGGESTED_ACTIONS: ResultItem[] = [
  { type: 'action', labelKey: 'header.createCollection', Icon: Layers, href: '/collections/new' },
  { type: 'action', labelKey: 'header.createProduct', Icon: Shirt, href: '/products/new' },
  { type: 'action', labelKey: 'header.askAi', Icon: MessageSquare, href: '/insights' },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const navigate = useNavigate();
  const { t } = useLocale();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const navResults: ResultItem[] = NAV_ITEMS
    .filter(item => t(item.labelKey).toLowerCase().includes(query.toLowerCase()))
    .map(n => ({ type: 'nav', labelKey: n.labelKey, Icon: ICON_MAP[n.icon] || LayoutDashboard, href: n.href }));
  const actionResults = SUGGESTED_ACTIONS.filter(a =>
    t(a.labelKey).toLowerCase().includes(query.toLowerCase())
  );

  const results: ResultItem[] = [...actionResults, ...navResults];

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, results.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, 0)); }
      if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        navigate(results[selectedIndex].href);
        onClose();
      }
    };
    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, [open, results, selectedIndex, navigate, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed left-1/2 top-[15%] z-50 w-full max-w-lg -translate-x-1/2">
        <div className="rounded-xl border bg-card shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-4 border-b">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('header.search')}
              className="flex-1 h-12 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              ESC
            </kbd>
          </div>

          <div className="max-h-80 overflow-y-auto p-2">
            {results.length === 0 && (
              <div className="flex flex-col items-center py-8 text-muted-foreground">
                <Search className="h-6 w-6 mb-2 opacity-40" />
                <p className="text-xs">{t('header.searchNoResults')}</p>
              </div>
            )}

            {actionResults.length > 0 && (
              <div className="mb-1">
                <p className="px-2 py-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  {t('header.quickActions')}
                </p>
                {actionResults.map((action, i) => {
                  const idx = results.indexOf(action);
                  return (
                    <button
                      key={action.labelKey}
                      onClick={() => { navigate(action.href); onClose(); }}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                        selectedIndex === idx ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                      )}
                    >
                      <div className="rounded-md bg-primary/10 p-1.5 text-primary">
                        <action.Icon className="h-3.5 w-3.5" />
                      </div>
                      <span>{t(action.labelKey)}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {navResults.length > 0 && (
              <div>
                <p className="px-2 py-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  {t('header.goTo')}
                </p>
                {navResults.map((item, i) => {
                  const IconComp = item.Icon;
                  const idx = results.indexOf(item);
                  return (
                    <button
                      key={item.labelKey}
                      onClick={() => { navigate(item.href); onClose(); }}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                        selectedIndex === idx ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                      )}
                    >
                      <div className="rounded-md bg-muted p-1.5 text-muted-foreground">
                        <IconComp className="h-3.5 w-3.5" />
                      </div>
                      <span>{t(item.labelKey)}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
