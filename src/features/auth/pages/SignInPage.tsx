import { useNavigate } from 'react-router';
import { Button } from '@/core/ui/button';
import { useLocale } from '@/core/i18n/I18nProvider';

export function SignInPage() {
  const navigate = useNavigate();
  const { t } = useLocale();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-muted-foreground">{t('auth.clerkNotConfigured')}</p>
        <p className="text-sm text-muted-foreground">{t('auth.signInPlaceholder')}</p>
        <Button onClick={() => navigate('/auth/demo')}>{t('demo.enterDemo')}</Button>
      </div>
    </div>
  );
}
