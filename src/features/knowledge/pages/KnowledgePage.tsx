import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { Button } from '@/core/ui/button';
import { Input } from '@/core/ui/input';
import { motion } from 'framer-motion';
import {
  BookOpen, FileText, Sparkles, Tag, FolderOpen, Calendar,
  Search, MessageSquare, ChevronRight, Clock, ArrowRight, Brain,
} from 'lucide-react';
import { useLocale } from '@/core/i18n/I18nProvider';
import { cn } from '@/lib/utils';

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
  { id: 'k7', title: 'Брендбук LaunchFlow', description: 'Фирменный стиль, логотип, цвета, типографика', tags: ['бренд'], category: 'Маркетинг', author: 'Артём Дизайнер', updatedAt: '2026-11-10' },
  { id: 'k8', title: 'Список поставщиков фурнитуры', description: 'Проверенные поставщики пуговиц, молний, этикеток', tags: ['закупки', 'фурнитура'], category: 'Производство', author: 'Иван Петров', updatedAt: '2026-11-05' },
];

const categories = [...new Set(DEMO_DOCS.map(d => d.category))];
const allTags = [...new Set(DEMO_DOCS.flatMap(d => d.tags))];

function DocCard({ doc, index }: { doc: KnowledgeDoc; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="group cursor-pointer"
    >
      <div className="flex items-start justify-between p-3.5 rounded-lg border bg-card text-sm transition-all duration-200 hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-0.5 hover:border-primary/20">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <p className="font-medium truncate">{doc.title}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{doc.description}</p>
          <div className="flex items-center gap-2 mt-2 text-[11px] text-muted-foreground/70">
            <span className="bg-muted px-1.5 py-0.5 rounded">{doc.category}</span>
            <span>•</span>
            <span>{doc.author}</span>
            <Calendar className="h-3 w-3 ml-1" />
            <span>{doc.updatedAt}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 shrink-0 ml-3 max-w-[120px] justify-end">
          {doc.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="outline" className="text-[9px] leading-none">#{tag}</Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function KnowledgePage() {
  const { t } = useLocale();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = DEMO_DOCS.filter(doc => {
    const matchesSearch = !search || doc.title.toLowerCase().includes(search.toLowerCase()) || doc.description.toLowerCase().includes(search.toLowerCase()) || doc.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = !activeCategory || doc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const recommended = DEMO_DOCS.slice(0, 3);
  const recentlyViewed = [...DEMO_DOCS].reverse().slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t('knowledge.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('knowledge.description')}</p>
      </div>

      <Card className="ai-card ai-card-hover">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-[hsl(var(--ai-badge))]" />
            <CardTitle className="text-sm font-medium">{t('knowledge.aiInsight')}</CardTitle>
            <Badge variant="info" className="text-[10px] ml-auto">{t('dashboard.aiPowered')}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t('knowledge.aiSummary', { total: DEMO_DOCS.length, categories: categories.length, lastUpdated: DEMO_DOCS[0].updatedAt })}
          </p>
          <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-[hsl(var(--ai-badge))]" />
              {DEMO_DOCS.length} {t('knowledge.totalDocs')}
            </span>
            <span className="flex items-center gap-1.5">
              <FolderOpen className="h-3.5 w-3.5 text-[hsl(var(--ai-badge))]" />
              {categories.length} {t('knowledge.categoriesCount')}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('knowledge.search')}
            className="pl-9 h-10 bg-card border-muted"
          />
        </div>
        <Button variant="outline" className="gap-2 shrink-0">
          <MessageSquare className="h-4 w-4" />
          {t('knowledge.askAi')}
        </Button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Badge
          variant={activeCategory === null ? 'default' : 'outline'}
          className="cursor-pointer text-[10px] transition-all"
          onClick={() => setActiveCategory(null)}
        >
          {t('common.all')}
        </Badge>
        {categories.map(cat => (
          <Badge
            key={cat}
            variant={activeCategory === cat ? 'default' : 'outline'}
            className="cursor-pointer text-[10px] transition-all"
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
          >
            {cat} • {DEMO_DOCS.filter(d => d.category === cat).length}
          </Badge>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-sm font-medium flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-primary" />
            {t('knowledge.documents')}
            <span className="text-muted-foreground font-normal">({filtered.length})</span>
          </h2>
          {filtered.length > 0 ? (
            <div className="space-y-2">
              {filtered.map((doc, i) => (
                <DocCard key={doc.id} doc={doc} index={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Search className="h-8 w-8 mb-2 opacity-40" />
              <p className="text-sm">{t('knowledge.noResults')}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium flex items-center gap-1.5 text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--ai-badge))]" />
                {t('knowledge.recommended')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-1.5">
              {recommended.map(doc => (
                <div key={doc.id} className="group flex items-start gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer text-xs">
                  <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="font-medium truncate group-hover:text-primary transition-colors">{doc.title}</p>
                    <p className="text-muted-foreground/70 truncate mt-0.5">{doc.category}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {t('knowledge.recentlyViewed')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-1.5">
              {recentlyViewed.map(doc => (
                <div key={doc.id} className="group flex items-start gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer text-xs">
                  <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="font-medium truncate group-hover:text-primary transition-colors">{doc.title}</p>
                    <p className="text-muted-foreground/70 truncate mt-0.5">{doc.updatedAt}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium flex items-center gap-1.5 text-muted-foreground">
                <Tag className="h-3.5 w-3.5" />
                {t('knowledge.tags')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="flex flex-wrap gap-1.5">
                {allTags.slice(0, 8).map(tag => (
                  <Badge key={tag} variant="outline" className="text-[9px] cursor-pointer hover:bg-muted transition-colors">#{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
