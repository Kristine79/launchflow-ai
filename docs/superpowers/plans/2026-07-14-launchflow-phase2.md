# LaunchFlow AI — Phase 2: Collections & Products

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans.

**Goal:** Build Collections and Products modules with Launch Readiness Score, Product Health Score, AI Summary, and interactive charts.

**Architecture:** Each feature module (`collections/`, `products/`) gets CRUD pages, API hooks via TanStack Query, and chart components using Recharts. Mock AI service provides realistic readiness/health scores.

**Tech Stack:** React 19, TypeScript, Tailwind v4, Recharts, Framer Motion, TanStack Query, shadcn/ui

---

### Task 1: Collections List Page

**Files:**
- Create: `src/features/collections/components/CollectionCard.tsx`
- Create: `src/features/collections/hooks/useCollections.ts`
- Modify: `src/features/collections/pages/CollectionsPage.tsx`

- [ ] **Step 1: Create useCollections hook**

```typescript
// src/features/collections/hooks/useCollections.ts
import { useQuery } from '@tanstack/react-query';
import { collectionsApi } from '@/api/endpoints';

export function useCollections() {
  return useQuery({
    queryKey: ['collections'],
    queryFn: () => collectionsApi.list(),
  });
}

export function useCollection(id: string) {
  return useQuery({
    queryKey: ['collection', id],
    queryFn: () => collectionsApi.get(id),
    enabled: !!id,
  });
}

export function useCollectionReadiness(id: string) {
  return useQuery({
    queryKey: ['collection-readiness', id],
    queryFn: () => collectionsApi.list().then(() => {
      // Use mock AI service directly for demo
      import('@/ai/mock').then(({ aiService }) => aiService.generateReadinessScore(id));
    }),
    enabled: !!id,
  });
}
```

- [ ] **Step 2: Create CollectionCard component**

```typescript
// src/features/collections/components/CollectionCard.tsx
import { Link } from 'react-router';
import { Card, CardContent, CardHeader } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { Collection } from '@/types';

const statusColors: Record<string, 'default' | 'secondary' | 'success' | 'warning' | 'destructive'> = {
  launched: 'success',
  production: 'warning',
  planning: 'secondary',
  design: 'default',
  sampling: 'default',
  content: 'warning',
  marketplace: 'warning',
};

const readinessColor = (score: number) => {
  if (score >= 80) return 'text-success';
  if (score >= 60) return 'text-warning';
  return 'text-destructive';
};

interface CollectionCardProps {
  collection: Collection;
  index: number;
}

export function CollectionCard({ collection, index }: CollectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link to={`/collections/${collection.id}`}>
        <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {collection.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">{collection.season}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${readinessColor(collection.readinessScore)}`}>
                  {collection.readinessScore}%
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <Badge variant={statusColors[collection.status] || 'default'}>
                {collection.status}
              </Badge>
              <span className="text-muted-foreground">
                Launch {formatDate(collection.launchDate)}
              </span>
            </div>
            {/* Progress bar */}
            <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${collection.progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">{collection.productCount || 0} products</span>
              <span className="text-xs text-muted-foreground">{collection.progress}% complete</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
```

- [ ] **Step 3: Rewrite CollectionsPage**

```typescript
// src/features/collections/pages/CollectionsPage.tsx
import { motion } from 'framer-motion';
import { CollectionCard } from '../components/CollectionCard';
import { useCollections } from '../hooks/useCollections';
import { Skeleton } from '@/core/ui/skeleton';

// Demo data fallback for when API is not available
const DEMO_COLLECTIONS = [
  { id: 'col-summer-2027', name: 'Summer 2027', season: 'Summer 2027', launchDate: '2027-05-01', status: 'production', progress: 82, readinessScore: 82, productCount: 5 },
  { id: 'col-spring-2027', name: 'Spring 2027 Capsule', season: 'Spring 2027', launchDate: '2027-03-15', status: 'launched', progress: 100, readinessScore: 96, productCount: 8 },
  { id: 'col-fall-2027', name: 'Fall 2027 Premium', season: 'Fall 2027', launchDate: '2027-09-01', status: 'planning', progress: 15, readinessScore: 54, productCount: 3 },
  { id: 'col-winter-2027', name: 'Winter 2027 Collection', season: 'Winter 2027', launchDate: '2027-11-01', status: 'design', progress: 35, readinessScore: 61, productCount: 4 },
  { id: 'col-resort-2027', name: 'Resort 2027', season: 'Resort 2027', launchDate: '2027-07-15', status: 'sampling', progress: 55, readinessScore: 73, productCount: 6 },
];

export const dynamicCollections = () => DEMO_COLLECTIONS;

export function CollectionsPage() {
  const { data, isLoading } = useCollections();
  const collections = data?.data || DEMO_COLLECTIONS;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Collections</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {collections.length} collections • {collections.filter(c => c.status === 'launched').length} launched
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, i) => (
            <CollectionCard key={collection.id} collection={collection as any} index={i} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
```

---

### Task 2: Circular Progress Gauge Component

**Files:**
- Create: `src/core/ui/circular-progress.tsx`

- [ ] **Step 1: Create CircularProgress component**

```typescript
// src/core/ui/circular-progress.tsx
import { motion } from 'framer-motion';

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function CircularProgress({ value, size = 120, strokeWidth = 8, className }: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const color = value >= 80 ? '#22c55e' : value >= 60 ? '#f59e0b' : '#ef4444';

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold" style={{ color }}>{value}</span>
        <span className="text-xs text-muted-foreground">Ready</span>
      </div>
    </div>
  );
}
```

---

### Task 3: Collection Detail Page — Launch Readiness Score

**Files:**
- Create: `src/features/collections/components/ReadinessRadar.tsx`
- Create: `src/features/collections/components/ReadinessScore.tsx`
- Create: `src/features/collections/components/AiSummary.tsx`
- Create: `src/features/collections/components/AiRecommendations.tsx`
- Create: `src/features/collections/components/CollectionTimeline.tsx`
- Create: `src/features/collections/components/CollectionProducts.tsx`
- Modify: `src/features/collections/pages/CollectionDetailPage.tsx`

- [ ] **Step 1: Create ReadinessRadar chart component**

```typescript
// src/features/collections/components/ReadinessRadar.tsx
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';

interface ReadinessRadarProps {
  data: Array<{ category: string; score: number }>;
}

export function ReadinessRadar({ data }: ReadinessRadarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Readiness Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Score"
              dataKey="score"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.15}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Create ReadinessScore component (circular gauge + categories)**

```typescript
// src/features/collections/components/ReadinessScore.tsx
import { CircularProgress } from '@/core/ui/circular-progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import type { LaunchReadinessScore } from '@/ai/types';

interface ReadinessScoreProps {
  score: LaunchReadinessScore;
}

const categoryLabels: Record<string, string> = {
  design: 'Design', samples: 'Samples', production: 'Production',
  photos: 'Photos', video: 'Video', seo: 'SEO',
  wildberries: 'WB Card', ozon: 'Ozon Card',
  documents: 'Documents', certificates: 'Certificates',
  tasks: 'Tasks', quality: 'Quality', approval: 'Approval',
};

export function ReadinessScore({ score }: ReadinessScoreProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr]">
      <Card>
        <CardHeader className="items-center pb-2">
          <CardTitle className="text-sm font-medium">Launch Readiness</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center pb-6">
          <CircularProgress value={score.overall} size={160} strokeWidth={10} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Category Scores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {Object.entries(score.categories).map(([key, val]) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-24 shrink-0">
                {categoryLabels[key] || key}
              </span>
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${val}%`,
                    backgroundColor: val >= 80 ? '#22c55e' : val >= 60 ? '#f59e0b' : '#ef4444',
                  }}
                />
              </div>
              <span className="text-xs font-mono w-8 text-right">{val}%</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
```

- [ ] **Step 3: Create AiSummary component**

```typescript
// src/features/collections/components/AiSummary.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { Sparkles } from 'lucide-react';

interface AiSummaryProps {
  summary: string;
}

export function AiSummaryCard({ summary }: AiSummaryProps) {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm font-medium">AI Summary</CardTitle>
          <Badge variant="secondary" className="ml-auto text-[10px]">AI-powered</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed">{summary}</p>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 4: Create AiRecommendations component**

```typescript
// src/features/collections/components/AiRecommendations.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { AlertTriangle, CheckCircle2, Info, Lightbulb } from 'lucide-react';
import type { AiRecommendation } from '@/ai/types';

interface AiRecommendationsProps {
  recommendations: AiRecommendation[];
}

const priorityConfig = {
  high: { icon: AlertTriangle, color: 'text-destructive', badge: 'destructive' as const },
  medium: { icon: Info, color: 'text-warning', badge: 'warning' as const },
  low: { icon: Lightbulb, color: 'text-muted-foreground', badge: 'secondary' as const },
};

export function AiRecommendations({ recommendations }: AiRecommendationsProps) {
  if (!recommendations.length) {
    return (
      <Card>
        <CardContent className="flex items-center gap-2 py-8 text-sm text-muted-foreground justify-center">
          <CheckCircle2 className="h-4 w-4 text-success" />
          No recommendations — everything looks good
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">AI Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((rec) => {
          const config = priorityConfig[rec.priority];
          const Icon = config.icon;
          return (
            <div key={rec.id} className="flex gap-3 p-3 rounded-lg border bg-card">
              <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${config.color}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{rec.title}</p>
                  <Badge variant={config.badge} className="text-[10px]">{rec.priority}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{rec.description}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 5: Create CollectionTimeline component**

```typescript
// src/features/collections/components/CollectionTimeline.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';

const timelineEvents = [
  { date: '2026-09-15', event: 'Design phase started', status: 'completed' },
  { date: '2026-10-20', event: 'First samples received', status: 'completed' },
  { date: '2026-11-10', event: 'Production started', status: 'completed' },
  { date: '2027-01-15', event: 'Photography completed', status: 'in_progress' },
  { date: '2027-02-01', event: 'Content creation', status: 'pending' },
  { date: '2027-03-01', event: 'Wildberries listing', status: 'pending' },
  { date: '2027-05-01', event: 'Launch date', status: 'pending' },
];

export function CollectionTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {timelineEvents.map((event, i) => (
            <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
              {i < timelineEvents.length - 1 && (
                <div className="absolute left-[7px] top-4 bottom-0 w-px bg-border" />
              )}
              <div className={`mt-1.5 h-3.5 w-3.5 rounded-full border-2 shrink-0 ${
                event.status === 'completed' ? 'bg-success border-success' :
                event.status === 'in_progress' ? 'bg-primary border-primary' :
                'bg-background border-muted-foreground/30'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm">{event.event}</p>
                <p className="text-xs text-muted-foreground">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 6: Create CollectionProducts component**

```typescript
// src/features/collections/components/CollectionProducts.tsx
import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import type { Product } from '@/types';

interface CollectionProductsProps {
  products: Product[];
}

export function CollectionProducts({ products }: CollectionProductsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Products ({products.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.sku} • {product.color}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Badge variant="outline" className="text-[10px]">{product.status}</Badge>
                  <span className={`text-sm font-mono ${
                    product.healthScore >= 80 ? 'text-success' : product.healthScore >= 60 ? 'text-warning' : 'text-destructive'
                  }`}>
                    {product.healthScore}%
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 7: Rewrite CollectionDetailPage**

```typescript
// src/features/collections/pages/CollectionDetailPage.tsx
import { useParams } from 'react-router';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ReadinessScore } from '../components/ReadinessScore';
import { ReadinessRadar } from '../components/ReadinessRadar';
import { AiSummaryCard } from '../components/AiSummary';
import { AiRecommendations } from '../components/AiRecommendations';
import { CollectionTimeline } from '../components/CollectionTimeline';
import { CollectionProducts } from '../components/CollectionProducts';
import { Button } from '@/core/ui/button';
import { Badge } from '@/core/ui/badge';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { aiService } from '@/ai/mock';
import type { LaunchReadinessScore } from '@/ai/types';

const DEMO_COLLECTIONS = {
  'col-summer-2027': { id: 'col-summer-2027', name: 'Summer 2027', season: 'Summer 2027', launchDate: '2027-05-01', status: 'production', progress: 82 },
  'col-spring-2027': { id: 'col-spring-2027', name: 'Spring 2027 Capsule', season: 'Spring 2027', launchDate: '2027-03-15', status: 'launched', progress: 100 },
  'col-fall-2027': { id: 'col-fall-2027', name: 'Fall 2027 Premium', season: 'Fall 2027', launchDate: '2027-09-01', status: 'planning', progress: 15 },
  'col-winter-2027': { id: 'col-winter-2027', name: 'Winter 2027 Collection', season: 'Winter 2027', launchDate: '2027-11-01', status: 'design', progress: 35 },
  'col-resort-2027': { id: 'col-resort-2027', name: 'Resort 2027', season: 'Resort 2027', launchDate: '2027-07-15', status: 'sampling', progress: 55 },
};

const DEMO_PRODUCTS: Record<string, any[]> = {
  'col-summer-2027': [
    { id: 'prod-linen-dress', name: 'Linen Dress', sku: 'LF-S27-001', status: 'production', color: 'Natural White', healthScore: 92 },
    { id: 'prod-cotton-blazer', name: 'Cotton Blazer', sku: 'LF-S27-002', status: 'photo', color: 'Navy Blue', healthScore: 88 },
    { id: 'prod-silk-blouse', name: 'Silk Blouse', sku: 'LF-S27-003', status: 'content', color: 'Blush Pink', healthScore: 94 },
    { id: 'prod-basic-shirt', name: 'Basic Shirt', sku: 'LF-S27-004', status: 'production', color: 'White', healthScore: 78 },
    { id: 'prod-linen-pants', name: 'Linen Pants', sku: 'LF-S27-005', status: 'wildberries', color: 'Beige', healthScore: 90 },
  ],
};

export function CollectionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [readiness, setReadiness] = useState<LaunchReadinessScore | null>(null);

  const collection = id ? DEMO_COLLECTIONS[id as keyof typeof DEMO_COLLECTIONS] : null;
  const products = id ? DEMO_PRODUCTS[id as keyof typeof DEMO_PRODUCTS] || [] : [];

  useEffect(() => {
    if (id) {
      aiService.generateReadinessScore(id).then(setReadiness);
    }
  }, [id]);

  if (!collection) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Collection not found</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link to="/collections">Back to Collections</Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link to="/collections" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="h-3 w-3" /> Back to Collections
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">{collection.name}</h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-sm text-muted-foreground">{collection.season}</p>
            <Badge variant={collection.status === 'launched' ? 'success' : collection.status === 'production' ? 'warning' : 'secondary'}>
              {collection.status}
            </Badge>
          </div>
        </div>
        <Button>
          <Sparkles className="h-4 w-4 mr-2" /> AI Analysis
        </Button>
      </div>

      {/* AI Summary */}
      {readiness && <AiSummaryCard summary={readiness.summary} />}

      {/* Readiness Score */}
      {readiness && <ReadinessScore score={readiness} />}

      {/* Radar Chart + Timeline */}
      <div className="grid gap-4 lg:grid-cols-2">
        {readiness && (
          <ReadinessRadar
            data={Object.entries(readiness.categories).map(([category, score]) => ({
              category: category.charAt(0).toUpperCase() + category.slice(1),
              score,
            }))}
          />
        )}
        <CollectionTimeline />
      </div>

      {/* Recommendations */}
      {readiness && <AiRecommendations recommendations={readiness.recommendations} />}

      {/* Products */}
      <CollectionProducts products={products as any} />
    </motion.div>
  );
}
```

---

### Task 4: Products List Page

**Files:**
- Create: `src/features/products/hooks/useProducts.ts`
- Create: `src/features/products/components/ProductCard.tsx`
- Modify: `src/features/products/pages/ProductsPage.tsx`

- [ ] **Step 1: Create useProducts hook**

```typescript
// src/features/products/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/api/endpoints';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productsApi.list(),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.get(id),
    enabled: !!id,
  });
}
```

- [ ] **Step 2: Create ProductCard**

```typescript
// src/features/products/components/ProductCard.tsx
import { Link } from 'react-router';
import { Card, CardContent } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { motion } from 'framer-motion';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
    >
      <Link to={`/products/${product.id}`}>
        <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">{product.sku}</p>
              </div>
              <div className={`text-lg font-bold shrink-0 ml-3 ${
                product.healthScore >= 80 ? 'text-success' : product.healthScore >= 60 ? 'text-warning' : 'text-destructive'
              }`}>
                {product.healthScore}%
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{product.color}</span>
              <span>•</span>
              <span>{product.material}</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <Badge variant="outline" className="text-[10px]">{product.status}</Badge>
              <span className="text-xs text-muted-foreground">${product.recommendedPrice}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
```

- [ ] **Step 3: Rewrite ProductsPage**

```typescript
// src/features/products/pages/ProductsPage.tsx
import { motion } from 'framer-motion';
import { ProductCard } from '../components/ProductCard';
import { Skeleton } from '@/core/ui/skeleton';

const DEMO_PRODUCTS = [
  { id: 'prod-linen-dress', name: 'Linen Dress', sku: 'LF-S27-001', status: 'production', color: 'Natural White', material: 'Premium Linen', healthScore: 92, recommendedPrice: 189 },
  { id: 'prod-cotton-blazer', name: 'Cotton Blazer', sku: 'LF-S27-002', status: 'photo', color: 'Navy Blue', material: 'Organic Cotton', healthScore: 88, recommendedPrice: 249 },
  { id: 'prod-silk-blouse', name: 'Silk Blouse', sku: 'LF-S27-003', status: 'content', color: 'Blush Pink', material: 'Mulberry Silk', healthScore: 94, recommendedPrice: 219 },
  { id: 'prod-basic-shirt', name: 'Basic Shirt', sku: 'LF-S27-004', status: 'production', color: 'White', material: 'Cotton Poplin', healthScore: 78, recommendedPrice: 99 },
  { id: 'prod-linen-pants', name: 'Linen Pants', sku: 'LF-S27-005', status: 'wildberries', color: 'Beige', material: 'Premium Linen', healthScore: 90, recommendedPrice: 169 },
];

export function ProductsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {DEMO_PRODUCTS.length} products across all collections
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {DEMO_PRODUCTS.map((product, i) => (
          <ProductCard key={product.id} product={product as any} index={i} />
        ))}
      </div>
    </motion.div>
  );
}
```

---

### Task 5: Product Detail Page — Product Health Score

**Files:**
- Create: `src/features/products/components/HealthScore.tsx`
- Create: `src/features/products/components/ProductInfo.tsx`
- Modify: `src/features/products/pages/ProductDetailPage.tsx`

- [ ] **Step 1: Create HealthScore component**

```typescript
// src/features/products/components/HealthScore.tsx
import { CircularProgress } from '@/core/ui/circular-progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { Sparkles } from 'lucide-react';
import type { ProductHealthScore } from '@/ai/types';

interface HealthScoreProps {
  score: ProductHealthScore;
}

const categoryLabels: Record<string, string> = {
  content: 'Content', photos: 'Photos', seo: 'SEO',
  reviews: 'Reviews', returns: 'Returns',
};

export function HealthScore({ score }: HealthScoreProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr]">
      <Card>
        <CardHeader className="items-center pb-2">
          <CardTitle className="text-sm font-medium">Product Health</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center pb-6">
          <CircularProgress value={score.overall} size={140} strokeWidth={9} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-medium">AI Health Analysis</CardTitle>
            <Badge variant="secondary" className="ml-auto text-[10px]">AI-powered</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(score.categories).map(([key, val]) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-16 shrink-0">
                {categoryLabels[key] || key}
              </span>
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${val}%`,
                    backgroundColor: val >= 80 ? '#22c55e' : val >= 60 ? '#f59e0b' : '#ef4444',
                  }}
                />
              </div>
              <span className="text-xs font-mono w-8 text-right">{val}%</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
```

- [ ] **Step 2: Create ProductInfo component**

```typescript
// src/features/products/components/ProductInfo.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import type { Product } from '@/types';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Product Information</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          {[
            ['SKU', product.sku],
            ['Status', product.status],
            ['Size', product.size],
            ['Color', product.color],
            ['Material', product.material],
            ['Supplier', product.supplier],
            ['Factory', product.factory],
            ['Cost Price', `$${product.costPrice}`],
            ['Recommended Price', `$${product.recommendedPrice}`],
            ['Margin', `${Math.round(((product.recommendedPrice - product.costPrice) / product.recommendedPrice) * 100)}%`],
          ].map(([label, value]) => (
            <div key={label as string} className="flex flex-col">
              <dt className="text-xs text-muted-foreground">{label as string}</dt>
              <dd className="font-medium mt-0.5">{value as string}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 3: Rewrite ProductDetailPage**

```typescript
// src/features/products/pages/ProductDetailPage.tsx
import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ProductInfo } from '../components/ProductInfo';
import { HealthScore } from '../components/HealthScore';
import { AiRecommendations } from '@/features/collections/components/AiRecommendations';
import { Button } from '@/core/ui/button';
import { ArrowLeft } from 'lucide-react';
import { aiService } from '@/ai/mock';
import type { ProductHealthScore } from '@/ai/types';

const DEMO_PRODUCTS: Record<string, any> = {
  'prod-linen-dress': { id: 'prod-linen-dress', name: 'Linen Dress', sku: 'LF-S27-001', status: 'production', size: 'S-M-L', color: 'Natural White', material: 'Premium Linen', supplier: 'Italian Fabrics Co.', factory: 'Factory A', costPrice: 45, recommendedPrice: 189, healthScore: 92 },
  'prod-cotton-blazer': { id: 'prod-cotton-blazer', name: 'Cotton Blazer', sku: 'LF-S27-002', status: 'photo', size: 'S-M-L-XL', color: 'Navy Blue', material: 'Organic Cotton', supplier: 'Organic Textiles Ltd.', factory: 'Factory A', costPrice: 65, recommendedPrice: 249, healthScore: 88 },
  'prod-silk-blouse': { id: 'prod-silk-blouse', name: 'Silk Blouse', sku: 'LF-S27-003', status: 'content', size: 'XS-S-M-L', color: 'Blush Pink', material: 'Mulberry Silk', supplier: 'Silk Road Imports', factory: 'Factory B', costPrice: 55, recommendedPrice: 219, healthScore: 94 },
  'prod-basic-shirt': { id: 'prod-basic-shirt', name: 'Basic Shirt', sku: 'LF-S27-004', status: 'production', size: 'S-M-L-XL', color: 'White', material: 'Cotton Poplin', supplier: 'Organic Textiles Ltd.', factory: 'Factory A', costPrice: 25, recommendedPrice: 99, healthScore: 78 },
  'prod-linen-pants': { id: 'prod-linen-pants', name: 'Linen Pants', sku: 'LF-S27-005', status: 'wildberries', size: 'S-M-L', color: 'Beige', material: 'Premium Linen', supplier: 'Italian Fabrics Co.', factory: 'Factory B', costPrice: 40, recommendedPrice: 169, healthScore: 90 },
};

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [health, setHealth] = useState<ProductHealthScore | null>(null);

  const product = id ? DEMO_PRODUCTS[id] : null;

  useEffect(() => {
    if (id) {
      aiService.generateProductHealthScore(id).then(setHealth);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Product not found</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2">
          <ArrowLeft className="h-3 w-3" /> Back to Products
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">{product.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">{product.sku}</p>
      </div>

      {/* Product Info + Health Score */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ProductInfo product={product} />
        {health && <HealthScore score={health} />}
      </div>

      {/* AI Recommendations */}
      {health && <AiRecommendations recommendations={health.recommendations} />}
    </motion.div>
  );
}
```

---

### Task 6: Build Verification

- [ ] **Step 1: Re-export ai types for clean imports**

```typescript
// src/ai/index.ts
export { aiService } from './mock';
export type { AiService } from './interfaces';
export * from './types';
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: Build succeeds, no TypeScript errors.

- [ ] **Step 3: Verify all pages render**

Start dev server and navigate to:
- `/collections` — shows 5 collection cards
- `/collections/col-summer-2027` — full detail with radar chart, circular gauge, timeline
- `/products` — shows 5 product cards
- `/products/prod-linen-dress` — full detail with health score
