import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { motion } from 'framer-motion';
import { CheckSquare, Clock, AlertTriangle, Sparkles, User, Calendar } from 'lucide-react';
import { useLocale } from '@/core/i18n/I18nProvider';

interface Task {
  id: string; title: string; status: 'todo' | 'in_progress' | 'review' | 'done'; priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string; dueDate: string; collectionName?: string;
}

const DEMO_TASKS: Task[] = [
  { id: 't1', title: 'Утвердить финальные цвета осенней коллекции', status: 'in_progress', priority: 'high', assignee: 'Анна', dueDate: '2026-12-25', collectionName: 'Fall 2027 Premium' },
  { id: 't2', title: 'Подписать договор с поставщиком тканей', status: 'todo', priority: 'urgent', assignee: 'Иван', dueDate: '2026-12-20', collectionName: 'Spring 2028' },
  { id: 't3', title: 'Заказать сэмплы для зимней коллекции', status: 'review', priority: 'medium', assignee: 'Марина', dueDate: '2026-12-28', collectionName: 'Winter 2027' },
  { id: 't4', title: 'Подготовить контент-план для фотосессии', status: 'done', priority: 'medium', assignee: 'Елена', dueDate: '2026-12-15', collectionName: 'Fall 2027 Premium' },
  { id: 't5', title: 'Согласовать бюджет производства', status: 'in_progress', priority: 'high', assignee: 'Сергей', dueDate: '2027-01-05', collectionName: 'Spring 2028' },
  { id: 't6', title: 'Проверить качество пробных образцов', status: 'todo', priority: 'low', assignee: 'Анна', dueDate: '2027-01-10', collectionName: 'Winter 2027' },
  { id: 't7', title: 'Обновить карточки товаров на Ozon', status: 'todo', priority: 'high', assignee: 'Елена', dueDate: '2026-12-22' },
];

const priorityBadge = (p: string) => {
  if (p === 'urgent') return { variant: 'destructive' as const, icon: AlertTriangle, order: 0 };
  if (p === 'high') return { variant: 'warning' as const, icon: AlertTriangle, order: 1 };
  if (p === 'medium') return { variant: 'secondary' as const, icon: Clock, order: 2 };
  return { variant: 'outline' as const, icon: Clock, order: 3 };
};

export function TasksPage() {
  const { t } = useLocale();

  const sorted = [...DEMO_TASKS].sort((a, b) => priorityBadge(a.priority).order - priorityBadge(b.priority).order);
  const total = DEMO_TASKS.length;
  const done = DEMO_TASKS.filter(t => t.status === 'done').length;
  const inProgress = DEMO_TASKS.filter(t => t.status === 'in_progress' || t.status === 'review').length;
  const overdue = DEMO_TASKS.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'done').length;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t('tasks.title')}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t('tasks.description')}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: t('tasks.totalTasks'), value: total, icon: CheckSquare, color: 'text-blue-500' },
          { label: t('tasks.completed'), value: done, icon: CheckSquare, color: 'text-green-500' },
          { label: t('tasks.pending'), value: inProgress, icon: Clock, color: 'text-yellow-500' },
          { label: t('tasks.overdue'), value: overdue, icon: AlertTriangle, color: 'text-red-500' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card><CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`rounded-lg bg-muted p-2.5 ${stat.color}`}><stat.icon className="h-5 w-5" /></div>
                <div><p className="text-2xl font-bold">{stat.value}</p><p className="text-xs text-muted-foreground">{stat.label}</p></div>
              </div>
            </CardContent></Card>
          </motion.div>
        ))}
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-medium">{t('tasks.aiInsight')}</CardTitle>
            <Badge variant="secondary" className="text-[10px] ml-auto">{t('dashboard.aiPowered')}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t('tasks.aiSummary', { completedPercent: Math.round(done / total * 100), overdueCount: overdue })}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2"><CheckSquare className="h-4 w-4" /> {t('tasks.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sorted.map((task) => {
              const pb = priorityBadge(task.priority);
              const Icon = pb.icon;
              return (
                <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border text-sm hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${task.status === 'done' ? 'bg-green-500' : task.status === 'in_progress' ? 'bg-yellow-500' : task.status === 'review' ? 'bg-blue-500' : 'bg-muted-foreground/30'}`} />
                    <div className="min-w-0">
                      <p className={`font-medium truncate ${task.status === 'done' ? 'line-through text-muted-foreground' : ''}`}>{task.title}</p>
                      <p className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        <User className="h-3 w-3" /> {task.assignee}
                        <Calendar className="h-3 w-3 ml-1" /> {task.dueDate}
                        {task.collectionName && <><span>•</span><span>{task.collectionName}</span></>}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <Badge variant={pb.variant} className="text-[9px] gap-1">
                      <Icon className="h-3 w-3" />
                      {t(`tasks.priority.${task.priority}`)}
                    </Badge>
                    <Badge variant="outline" className="text-[9px]">
                      {t(`tasks.status.${task.status}`)}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
