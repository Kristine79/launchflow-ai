import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { Button } from '@/core/ui/button';
import { Separator } from '@/core/ui/separator';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Store, ShoppingBag, HardDrive, MessageSquare, Puzzle, Globe, Bot, Link2,
  RefreshCw, CheckCircle2, XCircle, Clock, Shield, ChevronRight,
} from 'lucide-react';
import { useLocale } from '@/core/i18n/I18nProvider';
import { cn } from '@/lib/utils';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: typeof Store;
  connected: boolean;
  category: string;
  bgColor: string;
  iconColor: string;
  lastSync?: string;
  apiVersion?: string;
  status: 'active' | 'error' | 'connecting' | 'disconnected';
}

const DEMO_INTEGRATIONS: Integration[] = [
  { id: 'wb', name: 'Wildberries', description: 'Управление товарами, заказами и аналитика', icon: Store, connected: true, category: 'marketplace', bgColor: 'bg-purple-500/10', iconColor: 'text-purple-500', lastSync: '2 мин назад', apiVersion: 'v2.1', status: 'active' },
  { id: 'ozon', name: 'Ozon', description: 'Управление товарами, заказами и аналитика', icon: ShoppingBag, connected: true, category: 'marketplace', bgColor: 'bg-blue-500/10', iconColor: 'text-blue-500', lastSync: '5 мин назад', apiVersion: 'v3.0', status: 'active' },
  { id: 'gdrive', name: 'Google Drive', description: 'Хранение контента и документов', icon: HardDrive, connected: false, category: 'storage', bgColor: 'bg-green-500/10', iconColor: 'text-green-500', apiVersion: 'v4', status: 'disconnected' },
  { id: 'telegram', name: 'Telegram', description: 'Уведомления о заказах и статусах', icon: MessageSquare, connected: false, category: 'messaging', bgColor: 'bg-sky-500/10', iconColor: 'text-sky-500', apiVersion: 'Bot API 7.0', status: 'disconnected' },
  { id: 'slack', name: 'Slack', description: 'Командные уведомления и алерты', icon: Puzzle, connected: true, category: 'messaging', bgColor: 'bg-rose-500/10', iconColor: 'text-rose-500', lastSync: '1 час назад', apiVersion: 'v2', status: 'active' },
  { id: 'notion', name: 'Notion', description: 'База знаний и документация', icon: Globe, connected: true, category: 'knowledge', bgColor: 'bg-neutral-950/10 dark:bg-neutral-200/10', iconColor: 'text-neutral-950 dark:text-neutral-200', lastSync: '10 мин назад', apiVersion: 'v2022-06', status: 'active' },
  { id: 'shopify', name: 'Shopify', description: 'DTC-продажи и синхронизация остатков', icon: Store, connected: false, category: 'ecommerce', bgColor: 'bg-green-600/10', iconColor: 'text-green-600', apiVersion: '2024-01', status: 'disconnected' },
  { id: 'openai', name: 'OpenAI', description: 'AI-генерация контента, описаний и аналитика', icon: Bot, connected: true, category: 'ai', bgColor: 'bg-emerald-500/10', iconColor: 'text-emerald-500', lastSync: '1 мин назад', apiVersion: 'gpt-4o-mini', status: 'active' },
];

const statusConfig = {
  active: { label: 'Active', icon: CheckCircle2, color: 'text-success', bgBadge: 'bg-success/10 border-success/20' },
  error: { label: 'Error', icon: XCircle, color: 'text-destructive', bgBadge: 'bg-destructive/10 border-destructive/20' },
  connecting: { label: 'Connecting', icon: RefreshCw, color: 'text-warning', bgBadge: 'bg-warning/10 border-warning/20' },
  disconnected: { label: 'Disconnected', icon: Link2, color: 'text-muted-foreground', bgBadge: 'bg-muted border-transparent' },
};

const categoryLabels: Record<string, string> = {
  marketplace: 'Marketplace',
  storage: 'Storage',
  messaging: 'Messaging',
  knowledge: 'Knowledge',
  ecommerce: 'E-Commerce',
  ai: 'AI',
};

export function IntegrationsPage() {
  const { t } = useLocale();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const connectedCount = DEMO_INTEGRATIONS.filter(i => i.connected).length;
  const categories = [...new Set(DEMO_INTEGRATIONS.map(i => i.category))];

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

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        <Card className="shadow-[var(--card-shadow)]">
          <CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground">{t('integrations.title')}</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <p className="text-2xl font-bold">{DEMO_INTEGRATIONS.length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-[var(--card-shadow)]">
          <CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground">{t('integrations.activeIntegrations')}</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <p className="text-2xl font-bold text-success">{connectedCount}</p>
          </CardContent>
        </Card>
        <Card className="shadow-[var(--card-shadow)]">
          <CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground">{t('integrations.disconnected')}</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <p className="text-2xl font-bold text-muted-foreground">{DEMO_INTEGRATIONS.length - connectedCount}</p>
          </CardContent>
        </Card>
        <Card className="shadow-[var(--card-shadow)]">
          <CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground">Categories</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <p className="text-2xl font-bold">{categories.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {DEMO_INTEGRATIONS.map((integration, i) => {
          const StatusIcon = statusConfig[integration.status].icon;
          return (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              onMouseEnter={() => setHoveredId(integration.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Card className={cn(
                'h-full transition-all duration-200 shadow-[var(--card-shadow)]',
                'hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-0.5',
                hoveredId === integration.id && 'border-primary/20'
              )}>
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-start gap-3">
                    <div className={cn('rounded-xl p-3 shrink-0', integration.bgColor, integration.iconColor)}>
                      <integration.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm">{integration.name}</p>
                        {integration.connected && (
                          <div className="h-2 w-2 rounded-full bg-success animate-pulse shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Badge variant="outline" className="text-[9px] leading-none">{categoryLabels[integration.category]}</Badge>
                        {integration.apiVersion && (
                          <Badge variant="outline" className="text-[9px] leading-none">API {integration.apiVersion}</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed flex-1">{integration.description}</p>

                  <div className="flex items-center gap-2 mt-3">
                    <div className={cn('flex items-center gap-1.5 rounded-md border px-2 py-1', statusConfig[integration.status].bgBadge)}>
                      <StatusIcon className={cn('h-3 w-3', statusConfig[integration.status].color)} />
                      <span className={cn('text-[10px] font-medium', statusConfig[integration.status].color)}>
                        {statusConfig[integration.status].label}
                      </span>
                    </div>
                    {integration.lastSync && (
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {integration.lastSync}
                      </span>
                    )}
                  </div>

                  <Separator className="my-3" />

                  <div className="flex items-center justify-between">
                    {integration.connected ? (
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3 text-success" />
                        {t('integrations.connected')}
                      </div>
                    ) : (
                      <div />
                    )}
                    <Button
                      variant={integration.connected ? 'outline' : 'default'}
                      size="sm"
                      className={cn('text-xs h-8', integration.connected && 'text-muted-foreground')}
                    >
                      {integration.connected ? t('integrations.disconnect') : t('integrations.connect')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
