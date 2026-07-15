import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Input } from '@/core/ui/input';
import { Badge } from '@/core/ui/badge';
import { useLocale } from '@/core/i18n/I18nProvider';
import { cn } from '@/lib/utils';
import { Sparkles, Send, Bot, User, AlertTriangle, Lightbulb, Target, BarChart3 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: 'insight' | 'warning' | 'recommendation' | 'analytics' | 'general';
  structured?: {
    title: string;
    items: { label: string; value: string }[];
  };
}

const mockResponses: Record<string, Message> = {
  'выручка': {
    id: 'r1', role: 'assistant', content: '', type: 'analytics',
    structured: {
      title: 'Анализ выручки',
      items: [
        { label: 'Текущая (декабрь)', value: '890 000 ₽' },
        { label: 'Рост к ноябрю', value: '+23%' },
        { label: 'Прогноз на январь', value: '950 000 ₽' },
        { label: 'Средний чек', value: '3 450 ₽' },
        { label: 'Лучшая категория', value: 'Платья (+40%)' },
      ],
    },
  },
  'производство': {
    id: 'r2', role: 'assistant', content: '', type: 'warning',
    structured: {
      title: 'Статус производства',
      items: [
        { label: 'Активных партий', value: '8' },
        { label: 'В производстве', value: '5 (62%)' },
        { label: 'Завершено', value: '2 (25%)' },
        { label: 'С задержкой', value: '1 (13%)' },
        { label: 'Загрузка фабрик', value: '74%' },
      ],
    },
  },
  'коллекция': {
    id: 'r3', role: 'assistant', content: '', type: 'insight',
    structured: {
      title: 'Обзор коллекций',
      items: [
        { label: 'Всего коллекций', value: '5' },
        { label: 'Активных', value: '4' },
        { label: 'Средняя готовность', value: '78%' },
        { label: 'Весна 2027', value: 'Готовность 92%' },
        { label: 'Осень 2027 Премиум', value: 'Готовность 45%' },
      ],
    },
  },
  'wildberries': {
    id: 'r4', role: 'assistant', content: '', type: 'recommendation',
    structured: {
      title: 'Wildberries — анализ',
      items: [
        { label: 'Товаров на WB', value: '95' },
        { label: 'Продано за декабрь', value: '1 240 шт.' },
        { label: 'Выручка WB', value: '420 000 ₽' },
        { label: 'Доля в продажах', value: '47%' },
        { label: 'Потенциал роста', value: '+35%' },
      ],
    },
  },
};

const defaultResponse: Message = {
  id: 'r0', role: 'assistant', content: '', type: 'general',
  structured: {
    title: 'Анализ запроса',
    items: [
      { label: 'Статус', value: 'Запрос обработан' },
      { label: 'Рекомендация', value: 'Уточните параметры для детального анализа' },
      { label: 'AI Confidence', value: '85%' },
    ],
  },
};

const typeConfig = {
  insight: { icon: Lightbulb, color: 'text-[hsl(var(--ai-badge))]', badge: 'AI Insight' },
  warning: { icon: AlertTriangle, color: 'text-warning', badge: 'Warning' },
  recommendation: { icon: Target, color: 'text-success', badge: 'Recommendation' },
  analytics: { icon: BarChart3, color: 'text-primary', badge: 'Analytics' },
  general: { icon: Bot, color: 'text-muted-foreground', badge: 'AI' },
};

export function AskBusiness() {
  const { t } = useLocale();
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q || isLoading) return;

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: q };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    await new Promise(r => setTimeout(r, 800));

    const lower = q.toLowerCase();
    let response: Message;
    if (lower.includes('выручк') || lower.includes('revenue')) {
      response = mockResponses['выручка'];
    } else if (lower.includes('производств') || lower.includes('production') || lower.includes('factory')) {
      response = mockResponses['производство'];
    } else if (lower.includes('коллекци') || lower.includes('collection')) {
      response = mockResponses['коллекция'];
    } else if (lower.includes('wildberries') || lower.includes('wb') || lower.includes('ozon')) {
      response = mockResponses['wildberries'];
    } else {
      response = defaultResponse;
    }

    setMessages(prev => [...prev, response]);
    setIsLoading(false);
  }

  return (
    <Card className="ai-card">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-[hsl(var(--ai-badge))]" />
          <CardTitle className="text-sm font-medium">AI Ask Business</CardTitle>
          <Badge variant="info" className="text-[10px] ml-auto">{t('dashboard.aiPowered')}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="relative">
          <Input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Спросите о бизнесе: выручка, производство, коллекции..."
            className="pr-10 text-sm"
          />
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

        <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
          {messages.length === 0 && (
            <div className="flex items-center gap-3 text-xs text-muted-foreground py-6 px-3">
              <Sparkles className="h-4 w-4 text-[hsl(var(--ai-badge))]" />
              <span>Задайте вопрос — AI проанализирует данные и предоставит структурированный ответ</span>
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'flex gap-3',
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {msg.role === 'assistant' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--ai-card-bg))] border border-[hsl(var(--ai-card-border))]">
                    <Bot className="h-4 w-4 text-[hsl(var(--ai-badge))]" />
                  </div>
                )}

                <div className={cn(
                  'max-w-[85%] rounded-xl p-3.5',
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 border border-border/50'
                )}>
                  {msg.role === 'user' ? (
                    <p className="text-sm">{msg.content}</p>
                  ) : msg.structured ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        {msg.type && typeConfig[msg.type] && (() => {
                          const Icon = typeConfig[msg.type].icon;
                          return <Icon className={cn('h-4 w-4', typeConfig[msg.type].color)} />;
                        })()}
                        <p className="text-sm font-semibold">{msg.structured.title}</p>
                        {msg.type && typeConfig[msg.type] && (
                          <Badge variant="info" className="text-[9px] ml-auto">{typeConfig[msg.type].badge}</Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {msg.structured.items.map((item, i) => (
                          <div key={i} className="flex justify-between items-center rounded-lg bg-background/50 px-3 py-2 text-xs">
                            <span className="text-muted-foreground">{item.label}</span>
                            <span className="font-semibold">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm">{msg.content}</p>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--ai-card-bg))] border border-[hsl(var(--ai-card-border))]">
                <Bot className="h-4 w-4 text-[hsl(var(--ai-badge))]" />
              </div>
              <div className="rounded-xl bg-muted/50 border border-border/50 p-3.5">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
