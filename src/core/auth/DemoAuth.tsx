import { useNavigate } from 'react-router';
import { Button } from '@/core/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/ui/card';
import { useLocale } from '@/core/i18n/I18nProvider';
import { Sparkles } from 'lucide-react';

export function DemoAuth() {
  const navigate = useNavigate();
  const { t } = useLocale();

  const enterDemo = () => {
    sessionStorage.setItem('launchflow-demo', 'true');
    sessionStorage.setItem('launchflow-demo-user', JSON.stringify({
      id: 'demo-owner',
      name: t('demoUser.name'),
      email: t('demoUser.email'),
      role: 'owner',
    }));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">{t('demo.welcome')}</CardTitle>
          <CardDescription>
            {t('demo.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {import.meta.env.VITE_CLERK_PUBLISHABLE_KEY && (
            <>
              <Button className="w-full h-11" onClick={() => navigate('/auth/sign-in')}>
                {t('demo.signIn')}
              </Button>
              <Button className="w-full h-11" variant="outline" onClick={() => navigate('/auth/sign-up')}>
                {t('demo.createAccount')}
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">{t('demo.or')}</span>
                </div>
              </div>
            </>
          )}
          <Button variant="secondary" className="w-full h-11" onClick={enterDemo}>
            {t('demo.enterDemo')}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            {t('demo.exploreDescription')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
