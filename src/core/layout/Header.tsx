import { useNavigate } from 'react-router';
import { ThemeToggle } from '@/core/theme/ThemeToggle';
import { Button } from '@/core/ui/button';

import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/core/ui/dropdown-menu';
import { useLocale } from '@/core/i18n/I18nProvider';
import { Bell, LogOut, Settings, User } from 'lucide-react';

export function Header() {
  const navigate = useNavigate();
  const { t } = useLocale();
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

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-6 relative z-50">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-medium text-muted-foreground">
          {t('nav.dashboard')}
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/notifications')}>
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
            {t('notifCount')}
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
  );
}
