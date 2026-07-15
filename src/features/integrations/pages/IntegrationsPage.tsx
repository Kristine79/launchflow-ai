import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { Button } from '@/core/ui/button';
import { motion } from 'framer-motion';
import {
  Store, ShoppingBag, HardDrive, MessageSquare, Slack, Puzzle, Globe, Bot,
} from 'lucide-react';
import { useLocale } from '@/core/i18n/I18nProvider';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: typeof Store;
  connected: boolean;
  category: string;
}

const DEMO_INTEGRATIONS: Integration[] = [
  { id: 'wb', name: 'Wildberries', description: 'Управление товарами и заказами', icon: Store, connected: true, category: 'marketplace' },
  { id: 'ozon', name: 'Ozon', description: 'Управление товарами и заказами', icon: ShoppingBag, connected: true, category: 'marketplace' },
  { id: 'gdrive', name: 'Google Drive', description: 'Хранение контента и документов', icon: HardDrive, connected: false, category: 'storage' },
  { id: 'telegram', name: 'Telegram', description: 'Уведомления о заказах и статусах', icon: MessageSquare, connected: false, category: 'messaging' },
  { id: 'slack', name: 'Slack', description: 'Командные уведомления и алерты', icon: Slack, connected: false, category: 'messaging' },
  { id: 'notion', name: 'Notion', description: 'База знаний и документация', icon: Puzzle, connected: true, category: 'knowledge' },
  { id: 'shopify', name: 'Shopify', description: 'DTC-продажи и синхронизация', icon: Globe, connected: false, category: 'ecommerce' },
  { id: 'chatgpt', name: 'ChatGPT', description: 'AI-генерация контента и описаний', icon: Bot, connected: false, category: 'ai' },
];

export function IntegrationsPage() {
  const { t } = useLocale();

  const connectedCount = DEMO_INTEGRATIONS.filter(i => i.connected).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t('integrations.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('integrations.description')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">{t('integrations.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{DEMO_INTEGRATIONS.length}</p>
            <p className="text-xs text-muted-foreground mt-1">{t('integrations.title')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">{t('integrations.activeIntegrations')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-500">{connectedCount}</p>
            <p className="text-xs text-muted-foreground mt-1">{t('integrations.connected')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">{t('integrations.disconnected')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-muted-foreground">{DEMO_INTEGRATIONS.length - connectedCount}</p>
            <p className="text-xs text-muted-foreground mt-1">{t('integrations.disconnected')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Категории</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{new Set(DEMO_INTEGRATIONS.map(i => i.category)).size}</p>
            <p className="text-xs text-muted-foreground mt-1">marketplace / storage / messaging / knowledge / ecommerce / ai</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {DEMO_INTEGRATIONS.map((integration, i) => {
          const Icon = integration.icon;
          return (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <Card className="h-full">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-start gap-3">
                    <div className={`rounded-lg p-2.5 ${integration.connected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm">{integration.name}</p>
                      <Badge variant="outline" className="text-[9px] mt-1">{integration.category}</Badge>
                    </div>
                    <Badge variant={integration.connected ? 'success' : 'secondary'} className="text-[9px] shrink-0">
                      {integration.connected ? t('integrations.connected') : t('integrations.disconnected')}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed flex-1">{integration.description}</p>
                  <Button
                    variant={integration.connected ? 'outline' : 'default'}
                    size="sm"
                    className="w-full mt-4 text-xs"
                  >
                    {integration.connected ? t('integrations.disconnect') : t('integrations.connect')}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
