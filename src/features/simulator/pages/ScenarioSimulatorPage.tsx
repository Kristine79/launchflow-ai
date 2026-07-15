import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';

import { Button } from '@/core/ui/button';
import { cn } from '@/lib/utils';
import {
  Zap, TrendingUp, TrendingDown, DollarSign, Layers, Users,
  BarChart3, RefreshCcw, Play, Sparkles,
} from 'lucide-react';

interface ScenarioParam {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  suffix: string;
  value: number;
}

interface ScenarioResult {
  revenue: number;
  cost: number;
  profit: number;
  margin: number;
  collections: number;
  products: number;
}

const DEFAULT_PARAMS: ScenarioParam[] = [
  { key: 'collectionCount', label: 'Коллекций в год', min: 2, max: 12, step: 1, suffix: '', value: 5 },
  { key: 'productsPerCollection', label: 'Товаров на коллекцию', min: 10, max: 100, step: 5, suffix: '', value: 40 },
  { key: 'avgPrice', label: 'Средняя цена ₽', min: 1000, max: 15000, step: 500, suffix: '₽', value: 4500 },
  { key: 'conversionRate', label: 'Конверсия продаж %', min: 1, max: 15, step: 0.5, suffix: '%', value: 4.5 },
  { key: 'marketplaceShare', label: 'Доля маркетплейсов %', min: 20, max: 80, step: 5, suffix: '%', value: 55 },
  { key: 'teamSize', label: 'Размер команды', min: 3, max: 50, step: 1, suffix: 'чел', value: 12 },
];

const SCENARIO_PRESETS = [
  { name: 'Текущий', params: [5, 40, 4500, 4.5, 55, 12] },
  { name: 'Агрессивный рост', params: [8, 60, 5500, 6, 65, 20] },
  { name: 'Премиум сегмент', params: [4, 25, 12000, 3.5, 40, 15] },
  { name: 'Маркетплейсы', params: [6, 50, 3800, 5.5, 75, 14] },
  { name: 'Минимальные затраты', params: [3, 30, 4000, 4, 50, 8] },
];

function calculate(params: number[]): ScenarioResult {
  const [collections, productsPerCol, avgPrice, convRate, mpShare, teamSize] = params;
  const totalProducts = collections * productsPerCol;
  const monthlySales = totalProducts * (convRate / 100) * 200;
  const annualRevenue = monthlySales * avgPrice * 12;
  const avgSalary = 120000;
  const laborCost = teamSize * avgSalary * 12;
  const productionCost = totalProducts * avgPrice * 0.35;
  const marketingCost = annualRevenue * 0.12;
  const operationalCost = annualRevenue * 0.08;
  const totalCost = laborCost + productionCost + marketingCost + operationalCost;
  const profit = annualRevenue - totalCost;
  const margin = annualRevenue > 0 ? (profit / annualRevenue) * 100 : 0;

  return {
    revenue: Math.round(annualRevenue),
    cost: Math.round(totalCost),
    profit: Math.round(profit),
    margin: Math.round(margin * 10) / 10,
    collections,
    products: totalProducts,
  };
}

export function ScenarioSimulatorPage() {
  const [params, setParams] = useState<ScenarioParam[]>(DEFAULT_PARAMS.map(p => ({ ...p })));
  const [result, setResult] = useState<ScenarioResult>(calculate(DEFAULT_PARAMS.map(p => p.value)));
  const [activePreset, setActivePreset] = useState(0);

  function updateParam(index: number, value: number) {
    const newParams = params.map((p, i) => i === index ? { ...p, value } : p);
    setParams(newParams);
    setResult(calculate(newParams.map(p => p.value)));
  }

  function applyPreset(index: number) {
    const preset = SCENARIO_PRESETS[index];
    const newParams = params.map((p, i) => ({ ...p, value: preset.params[i] }));
    setParams(newParams);
    setResult(calculate(newParams.map(p => p.value)));
    setActivePreset(index);
  }

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Scenario Simulator</h1>
        <p className="text-sm text-muted-foreground mt-1">AI-симуляция бизнес-сценариев и прогнозирование результатов</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-[hsl(var(--ai-badge))]" />
                <CardTitle className="text-sm font-medium">Сценарии</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap mb-6">
                {SCENARIO_PRESETS.map((preset, i) => (
                  <Button
                    key={preset.name}
                    variant={activePreset === i ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => applyPreset(i)}
                    className="text-xs"
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>

              <div className="space-y-5">
                {params.map((param, i) => (
                  <div key={param.key}>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-medium">{param.label}</label>
                      <span className="text-xs font-semibold text-[hsl(var(--ai-badge))]">
                        {param.value}{param.suffix}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={param.min}
                      max={param.max}
                      step={param.step}
                      value={param.value}
                      onChange={e => updateParam(i, parseFloat(e.target.value))}
                      className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-muted
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
                        [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-transform
                        [&::-webkit-slider-thumb]:hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="ai-card overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/[0.04] to-transparent pointer-events-none" />
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-[hsl(var(--ai-badge))]" />
                <CardTitle className="text-sm font-medium">Прогноз</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {([
                { icon: DollarSign, label: 'Годовая выручка', value: formatCurrency(result.revenue), color: 'text-success' },
                { icon: TrendingDown, label: 'Расходы', value: formatCurrency(result.cost), color: 'text-destructive' },
                { icon: TrendingUp, label: 'Прибыль', value: formatCurrency(result.profit), color: 'text-[hsl(var(--ai-badge))]' },
                { icon: BarChart3, label: 'Маржа', value: `${result.margin}%`, color: result.margin > 25 ? 'text-success' : 'text-warning' },
                { icon: Layers, label: 'Коллекций', value: String(result.collections), color: 'text-primary' },
                { icon: Users, label: 'Товаров', value: String(result.products), color: 'text-primary' },
              ] as const).map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between rounded-lg bg-muted/30 px-3.5 py-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                  </div>
                  <span className={cn('text-sm font-bold', item.color)}>{item.value}</span>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card className="ai-card">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[hsl(var(--ai-badge))]" />
                <CardTitle className="text-xs font-medium">AI-рекомендация</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {result.margin >= 30 ? (
                <p className="text-xs text-muted-foreground">Модель устойчива. Рекомендуется масштабировать успешные категории.</p>
              ) : result.margin >= 15 ? (
                <p className="text-xs text-muted-foreground">Маржа в допустимых пределах. Оптимизируйте производство для роста.</p>
              ) : (
                <p className="text-xs text-muted-foreground">Маржа ниже нормы. Пересмотрите ценообразование и структуру затрат.</p>
              )}
              <div className="flex items-center gap-2 mt-3">
                <Button size="sm" variant="outline" className="text-xs gap-1">
                  <Play className="h-3 w-3" /> Применить
                </Button>
                <Button size="sm" variant="ghost" className="text-xs gap-1">
                  <RefreshCcw className="h-3 w-3" /> Сбросить
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
