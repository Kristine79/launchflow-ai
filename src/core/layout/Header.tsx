import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ThemeToggle } from '@/core/theme/ThemeToggle';
import { Button } from '@/core/ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/core/ui/dropdown-menu';
import { CommandPalette } from '@/features/search/components/CommandPalette';
import { useLocale } from '@/core/i18n/I18nProvider';
import { NAV_ITEMS } from '@/lib/constants';
import { Bell, LogOut, Settings, User, Search, Menu } from 'lucide-react';

function useCurrentPage() {
  const { pathname } = useLocation();
  const item = NAV_ITEMS.find(n => pathname.startsWith(n.href));
  return item;
}

interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const navigate = useNavigate();
  const { t } = useLocale();
  const currentPage = useCurrentPage();
  const [searchOpen, setSearchOpen] = useState(false);

  const isDemo = typeof window !== 'undefined' && sessionStorage.getItem('launchflow-demo') === 'true';
  const demoUser = typeof window !== 'undefined'
    ? JSON.parse(sessionStorage.getItem('launchflow-demo-user') || '{}')
    : {};

  const user = isDemo ? demoUser : null;

  const handleSignOut = () => {
    sessionStorage.removeItem('launchflow-demo');
    sessionStorage.removeItem('launchflow-demo-user');
    navigate('/auth/demo');
  };

  const handleSearchShortcut = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setSearchOpen(prev => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleSearchShortcut);
    return () => window.removeEventListener('keydown', handleSearchShortcut);
  }, [handleSearchShortcut]);

  return (
    <>
      <header className="flex h-14 items-center justify-between border-b bg-background px-4 sm:px-6 relative z-50">
        <div className="flex items-center gap-2 min-w-0">
          {onMenuToggle && (
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 md:hidden"
              onClick={onMenuToggle}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          {currentPage && (
            <div className="flex items-center gap-2 text-sm min-w-0">
              <span className="text-muted-foreground font-medium truncate">
                {t(currentPage.labelKey)}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 h-8 px-3 rounded-md border bg-muted/50 text-xs text-muted-foreground hover:bg-muted transition-colors w-48"
          >
            <Search className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{t('header.search')}</span>
            <kbd className="ml-auto flex items-center gap-0.5 rounded border bg-background px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground/70">
              <span className="text-[10px]">⌘</span>K
            </kbd>
          </button>

          <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => setSearchOpen(true)}>
            <Search className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/notifications')}>
            <Bell className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
              3
            </span>
          </Button>

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full bg-primary/10 text-primary hover:bg-primary/20">
                <span className="text-xs font-semibold">AM</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name || t('demoUser.name')}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email || t('demoUser.email')}</p>
                  <p className="text-xs leading-none text-muted-foreground capitalize mt-1">{user?.role?.replace('_', ' ') || t('demoUser.role')}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" /> {t('header.settings')}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" /> {t('header.profile')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" /> {t('header.signOut')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
