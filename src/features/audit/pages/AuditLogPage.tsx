import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { Button } from '@/core/ui/button';
import { Input } from '@/core/ui/input';
import { motion } from 'framer-motion';
import { useLocale } from '@/core/i18n/I18nProvider';
import { cn } from '@/lib/utils';
import {
  Search, Download, Filter, Clock, User, Shield, Globe,
  Activity, History, AlertTriangle, Info, CheckCircle2,
  ChevronDown, ArrowUpDown,
} from 'lucide-react';

interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  entity: string;
  entityId: string;
  fields: string[];
  source: string;
  ip: string;
  severity: 'info' | 'warning' | 'error' | 'success';
}

const today = '2026-12-15T';

const DEMO_AUDIT: AuditEntry[] = [
  { id: 'a1', timestamp: today + '14:32:18', user: 'Анна Смирнова', role: 'product_manager', action: 'Создание', entity: 'Коллекция', entityId: 'Осень 2027', fields: ['Название', 'Сезон', 'Категории'], source: 'Web', ip: '192.168.1.42', severity: 'success' },
  { id: 'a2', timestamp: today + '14:15:42', user: 'Иван Петров', role: 'designer', action: 'Обновление', entity: 'Товар', entityId: 'A-1024', fields: ['Статус', 'Цена'], source: 'Web', ip: '192.168.1.35', severity: 'info' },
  { id: 'a3', timestamp: today + '13:58:03', user: 'Система', role: 'system', action: 'Синхронизация', entity: 'Wildberries', entityId: 'Заказы #890-912', fields: ['Статус заказов', 'Остатки'], source: 'API', ip: '10.0.0.1', severity: 'info' },
  { id: 'a4', timestamp: today + '12:41:27', user: 'Марина Орлова', role: 'content_manager', action: 'Загрузка', entity: 'Фото', entityId: 'Платья Весна 2027', fields: ['Изображения', 'Alt-текст'], source: 'Web', ip: '192.168.1.50', severity: 'success' },
  { id: 'a5', timestamp: today + '11:22:15', user: 'Павел Козлов', role: 'production_manager', action: 'Смена статуса', entity: 'Партия', entityId: 'B-789', fields: ['Статус → В производстве'], source: 'Mobile', ip: '192.168.1.28', severity: 'warning' },
  { id: 'a6', timestamp: today + '10:05:44', user: 'Система', role: 'system', action: 'AI-рекомендация', entity: 'Insights', entityId: 'Executive Report', fields: ['Ценовая оптимизация', 'Риски'], source: 'AI Engine', ip: '10.0.0.2', severity: 'info' },
  { id: 'a7', timestamp: today + '09:30:12', user: 'Елена Маркова', role: 'marketing', action: 'Создание', entity: 'Кампания', entityId: 'WB Premium Dec', fields: ['Бюджет', 'Аудитория', 'Креативы'], source: 'Web', ip: '192.168.1.45', severity: 'success' },
  { id: 'a8', timestamp: '2026-12-14T18:22:38', user: 'Дмитрий Кожин', role: 'employee', action: 'Удаление', entity: 'Черновик', entityId: 'test-collection-v2', fields: ['Все данные'], source: 'Web', ip: '192.168.1.12', severity: 'error' },
  { id: 'a9', timestamp: '2026-12-14T16:45:20', user: 'Анна Смирнова', role: 'product_manager', action: 'Назначение', entity: 'Задача', entityId: 'Фотосессия Осень', fields: ['Исполнитель → Марина Орлова', 'Срок'], source: 'Web', ip: '192.168.1.42', severity: 'warning' },
  { id: 'a10', timestamp: '2026-12-14T15:10:55', user: 'Система', role: 'system', action: 'Интеграция', entity: 'Ozon', entityId: 'API Connection', fields: ['Статус → Connected'], source: 'API', ip: '10.0.0.1', severity: 'success' },
  { id: 'a11', timestamp: '2026-12-14T14:00:00', user: 'Иван Петров', role: 'designer', action: 'Обновление', entity: 'Товар', entityId: 'A-1025', fields: ['Дизайн', 'Цвет'], source: 'Web', ip: '192.168.1.35', severity: 'info' },
  { id: 'a12', timestamp: '2026-12-14T11:33:10', user: 'Павел Козлов', role: 'production_manager', action: 'Обновление', entity: 'Поставщик', entityId: 'Фабрика №7', fields: ['Контактное лицо', 'Телефон'], source: 'Web', ip: '192.168.1.28', severity: 'info' },
];

const severityConfig = {
  success: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10 border-success/20' },
  info: { icon: Info, color: 'text-primary', bg: 'bg-primary/10 border-primary/20' },
  warning: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10 border-warning/20' },
  error: { icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/10 border-destructive/20' },
};

export function AuditLogPage() {
  const { t } = useLocale();
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);

  const filtered = DEMO_AUDIT.filter(entry => {
    const matchesSearch = !search ||
      entry.user.toLowerCase().includes(search.toLowerCase()) ||
      entry.action.toLowerCase().includes(search.toLowerCase()) ||
      entry.entity.toLowerCase().includes(search.toLowerCase()) ||
      entry.entityId.toLowerCase().includes(search.toLowerCase());
    const matchesSeverity = !severityFilter || entry.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t('audit.title')}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t('audit.description')}</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          {t('audit.export')}
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('audit.search')}
            className="pl-9 h-10"
          />
        </div>
        <div className="flex items-center gap-1.5">
          {['info', 'warning', 'error', 'success'].map(sev => (
            <Badge
              key={sev}
              variant={severityFilter === sev ? 'default' : 'outline'}
              className="cursor-pointer text-[10px] capitalize"
              onClick={() => setSeverityFilter(severityFilter === sev ? null : sev)}
            >
              {sev}
            </Badge>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <History className="h-4 w-4" />
              {t('audit.eventLog')}
              <span className="text-muted-foreground font-normal">({filtered.length})</span>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative">
            {filtered.map((entry, i) => {
              const SevIcon = severityConfig[entry.severity].icon;
              const isLast = i === filtered.length - 1;
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className="relative pl-10 pr-4 py-3.5 hover:bg-muted/30 transition-colors group"
                >
                  {!isLast && (
                    <div className="absolute left-[17px] top-10 bottom-0 w-px bg-border" />
                  )}
                  <div className={cn(
                    'absolute left-2.5 top-4 flex h-7 w-7 items-center justify-center rounded-full border-2 bg-card',
                    severityConfig[entry.severity].bg
                  )}>
                    <SevIcon className={cn('h-3 w-3', severityConfig[entry.severity].color)} />
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium">{entry.action}</span>
                        <span className="text-sm text-muted-foreground">—</span>
                        <span className="text-sm">{entry.entity}</span>
                        <Badge variant="outline" className="text-[9px] font-mono">{entry.entityId}</Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground/70 flex-wrap">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" /> {entry.user}
                        </span>
                        <span className="flex items-center gap-1">
                          <Shield className="h-3 w-3" /> {entry.role}
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe className="h-3 w-3" /> {entry.source}
                        </span>
                        <span className="flex items-center gap-1 font-mono text-[10px]">
                          IP: {entry.ip}
                        </span>
                      </div>
                      {entry.fields.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-1.5">
                          {entry.fields.map(f => (
                            <Badge key={f} variant="secondary" className="text-[9px]">{f}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span className="font-mono">{entry.timestamp.replace('T', ' ')}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
