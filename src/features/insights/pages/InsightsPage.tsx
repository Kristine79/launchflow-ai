import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  Brain, TrendingUp, Package, Layers, Target, Sparkles, AlertTriangle, Lightbulb,
  TrendingDown, DollarSign, BarChart3,
} from 'lucide-react';
import { useLocale } from '@/core/i18n/I18nProvider';
import { cn } from '@/lib/utils';

const MONTHLY_REVENUE = [
  { month: 'Июл', revenue: 120000, forecast: 125000 },
  { month: 'Авг', revenue: 145000, forecast: 140000 },
  { month: 'Сен', revenue: 110000, forecast: 130000 },
  { month: 'Окт', revenue: 165000, forecast: 160000 },
  { month: 'Ноя', revenue: 190000, forecast: 180000 },
  { month: 'Дек', revenue: 235000, forecast: 220000 },
];

const READINESS_DATA = [
  { name: 'Дизайн', value: 92 },
  { name: 'Производство', value: 65 },
  { name: 'Фото', value: 45 },
  { name: 'Маркетплейс', value: 55 },
  { name: 'Документы', value: 78 },
];

const COLORS = ['#22c55e', '#eab308', '#3b82f6', '#a855f7', '#ec4899'];

type ImpactType = 'gain' | 'loss';

interface Recommendation {
  icon: typeof AlertTriangle;
  color: string;
  bgColor: string;
  borderColor: string;
  title: string;
  description: string;
  risk: 'high' | 'medium' | 'low';
  confidence: number;
  impact: { type: ImpactType; value: string };
  roi: string;
}

const RECOMMENDATIONS: Recommendation[] = [
  {
    icon: AlertTriangle,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    borderColor: 'border-destructive/20',
    title: 'Производство отстаёт',
    description: 'Выполнено только 60% задач по пошиву осенней коллекции. Рекомендуется усилить контроль на 2 недели.',
    risk: 'high',
    confidence: 92,
    impact: { type: 'loss', value: 'до 1.2M ₽' },
    roi: 'Сокращение потерь на 40%',
  },
  {
    icon: Lightbulb,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/20',
    title: 'Оптимизация цен',
    description: 'Анализ конкурентов показывает потенциал роста маржи на 12% при корректировке ценовой политики.',
    risk: 'medium',
    confidence: 78,
    impact: { type: 'gain', value: '+480K ₽' },
    roi: 'ROI 320% за 3 месяца',
  },
  {
    icon: TrendingUp,
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/20',
    title: 'Wildberries: взрывной рост',
    description: 'Продажи на WB выросли на 35%. Увеличение рекламного бюджета на 20% даст дополнительный рост.',
    risk: 'low',
    confidence: 85,
    impact: { type: 'gain', value: '+2.1M ₽' },
    roi: 'ROI 180%',
  },
  {
    icon: DollarSign,
    color: 'text-[hsl(var(--ai-badge))]',
    bgColor: 'bg-[hsl(var(--ai-card-bg))]',
    borderColor: 'border-[hsl(var(--ai-card-border))]',
    title: 'Новый канал: Telegram Shop',
    description: 'AI выявил 340K целевых пользователей в Telegram. Запуск магазина даст приток аудитории 25-34.',
    risk: 'low',
    confidence: 73,
    impact: { type: 'gain', value: '+890K ₽' },
    roi: 'ROI 210%',
  },
];

const riskStyles = {
  high: { label: 'High Risk', variant: 'destructive' as const },
  medium: { label: 'Medium Risk', variant: 'warning' as const },
  low: { label: 'Low Risk', variant: 'success' as const },
};

const RISK_ORDER = ['high', 'medium', 'low'] as const;

export function InsightsPage() {
  const { t } = useLocale();

  const stats = [
    { icon: Package, value: '156', label: t('insights.totalProducts'), color: 'text-blue-500' },
    { icon: Layers, value: '5', label: t('insights.activeCollections'), color: 'text-purple-500' },
    { icon: Target, value: '74%', label: t('insights.avgReadiness'), color: 'text-green-500' },
    { icon: TrendingUp, value: '1.2M ₽', label: t('insights.revenueForecast'), color: 'text-yellow-500' },
  ];

  const sorted = [...RECOMMENDATIONS].sort(
    (a, b) => RISK_ORDER.indexOf(a.risk) - RISK_ORDER.indexOf(b.risk)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t('insights.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('insights.description')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Card className="shadow-[var(--card-shadow)] transition-shadow duration-200 hover:shadow-[var(--card-shadow-hover)]">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={cn('rounded-lg p-2.5 bg-muted', s.color)}>
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold tracking-tight">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="ai-card ai-card-hover">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-[hsl(var(--ai-badge))]" />
            <CardTitle className="text-sm font-medium">{t('insights.executiveSummary')}</CardTitle>
            <Badge variant="info" className="text-[10px] ml-auto">{t('dashboard.aiPowered')}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t('insights.aiSummary', { collectionsActive: 5, productsTotal: 156, avgReadiness: '74', growth: 18 })}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-primary" /> {t('insights.revenueForecast')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MONTHLY_REVENUE}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} name="Факт" />
                  <Line type="monotone" dataKey="forecast" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="Прогноз" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-1.5">
              <Target className="h-4 w-4 text-primary" /> {t('insights.readinessBreakdown')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={READINESS_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {READINESS_DATA.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 shrink-0 ml-2">
                {READINESS_DATA.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-2 text-xs">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-muted-foreground">{d.name}</span>
                    <span className="font-mono font-medium">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-sm font-medium mb-3 flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-[hsl(var(--ai-badge))]" /> {t('insights.recommendations')}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {sorted.map((r, i) => {
            const riskInfo = riskStyles[r.risk];
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className={cn('h-full border-l-[3px] transition-shadow duration-200 hover:shadow-[var(--card-shadow-hover)]', r.borderColor)}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={cn('rounded-lg p-2.5 shrink-0', r.bgColor, r.color)}>
                        <r.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-2.5">
                        <div>
                          <p className="text-sm font-medium">{r.title}</p>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.description}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={riskInfo.variant} className="text-[10px]">{riskInfo.label}</Badge>
                          <Badge variant="info" className="text-[10px]">
                            AI Confidence {r.confidence}%
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            {r.impact.type === 'loss' ? (
                              <TrendingDown className="h-3 w-3 text-destructive" />
                            ) : (
                              <TrendingUp className="h-3 w-3 text-success" />
                            )}
                            <span className={r.impact.type === 'loss' ? 'text-destructive' : 'text-success'}>
                              {r.impact.type === 'loss' ? 'Potential Loss' : 'Potential Gain'}: {r.impact.value}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BarChart3 className="h-3 w-3 text-[hsl(var(--ai-badge))]" />
                            <span className="text-[hsl(var(--ai-badge))]">{r.roi}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
