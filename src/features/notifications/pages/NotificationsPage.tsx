import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { Button } from '@/core/ui/button';
import { motion } from 'framer-motion';
import { Bell, Info, AlertTriangle, CheckCircle2, XCircle, Mail, MessageSquare, Smartphone } from 'lucide-react';
import { useLocale } from '@/core/i18n/I18nProvider';

interface Notification {
  id: string; title: string; message: string; type: 'info' | 'warning' | 'success' | 'error'; read: boolean; channel: string; createdAt: string;
}

const DEMO_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Задача просрочена', message: 'Утверждение цветов осенней коллекции просрочено на 2 дня', type: 'warning', read: false, channel: 'email', createdAt: '2026-12-20 09:15' },
  { id: 'n2', title: 'Сэмплы готовы к забору', message: 'Сэмплы зимней коллекции готовы на фабрике в Стамбуле', type: 'success', read: false, channel: 'telegram', createdAt: '2026-12-20 08:30' },
  { id: 'n3', title: 'Ошибка выгрузки на Ozon', message: 'Не удалось выгрузить карточку товара "Leather Boots" — ошибка формата изображения', type: 'error', read: false, channel: 'push', createdAt: '2026-12-19 23:10' },
  { id: 'n4', title: 'Новый отзыв на Wildberries', message: 'Поступил новый отзыв на товар "Wool Coat" — рейтинг 5★', type: 'info', read: true, channel: 'email', createdAt: '2026-12-19 16:45' },
  { id: 'n5', title: 'Поставка тканей прибыла', message: 'Заказ тканей от Moda Fabrics прибыл на склад', type: 'success', read: true, channel: 'telegram', createdAt: '2026-12-19 14:00' },
  { id: 'n6', title: 'Изменение в расписании', message: 'Фотосессия Fall 2027 перенесена на 2027-01-10', type: 'warning', read: true, channel: 'email', createdAt: '2026-12-18 11:20' },
];

const typeIcon = (t: string) => {
  if (t === 'info') return <Info className="h-4 w-4 text-blue-500" />;
  if (t === 'warning') return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
  if (t === 'success') return <CheckCircle2 className="h-4 w-4 text-green-500" />;
  return <XCircle className="h-4 w-4 text-red-500" />;
};

const channelIcon = (c: string) => {
  if (c === 'email') return <Mail className="h-3 w-3" />;
  if (c === 'telegram') return <MessageSquare className="h-3 w-3" />;
  return <Smartphone className="h-3 w-3" />;
};

export function NotificationsPage() {
  const { t } = useLocale();

  const unread = DEMO_NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t('notifications.title')}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t('notifications.description')}</p>
        </div>
        {unread > 0 && (
          <Button variant="outline" size="sm" className="text-xs gap-1.5">
            <Mail className="h-3 w-3" /> {t('notifications.markAllRead')}
          </Button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: t('notifications.title'), value: DEMO_NOTIFICATIONS.length, icon: Bell, color: 'text-blue-500' },
          { label: t('notifications.totalUnread'), value: unread, icon: Bell, color: 'text-red-500' },
          { label: 'Email', value: DEMO_NOTIFICATIONS.filter(n => n.channel === 'email').length, icon: Mail, color: 'text-purple-500' },
          { label: 'Telegram', value: DEMO_NOTIFICATIONS.filter(n => n.channel === 'telegram').length, icon: MessageSquare, color: 'text-blue-500' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card><CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`rounded-lg bg-muted p-2.5 ${stat.color}`}><stat.icon className="h-5 w-5" /></div>
                <div><p className="text-2xl font-bold">{stat.value}</p><p className="text-xs text-muted-foreground">{stat.label}</p></div>
              </div>
            </CardContent></Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2"><Bell className="h-4 w-4" /> {t('notifications.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          {DEMO_NOTIFICATIONS.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">{t('notifications.noNotifications')}</p>
          ) : (
            <div className="space-y-1">
              {DEMO_NOTIFICATIONS.map((n) => (
                <div key={n.id} className={`flex gap-3 p-3 rounded-lg border text-sm transition-colors ${!n.read ? 'bg-muted/40 border-primary/10' : ''}`}>
                  <div className="mt-0.5">{typeIcon(n.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`font-medium text-sm ${!n.read ? 'text-foreground' : 'text-muted-foreground'}`}>{n.title}</p>
                      {!n.read && <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground/60">
                      <span>{n.createdAt}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">{channelIcon(n.channel)} {n.channel}</span>
                      <Badge variant="outline" className="text-[8px] ml-auto">{t(`notifications.type.${n.type}`)}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
