import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  BarChart, Bar,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  BarChart3, DollarSign, ShoppingCart, TrendingUp, Users,
} from 'lucide-react';
import { useLocale } from '@/core/i18n/I18nProvider';

const REVENUE_DATA = [
  { month: 'Июл', revenue: 520000, orders: 145 },
  { month: 'Авг', revenue: 585000, orders: 162 },
  { month: 'Сен', revenue: 490000, orders: 138 },
  { month: 'Окт', revenue: 645000, orders: 175 },
  { month: 'Ноя', revenue: 720000, orders: 198 },
  { month: 'Дек', revenue: 890000, orders: 234 },
];

const CATEGORY_DATA = [
  { name: 'Верхняя одежда', value: 35 },
  { name: 'Платья', value: 25 },
  { name: 'Костюмы', value: 18 },
  { name: 'Аксессуары', value: 12 },
  { name: 'Обувь', value: 10 },
];

const PLATFORM_DATA = [
  { name: 'Wildberries', value: 55 },
  { name: 'Ozon', value: 30 },
  { name: 'Сайт', value: 10 },
  { name: 'Розница', value: 5 },
];

const COLORS = ['#22c55e', '#3b82f6', '#a855f7', '#f59e0b', '#ec4899'];
const PLATFORM_COLORS = ['#8b5cf6', '#06b6d4', '#22c55e', '#f97316'];

export function AnalyticsPage() {
  const { t } = useLocale();

  const kpis = [
    { icon: DollarSign, value: '890 000 ₽', label: t('analytics.totalRevenue'), sub: '+23% за месяц', color: 'text-green-500' },
    { icon: ShoppingCart, value: '3 420 ₽', label: t('analytics.avgOrderValue'), sub: '234 заказов', color: 'text-blue-500' },
    { icon: TrendingUp, value: '8.2%', label: t('analytics.conversionRate'), sub: '+1.4%', color: 'text-purple-500' },
    { icon: Users, value: '1 847', label: t('analytics.activeUsers'), sub: '+12%', color: 'text-yellow-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t('analytics.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('analytics.description')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`rounded-lg bg-muted p-2.5 ${k.color}`}>
                    <k.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{k.value}</p>
                    <p className="text-xs text-muted-foreground">{k.label}</p>
                    <p className="text-[10px] text-muted-foreground/70 mt-0.5">{k.sub}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4" /> {t('analytics.revenueChart')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={REVENUE_DATA}>
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
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} name="Выручка" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-1.5">
              <ShoppingCart className="h-4 w-4" /> {t('analytics.categoryBreakdown')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CATEGORY_DATA} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" width={100} />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {CATEGORY_DATA.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-1.5">
              <Users className="h-4 w-4" /> {t('analytics.platformBreakdown')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PLATFORM_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {PLATFORM_DATA.map((_, idx) => (
                      <Cell key={idx} fill={PLATFORM_COLORS[idx % PLATFORM_COLORS.length]} />
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
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4" /> {t('analytics.revenueChart')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={REVENUE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
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
                  <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Заказы" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
