import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { Button } from '@/core/ui/button';
import { Skeleton } from '@/core/ui/skeleton';
import { useLocale } from '@/core/i18n/I18nProvider';
import { decisionEngine } from '@/ai/decision-engine';
import { useNavigate } from 'react-router';
import { cn } from '@/lib/utils';
import { Lightbulb, ArrowRight, Brain, GripVertical, X, Check } from 'lucide-react';

const effortColors: Record<string, string> = {
  low: 'bg-success/10 text-success border-success/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-destructive/10 text-destructive border-destructive/20',
};

const impactColors: Record<string, string> = {
  low: 'bg-muted text-muted-foreground border-border',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-success/10 text-success border-success/20',
};

export function DecisionPanel() {
  const { t } = useLocale();
  const navigate = useNavigate();
  const [decision, setDecision] = useState<Awaited<ReturnType<typeof decisionEngine.decide>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    async function load() {
      const d = await decisionEngine.decide();
      setDecision(d);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <Card className="ai-card">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-36" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </CardContent>
      </Card>
    );
  }

  if (!decision || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={decision.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.4 }}
      >
        <Card className={cn(
          'ai-card ai-card-hover border-l-4 overflow-hidden',
          decision.severity === 'critical' ? 'border-l-destructive' :
          decision.severity === 'high' ? 'border-l-warning' : 'border-l-[hsl(var(--ai-badge))]'
        )}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-[hsl(var(--ai-badge))]" />
                <CardTitle className="text-sm font-medium">AI Decision — {decision.problem}</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={decision.severity === 'critical' ? 'destructive' : decision.severity === 'high' ? 'warning' : 'info'} className="text-[9px] capitalize">
                  {decision.severity === 'critical' ? 'Critical' : decision.severity === 'high' ? 'Priority' : 'Suggestion'}
                </Badge>
                <button onClick={() => setDismissed(true)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{decision.summary}</p>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Lightbulb className="h-3.5 w-3.5 text-[hsl(var(--ai-badge))]" />
                Варианты решений
              </p>
              {decision.options.map((option, i) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/30 p-3.5"
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground/40 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{option.action}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{option.description}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="text-[10px] inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-medium border-transparent bg-[hsl(var(--ai-card-bg))] text-[hsl(var(--ai-badge))]">AI {option.confidence}%</span>
                      <span className={cn('text-[10px] inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-medium', effortColors[option.effort])}>
                        effort: {option.effort}
                      </span>
                      <span className={cn('text-[10px] inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-medium', impactColors[option.impact])}>
                        impact: {option.impact}
                      </span>
                    </div>
                  </div>
                  {option.target && (
                    <Button variant="ghost" size="sm" className="shrink-0 gap-1 text-xs" onClick={() => navigate(option.target!)}>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  )}
                  {option.type === 'task' && (
                    <Button variant="ghost" size="sm" className="shrink-0 gap-1 text-xs">
                      <Check className="h-3 w-3" />
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
