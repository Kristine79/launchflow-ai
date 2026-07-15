import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { motion } from 'framer-motion';
import { Image, Video, FileText, Sparkles, CheckCircle2, Clock, Circle } from 'lucide-react';
import { useLocale } from '@/core/i18n/I18nProvider';

interface ContentAsset {
  id: string;
  name: string;
  productName: string;
  type: 'photo' | 'video' | 'content';
  status: 'done' | 'in_progress' | 'pending';
  updatedAt: string;
  assignee: string;
}

const DEMO_ASSETS: ContentAsset[] = [
  { id: 'a1', name: 'Пальто — основные фото', productName: 'Wool Coat', type: 'photo', status: 'done', updatedAt: '2026-12-20', assignee: 'Марина' },
  { id: 'a2', name: 'Пальто — детали', productName: 'Wool Coat', type: 'photo', status: 'done', updatedAt: '2026-12-19', assignee: 'Марина' },
  { id: 'a3', name: 'Платье — lookbook', productName: 'Silk Dress', type: 'photo', status: 'in_progress', updatedAt: '2026-12-18', assignee: 'Анна' },
  { id: 'a4', name: 'Пальто — видео-превью', productName: 'Wool Coat', type: 'video', status: 'in_progress', updatedAt: '2026-12-17', assignee: 'Сергей' },
  { id: 'a5', name: 'Блейзер — видео-обзор', productName: 'Linen Blazer', type: 'video', status: 'pending', updatedAt: '2026-12-15', assignee: 'Сергей' },
  { id: 'a6', name: 'Ботинки — описание', productName: 'Leather Boots', type: 'content', status: 'done', updatedAt: '2026-12-20', assignee: 'Елена' },
  { id: 'a7', name: 'Платье — карточка WB', productName: 'Silk Dress', type: 'content', status: 'in_progress', updatedAt: '2026-12-16', assignee: 'Елена' },
  { id: 'a8', name: 'Пиджак — размерная сетка', productName: 'Cotton Trench', type: 'content', status: 'pending', updatedAt: '2026-12-14', assignee: 'Елена' },
];

const typeIcon = (t: string) => {
  if (t === 'photo') return <Image className="h-4 w-4" />;
  if (t === 'video') return <Video className="h-4 w-4" />;
  return <FileText className="h-4 w-4" />;
};

const statusBadge = (s: string) => {
  if (s === 'done') return { variant: 'success' as const, icon: CheckCircle2 };
  if (s === 'in_progress') return { variant: 'warning' as const, icon: Clock };
  return { variant: 'secondary' as const, icon: Circle };
};

export function ContentPage() {
  const { t } = useLocale();

  const total = DEMO_ASSETS.length;
  const photoPercent = Math.round(DEMO_ASSETS.filter(a => a.type === 'photo' && a.status === 'done').length / Math.max(DEMO_ASSETS.filter(a => a.type === 'photo').length, 1) * 100);
  const videoPercent = Math.round(DEMO_ASSETS.filter(a => a.type === 'video' && a.status === 'done').length / Math.max(DEMO_ASSETS.filter(a => a.type === 'video').length, 1) * 100);
  const cardPercent = Math.round(DEMO_ASSETS.filter(a => a.type === 'content' && a.status === 'done').length / Math.max(DEMO_ASSETS.filter(a => a.type === 'content').length, 1) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t('content.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('content.description')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: t('content.assets'), value: total, icon: FileText, color: 'text-blue-500' },
          { label: t('content.photosReady'), value: `${photoPercent}%`, icon: Image, color: 'text-green-500' },
          { label: t('content.videosReady'), value: `${videoPercent}%`, icon: Video, color: 'text-purple-500' },
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
            <CardTitle className="text-sm font-medium">{t('content.aiInsight')}</CardTitle>
            <Badge variant="secondary" className="text-[10px] ml-auto">{t('dashboard.aiPowered')}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t('content.aiSummary', { photoPercent, videoPercent, cardPercent })}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">{t('content.assets')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {DEMO_ASSETS.map((asset) => {
              const sb = statusBadge(asset.status);
              const Icon = sb.icon;
              return (
                <div key={asset.id} className="flex items-center justify-between p-3 rounded-lg border text-sm">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="text-muted-foreground">{typeIcon(asset.type)}</div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{asset.name}</p>
                      <p className="text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-[9px] mr-1">{t(`content.type.${asset.type}`)}</Badge>
                        {asset.productName} • {asset.assignee}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={sb.variant} className="text-[9px] gap-1">
                      <Icon className="h-3 w-3" />
                      {t(`content.status.${asset.status}`)}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">{asset.updatedAt}</span>
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
