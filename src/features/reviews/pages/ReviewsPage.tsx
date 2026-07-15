import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { motion } from 'framer-motion';
import { MessageSquare, Star, ThumbsUp, ThumbsDown, Minus, Sparkles } from 'lucide-react';
import { useLocale } from '@/core/i18n/I18nProvider';

interface Review {
  id: string;
  rating: number;
  content: string;
  author: string;
  platform: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  createdAt: string;
}

const DEMO_REVIEWS: Review[] = [
  { id: 'r1', rating: 5, content: 'Прекрасное качество ткани, сидит идеально! Цвет точно как на фото.', author: 'Анна К.', platform: 'Wildberries', sentiment: 'positive', createdAt: '2026-12-18' },
  { id: 'r2', rating: 4, content: 'Хороший пиджак, но размер маломерит. Берите на размер больше.', author: 'Мария С.', platform: 'Wildberries', sentiment: 'positive', createdAt: '2026-12-15' },
  { id: 'r3', rating: 3, content: 'Неплохо, но доставка шла 2 недели. Ткань немного просвечивает.', author: 'Елена В.', platform: 'Ozon', sentiment: 'neutral', createdAt: '2026-12-12' },
  { id: 'r4', rating: 1, content: 'Пришёл бракованный шов. Оформляла возврат, деньги вернули через 10 дней.', author: 'Ольга Д.', platform: 'Wildberries', sentiment: 'negative', createdAt: '2026-12-10' },
  { id: 'r5', rating: 5, content: 'Лучшее пальто в моём гардеробе! Тёплое, лёгкое, очень стильное.', author: 'Дарья М.', platform: 'Ozon', sentiment: 'positive', createdAt: '2026-12-08' },
  { id: 'r6', rating: 4, content: 'Качество отличное, но таблица размеров не совпадает. Пришлось обменять.', author: 'Екатерина П.', platform: 'Wildberries', sentiment: 'neutral', createdAt: '2026-12-05' },
  { id: 'r7', rating: 2, content: 'После первой стирки полинял. Очень расстроена качеством.', author: 'Наталья Р.', platform: 'Ozon', sentiment: 'negative', createdAt: '2026-12-03' },
];

const sentimentIcon = (s: string) => {
  if (s === 'positive') return <ThumbsUp className="h-3 w-3 text-green-500" />;
  if (s === 'negative') return <ThumbsDown className="h-3 w-3 text-red-500" />;
  return <Minus className="h-3 w-3 text-yellow-500" />;
};

export function ReviewsPage() {
  const { t } = useLocale();

  const total = DEMO_REVIEWS.length;
  const avgRating = (DEMO_REVIEWS.reduce((s, r) => s + r.rating, 0) / total).toFixed(1);
  const positive = DEMO_REVIEWS.filter(r => r.sentiment === 'positive').length;
  const neutral = DEMO_REVIEWS.filter(r => r.sentiment === 'neutral').length;
  const negative = DEMO_REVIEWS.filter(r => r.sentiment === 'negative').length;

  const stats = [
    { icon: MessageSquare, value: total, label: t('reviews.totalReviews'), color: 'text-blue-500' },
    { icon: Star, value: avgRating, label: t('reviews.avgRating'), color: 'text-yellow-500' },
    { icon: ThumbsUp, value: `${Math.round(positive / total * 100)}%`, label: t('reviews.positiveShare'), color: 'text-green-500' },
    { icon: ThumbsDown, value: `${Math.round(negative / total * 100)}%`, label: t('reviews.negativeShare'), color: 'text-red-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t('reviews.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('reviews.description')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`rounded-lg bg-muted p-2.5 ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
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
            <Sparkles className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-medium">{t('reviews.aiInsight')}</CardTitle>
            <Badge variant="secondary" className="text-[10px] ml-auto">{t('dashboard.aiPowered')}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t('reviews.aiSummary', { quality: 85, fit: 72, delivery: 15, size: 20 })}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">{t('reviews.recentReviews')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {DEMO_REVIEWS.map((review) => (
              <div key={review.id} className="flex gap-3 p-3 rounded-lg border">
                <div className="flex flex-col items-center gap-1 shrink-0 w-8">
                  {sentimentIcon(review.sentiment)}
                  <span className="text-xs font-mono text-muted-foreground">{review.rating}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium">{review.author}</span>
                    <span>•</span>
                    <span>{review.platform}</span>
                    <span>•</span>
                    <span>{review.createdAt}</span>
                    <Badge variant="outline" className="text-[9px] ml-auto">
                      {t(`reviews.${review.sentiment}`)}
                    </Badge>
                  </div>
                  <p className="text-sm mt-1 leading-relaxed">{review.content}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
