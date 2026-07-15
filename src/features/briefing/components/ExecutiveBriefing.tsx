import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';

import { Skeleton } from '@/core/ui/skeleton';
import { useLocale } from '@/core/i18n/I18nProvider';
import { agentRegistry } from '@/ai/agents';
import type { AgentAnalysis, AgentRecommendation } from '@/ai/agents';
import { cn } from '@/lib/utils';
import {
  Brain, AlertTriangle, Lightbulb, TrendingUp,
  ChevronDown, Sparkles,
} from 'lucide-react';

const severityConfig = {
  critical: { label: 'Critical', variant: 'destructive' as const, icon: AlertTriangle },
  high: { label: 'High', variant: 'destructive' as const, icon: AlertTriangle },
  medium: { label: 'Medium', variant: 'warning' as const, icon: Lightbulb },
  low: { label: 'Low', variant: 'success' as const, icon: TrendingUp },
};

const SEVERITY_ORDER = ['critical', 'high', 'medium', 'low'] as const;

export function ExecutiveBriefing() {
  const { t } = useLocale();
  const [loading, setLoading] = useState(true);
  const [analyses, setAnalyses] = useState<Map<string, AgentAnalysis>>(new Map());
  const [recommendations, setRecommendations] = useState<Map<string, AgentRecommendation[]>>(new Map());
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const allAnalyses = await agentRegistry.analyzeAll();
      const allRecs = await agentRegistry.recommendAll();
      setAnalyses(allAnalyses);
      setRecommendations(allRecs);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <Card className="ai-card">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-48" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-16" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
        </CardContent>
      </Card>
    );
  }

  const overallScore = agentRegistry.getOverallScore(analyses);
  const overallStatus = agentRegistry.getOverallStatus(analyses);
  const allFindings = agentRegistry.getAllFindings(analyses);

  const sortedFindings = [...allFindings].sort(
    (a, b) => SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity)
  );

  const topCritical = sortedFindings.filter(f => f.severity === 'critical' || f.severity === 'high');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="ai-card ai-card-hover overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-primary/[0.03] to-transparent pointer-events-none" />
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-[hsl(var(--ai-badge))]" />
            <CardTitle className="text-sm font-medium">{t('briefing.title')}</CardTitle>
            <Badge variant="info" className="text-[10px] ml-auto">{t('dashboard.aiPowered')}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-3">
              <div className={cn(
                'flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold border-2',
                overallScore >= 75 ? 'border-success text-success' :
                overallScore >= 50 ? 'border-warning text-warning' :
                'border-destructive text-destructive'
              )}>
                {overallScore}
              </div>
              <div>
                <p className="text-sm font-medium">{t('briefing.companyHealth')}</p>
                <Badge variant={overallStatus === 'healthy' ? 'success' : overallStatus === 'warning' ? 'warning' : 'destructive'} className="text-[10px] mt-0.5 capitalize">
                  {overallStatus}
                </Badge>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              {Array.from(analyses.entries()).map(([id, analysis]) => {
                const agent = agentRegistry.get(id);
                return (
                  <div key={id} className="flex items-center gap-2 text-xs bg-muted/50 rounded-lg px-3 py-2">
                    <div className={cn(
                      'h-2 w-2 rounded-full',
                      analysis.status === 'healthy' ? 'bg-success' :
                      analysis.status === 'warning' ? 'bg-warning' : 'bg-destructive'
                    )} />
                    <span className="font-medium">{agent?.name || id}</span>
                    <span className="text-muted-foreground">{analysis.score}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {topCritical.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <p className="text-xs font-semibold uppercase tracking-wider text-destructive">
                  {t('briefing.criticalIssues')} ({topCritical.length})
                </p>
              </div>
              <div className="space-y-2">
                {topCritical.slice(0, 4).map((finding, i) => {
                  const config = severityConfig[finding.severity === 'critical' ? 'critical' : finding.severity];
                  const isExpanded = expandedIssue === finding.title;
                  return (
                    <motion.div
                      key={finding.title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-lg border border-destructive/20 bg-destructive/[0.02] overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedIssue(isExpanded ? null : finding.title)}
                        className="flex w-full items-center gap-3 p-3.5 text-left"
                      >
                        <config.icon className={cn('h-4 w-4 shrink-0', config.variant === 'destructive' ? 'text-destructive' : 'text-warning')} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{finding.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{finding.description}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge variant={config.variant} className="text-[9px]">{config.label}</Badge>
                          <ChevronDown className={cn('h-3.5 w-3.5 text-muted-foreground transition-transform', isExpanded && 'rotate-180')} />
                        </div>
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-3.5 pb-3.5 pt-0 space-y-2 border-t border-destructive/10">
                              <p className="text-xs text-muted-foreground mt-2">{finding.description}</p>
                              <div className="flex items-center gap-3 text-xs">
                                <Badge variant="info" className="text-[9px]">AI {finding.confidence}%</Badge>
                                <span className="text-destructive">{finding.impact}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--ai-badge))]" />
              {t('briefing.aiRecommendations')}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {Array.from(recommendations.entries()).flatMap(([agentId, recs]) =>
                recs.slice(0, 2).map(rec => (
                  <div key={rec.id} className="flex items-start gap-3 rounded-lg border border-[hsl(var(--ai-card-border))] bg-[hsl(var(--ai-card-bg))] p-3.5">
                    <Lightbulb className="h-4 w-4 text-[hsl(var(--ai-badge))] shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{rec.action}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{rec.reason}</p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <Badge variant="info" className="text-[9px]">{rec.confidence}%</Badge>
                        <span className="text-[10px] text-muted-foreground">{rec.expectedImpact}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
