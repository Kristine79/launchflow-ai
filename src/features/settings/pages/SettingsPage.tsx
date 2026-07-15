import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/ui/card';
import { Button } from '@/core/ui/button';
import { useTheme } from '@/core/theme/ThemeProvider';
import { useLocale } from '@/core/i18n/I18nProvider';

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { t } = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">{t('settings.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('settings.appearanceDesc')}</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>{t('settings.appearance')}</CardTitle>
            <CardDescription>{t('settings.appearanceDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{t('settings.theme')}</p>
                <p className="text-xs text-muted-foreground">{t('settings.themeDesc')}</p>
              </div>
              <div className="flex gap-2">
                <Button variant={theme === 'light' ? 'default' : 'outline'} size="sm" onClick={() => setTheme('light')}>
                  {t('settings.light')}
                </Button>
                <Button variant={theme === 'dark' ? 'default' : 'outline'} size="sm" onClick={() => setTheme('dark')}>
                  {t('settings.dark')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('settings.notifications')}</CardTitle>
            <CardDescription>{t('settings.notificationsDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t('settings.notificationsPlaceholder')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('settings.account')}</CardTitle>
            <CardDescription>{t('settings.accountDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t('settings.accountPlaceholder')}</p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
