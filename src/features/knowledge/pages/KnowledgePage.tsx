import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Sparkles, Tag, FolderOpen, Calendar } from 'lucide-react';
import { useLocale } from '@/core/i18n/I18nProvider';

interface KnowledgeDoc {
  id: string; title: string; description: string; tags: string[]; category: string; author: string; updatedAt: string;
}

const DEMO_DOCS: KnowledgeDoc[] = [
  { id: 'k1', title: 'Гайд по закупке тканей', description: 'Порядок заказа, минимальные партии, проверка качества', tags: ['закупки', 'ткани'], category: 'Производство', author: 'Иван Петров', updatedAt: '2026-12-15' },
  { id: 'k2', title: 'Чек-лист запуска коллекции', description: 'Пошаговый план от дизайна до размещения на маркетплейсах', tags: ['запуск', 'коллекции'], category: 'Процессы', author: 'Анна Смирнова', updatedAt: '2026-12-10' },
  { id: 'k3', title: 'Требования к фото Wildberries', description: 'Технические требования к изображениям для WB: размер, фон, формат', tags: ['фото', 'wildberries'], category: 'Маркетплейсы', author: 'Марина Орлова', updatedAt: '2026-12-08' },
  { id: 'k4', title: 'Шаблон договора с фабрикой', description: 'Типовой договор на производство одежды с приложениями', tags: ['договоры', 'производство'], category: 'Юриспруденция', author: 'Павел Козлов', updatedAt: '2026-11-28' },
  { id: 'k5', title: 'Стандарты контроля качества', description: 'Методика QC: проверка швов, ткани, фурнитуры', tags: ['качество', 'qc'], category: 'Производство', author: 'Дмитрий Кожин', updatedAt: '2026-11-20' },
  { id: 'k6', title: 'Продвижение на Ozon', description: 'Стратегия продвижения: отзывы, реклама, акции', tags: ['ozon', 'маркетинг'], category: 'Маркетинг', author: 'Елена Маркова', updatedAt: '2026-11-15' },
];

const categories = [...new Set(DEMO_DOCS.map(d => d.category))];
const allTags = [...new Set(DEMO_DOCS.flatMap(d => d.tags))];

export function KnowledgePage() {
  const { t } = useLocale();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t('knowledge.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('knowledge.description')}</p>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-medium">{t('knowledge.aiInsight')}</CardTitle>
            <Badge variant="secondary" className="text-[10px] ml-auto">{t('dashboard.aiPowered')}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t('knowledge.aiSummary', { total: DEMO_DOCS.length, categories: categories.length, lastUpdated: DEMO_DOCS[0].updatedAt })}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><FolderOpen className="h-4 w-4" /> {t('knowledge.categories')}</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Badge key={cat} variant="secondary" className="text-[10px]">{cat} • {DEMO_DOCS.filter(d => d.category === cat).length}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><Tag className="h-4 w-4" /> {t('knowledge.tags')}</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <Badge key={tag} variant="outline" className="text-[10px]">#{tag}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2"><BookOpen className="h-4 w-4" /> {t('knowledge.documents')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {DEMO_DOCS.map(doc => (
              <div key={doc.id} className="flex items-start justify-between p-3 rounded-lg border text-sm hover:bg-muted/30 transition-colors">
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{doc.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{doc.description}</p>
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] text-muted-foreground">
                    <FileText className="h-3 w-3" />
                    <span>{doc.category}</span>
                    <span>•</span>
                    <span>{doc.author}</span>
                    <Calendar className="h-3 w-3 ml-1" />
                    <span>{doc.updatedAt}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 shrink-0 ml-3 max-w-[140px]">
                  {doc.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-[8px]">#{tag}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
