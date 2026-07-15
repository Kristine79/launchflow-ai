import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  Brain, TrendingUp, Package, Layers, Target, Sparkles, AlertTriangle, Lightbulb,
} from 'lucide-react';
import { useLocale } from '@/core/i18n/I18nProvider';

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

const RECOMMENDATIONS = [
  { icon: AlertTriangle, title: 'Производство отстаёт', description: 'Выполнено только 60% задач по пошиву осенней коллекции.', priority: 'high' as const },
  { icon: Lightbulb, title: 'Оптимизация цен', description: 'Анализ конкурентов показывает потенциал роста маржи на 12%.', priority: 'medium' as const },
  { icon: TrendingUp, title: 'Wildberries: рост', description: 'Продажи на WB выросли на 35% — увеличьте рекламный бюджет.', priority: 'high' as const },
];

export function InsightsPage() {
  const { t } = useLocale();

  const stats = [
    { icon: Package, value: '156', label: t('insights.totalProducts'), color: 'text-blue-500' },
    { icon: Layers, value: '5', label: t('insights.activeCollections'), color: 'text-purple-500' },
    { icon: Target, value: '74%', label: t('insights.avgReadiness'), color: 'text-green-500' },
    { icon: TrendingUp, value: '1.2M ₽', label: t('insights.revenueForecast'), color: 'text-yellow-500' },
  ];

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
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`rounded-lg bg-muted p-2.5 ${s.color}`}>
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-medium">{t('insights.title')}</CardTitle>
            <Badge variant="secondary" className="text-[10px] ml-auto">{t('dashboard.aiPowered')}</Badge>
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
              <TrendingUp className="h-4 w-4" /> {t('insights.revenueForecast')}
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
              <Target className="h-4 w-4" /> {t('insights.readinessBreakdown')}
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
          <Sparkles className="h-4 w-4 text-primary" /> {t('insights.recommendations')}
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {RECOMMENDATIONS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`rounded-lg p-2 mt-0.5 shrink-0 ${r.priority === 'high' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                      <r.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{r.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
