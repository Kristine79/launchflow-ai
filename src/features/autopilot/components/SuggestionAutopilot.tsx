import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { Button } from '@/core/ui/button';
import { useLocale } from '@/core/i18n/I18nProvider';
import { cn } from '@/lib/utils';
import {
  Check, X, Clock, Lightbulb, Bot,
  Zap, ChevronDown, ChevronUp,
} from 'lucide-react';

interface Suggestion {
  id: string;
  title: string;
  description: string;
  category: 'production' | 'marketplace' | 'content' | 'analytics' | 'customers';
  confidence: number;
  timeEstimate: string;
  status: 'pending' | 'approved' | 'rejected';
}

const INITIAL_SUGGESTIONS: Suggestion[] = [
  { id: 'sug-1', title: 'Ускорить производство платьев', description: 'Перенести 3 товара в приоритет производства для запуска к началу сезона', category: 'production', confidence: 88, timeEstimate: '2 дня', status: 'pending' },
  { id: 'sug-2', title: 'Оптимизировать карточки WB', description: 'Обновить SEO-описания для 15 товаров с низкой конверсией', category: 'marketplace', confidence: 82, timeEstimate: '4 часа', status: 'pending' },
  { id: 'sug-3', title: 'Запустить фотосъёмку Осень 2027', description: 'Запланировать фотосессию для 25 товаров премиум-коллекции', category: 'content', confidence: 91, timeEstimate: '1 день', status: 'pending' },
  { id: 'sug-4', title: 'Ответить на отзывы о размерах', description: 'Подготовить ответы на 8 отзывов о несоответствии размеров', category: 'customers', confidence: 76, timeEstimate: '30 мин', status: 'pending' },
  { id: 'sug-5', title: 'Анализ категории платьев', description: 'Провести глубокий анализ продаж платьев за Q4 2026', category: 'analytics', confidence: 85, timeEstimate: '3 часа', status: 'pending' },
];

const categoryConfig = {
  production: { label: 'Production', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  marketplace: { label: 'Marketplace', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  content: { label: 'Content', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
  analytics: { label: 'Analytics', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  customers: { label: 'Customers', color: 'bg-pink-500/10 text-pink-500 border-pink-500/20' },
};

export function SuggestionAutopilot() {
  const { t } = useLocale();
  const [suggestions, setSuggestions] = useState<Suggestion[]>(INITIAL_SUGGESTIONS);
  const [expanded, setExpanded] = useState(true);

  const pendingCount = suggestions.filter(s => s.status === 'pending').length;
  const autoMode = pendingCount === 0;

  function handleAction(id: string, status: 'approved' | 'rejected') {
    setSuggestions(prev =>
      prev.map(s => s.id === id ? { ...s, status } : s)
    );
  }

  function handleAutoApply() {
    setSuggestions(prev =>
      prev.map(s => s.status === 'pending' ? { ...s, status: 'approved' } : s)
    );
  }

  return (
    <Card className="ai-card overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-success/[0.04] to-transparent pointer-events-none" />
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-[hsl(var(--ai-badge))]" />
          <CardTitle className="text-sm font-medium">Suggestion Autopilot</CardTitle>
          <div className="ml-auto flex items-center gap-2">
            {autoMode ? (
              <Badge variant="success" className="text-[9px] gap-1">
                <Zap className="h-3 w-3" /> Auto
              </Badge>
            ) : (
              <Badge variant="info" className="text-[9px]">
                {pendingCount} pending
              </Badge>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </CardHeader>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CardContent className="space-y-3 pt-0">
              {pendingCount > 0 && (
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAutoApply}
                    className="text-xs gap-1.5"
                  >
                    <Zap className="h-3.5 w-3.5 text-[hsl(var(--ai-badge))]" />
                    Auto-apply all
                  </Button>
                </div>
              )}

              {suggestions.map((suggestion, i) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border p-3.5 transition-all',
                    suggestion.status === 'approved' && 'border-success/30 bg-success/[0.02] opacity-60',
                    suggestion.status === 'rejected' && 'border-destructive/20 bg-destructive/[0.02] opacity-50',
                    suggestion.status === 'pending' && 'border-border/60 bg-muted/20',
                  )}
                >
                  <Lightbulb className={cn(
                    'h-4 w-4 shrink-0 mt-0.5',
                    suggestion.status === 'approved' ? 'text-success' :
                    suggestion.status === 'rejected' ? 'text-destructive' :
                    'text-[hsl(var(--ai-badge))]'
                  )} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={cn(
                        'text-sm font-medium',
                        suggestion.status !== 'pending' && 'line-through text-muted-foreground'
                      )}>
                        {suggestion.title}
                      </p>
                      <span className={cn('text-[9px] rounded border px-1.5 py-0.5 font-medium', categoryConfig[suggestion.category].color)}>
                        {categoryConfig[suggestion.category].label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{suggestion.description}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <Badge variant="info" className="text-[9px]">AI {suggestion.confidence}%</Badge>
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="h-3 w-3" /> {suggestion.timeEstimate}
                      </span>
                    </div>
                  </div>

                  {suggestion.status === 'pending' && (
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => handleAction(suggestion.id, 'approved')}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-success/30 bg-success/5 text-success hover:bg-success/10 transition-colors"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(suggestion.id, 'rejected')}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  {suggestion.status === 'approved' && (
                    <Badge variant="success" className="shrink-0 text-[9px]">Approved</Badge>
                  )}
                  {suggestion.status === 'rejected' && (
                    <Badge variant="outline" className="shrink-0 text-[9px] text-muted-foreground">Rejected</Badge>
                  )}
                </motion.div>
              ))}

              {autoMode && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 mb-3">
                    <Zap className="h-6 w-6 text-success" />
                  </div>
                  <p className="text-sm font-medium">Autopilot Active</p>
                  <p className="text-xs text-muted-foreground mt-1">All suggestions processed. AI will generate new ones as data changes.</p>
                </div>
              )}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
