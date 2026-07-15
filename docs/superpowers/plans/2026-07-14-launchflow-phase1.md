# LaunchFlow AI — Phase 1: Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan.

**Goal:** Scaffold the complete LaunchFlow AI project with auth, routing, layout, theme, database, API layer, AI interfaces, and Vercel deployment configuration.

**Architecture:** Feature-based React frontend (Vite + React 19 + TS + Tailwind + shadcn/ui) with Vercel Serverless Functions backend (Express wrapped for serverless, Drizzle ORM + PostgreSQL). Clerk for auth with demo mode. AI/RAG layers designed as interfaces with mock implementations.

**Tech Stack:** React 19, TypeScript 5, Vite 6, Tailwind CSS v4, shadcn/ui, React Router v7, TanStack Query v5, Framer Motion v11, Clerk, Express, Drizzle ORM, PostgreSQL (Neon), Recharts.

---

### Task 1: Project Scaffolding — Vite + Dependencies

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.server.json`
- Create: `tsconfig.node.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `components.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/vite-env.d.ts`
- Create: `src/index.css`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "launchflow-ai",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "db:generate": "drizzle-kit generate",
    "db:push": "drizzle-kit push",
    "db:seed": "tsx db/seed.ts"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router": "^7.0.0",
    "@tanstack/react-query": "^5.0.0",
    "framer-motion": "^11.0.0",
    "recharts": "^2.0.0",
    "lucide-react": "^0.400.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "class-variance-authority": "^0.7.0",
    "@radix-ui/react-slot": "^1.0.0",
    "@radix-ui/react-dialog": "^1.0.0",
    "@radix-ui/react-dropdown-menu": "^2.0.0",
    "@radix-ui/react-tooltip": "^1.0.0",
    "@radix-ui/react-avatar": "^1.0.0",
    "@radix-ui/react-separator": "^1.0.0",
    "@radix-ui/react-scroll-area": "^1.0.0",
    "@clerk/clerk-react": "^5.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.6.0",
    "vite": "^6.0.0",
    "vite-plugin-node-polyfills": "^0.22.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "postcss": "^8.0.0",
    "autoprefixer": "^10.0.0",
    "eslint": "^9.0.0",
    "drizzle-kit": "^0.30.0",
    "tsx": "^4.0.0",
    "@types/node": "^22.0.0"
  }
}
```

- [ ] **Step 2: Create vite.config.ts**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
});
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./src/*"]
    },
    "baseUrl": "."
  },
  "include": ["src", "db", "api"]
}
```

- [ ] **Step 4: Create tsconfig.server.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "outDir": "dist-server",
    "rootDir": ".",
    "noEmit": true
  },
  "include": ["api", "db"]
}
```

- [ ] **Step 5: Create components.json (shadcn/ui)**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/core/ui",
    "utils": "@/lib/utils",
    "ui": "@/core/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

- [ ] **Step 6: Create index.html**

```html
<!doctype html>
<html lang="en" suppressHydrationWarning>
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <title>LaunchFlow AI</title>
  </head>
  <body class="min-h-screen bg-background font-sans antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Create src/index.css with Tailwind + CSS theme variables**

```css
@import "tailwindcss";

@theme {
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 221 83% 53%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 221 83% 53%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 72% 51%;
    --destructive-foreground: 0 0% 98%;
    --success: 142 71% 45%;
    --success-foreground: 0 0% 98%;
    --warning: 38 92% 50%;
    --warning-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 221 83% 53%;
    --radius: 0.5rem;
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 0 0% 3.9%;
    --sidebar-border: 0 0% 89.8%;
    --sidebar-accent: 0 0% 96.1%;
    --sidebar-accent-foreground: 0 0% 9%;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 5.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 5.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 217 91% 60%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 217 91% 60%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 72% 51%;
    --destructive-foreground: 0 0% 98%;
    --success: 142 71% 45%;
    --success-foreground: 0 0% 98%;
    --warning: 38 92% 50%;
    --warning-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 217 91% 60%;
    --sidebar-background: 0 0% 5.9%;
    --sidebar-foreground: 0 0% 98%;
    --sidebar-border: 0 0% 14.9%;
    --sidebar-accent: 0 0% 14.9%;
    --sidebar-accent-foreground: 0 0% 98%;
  }
}

@layer base {
  * {
    border-color: hsl(var(--border));
  }
  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
  }
}
```

- [ ] **Step 8: Create src/vite-env.d.ts**

```typescript
/// <reference types="vite/client" />
```

- [ ] **Step 9: Create src/main.tsx**

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 10: Create src/App.tsx (minimal placeholder)**

```typescript
export function App() {
  return <div className="flex items-center justify-center min-h-screen">
    <h1 className="text-2xl font-semibold">LaunchFlow AI</h1>
  </div>;
}
```

- [ ] **Step 11: Create favicon.svg in public/**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="8" fill="#2563EB"/>
  <path d="M8 16h16M16 8v16" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="16" cy="16" r="4" fill="white"/>
</svg>
```

- [ ] **Step 12: Create postcss.config.js**

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 13: Install dependencies**

Run: `npm install`
Expected: All packages install successfully, no errors.

- [ ] **Step 14: Verify build works**

Run: `npm run build`
Expected: Build succeeds, dist/ folder created.

---

### Task 2: Core Utilities and Constants

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/lib/constants.ts`

- [ ] **Step 1: Create src/lib/utils.ts**

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatPercentage(value: number, decimals = 0): string {
  return `${value.toFixed(decimals)}%`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function generateId(): string {
  return crypto.randomUUID();
}
```

- [ ] **Step 2: Create src/lib/constants.ts**

```typescript
export const NAV_ITEMS = [
  { label: 'Command Center', href: '/dashboard', icon: 'LayoutDashboard', phase: 3 },
  { label: 'Collections', href: '/collections', icon: 'Layers', phase: 2 },
  { label: 'Products', href: '/products', icon: 'Shirt', phase: 2 },
  { label: 'Pipeline', href: '/pipeline', icon: 'Kanban', phase: 4 },
  { label: 'Reviews', href: '/reviews', icon: 'MessageSquare', phase: 5 },
  { label: 'Marketplace', href: '/marketplace', icon: 'Store', phase: 5 },
  { label: 'Content Studio', href: '/content', icon: 'Image', phase: 6 },
  { label: 'Production', href: '/production', icon: 'Factory', phase: 6 },
  { label: 'Tasks', href: '/tasks', icon: 'CheckSquare', phase: 7 },
  { label: 'Notifications', href: '/notifications', icon: 'Bell', phase: 7 },
  { label: 'Knowledge Base', href: '/knowledge', icon: 'BookOpen', phase: 7 },
  { label: 'Executive Insights', href: '/insights', icon: 'Brain', phase: 8 },
  { label: 'Analytics', href: '/analytics', icon: 'BarChart3', phase: 8 },
  { label: 'Integrations', href: '/integrations', icon: 'Puzzle', phase: 8 },
] as const;

export const COLLECTION_STATUSES = ['planning', 'design', 'sampling', 'production', 'content', 'marketplace', 'launched'] as const;
export const PRODUCT_STATUSES = ['idea', 'sketch', 'design', 'sample', 'approval', 'production', 'photo', 'content', 'wildberries', 'ozon', 'launched', 'optimization'] as const;
export const TASK_PRIORITIES = ['low', 'medium', 'high', 'urgent'] as const;
export const ROLES = ['owner', 'ceo', 'product_manager', 'designer', 'production_manager', 'content_manager', 'marketing', 'employee', 'guest'] as const;

export type CollectionStatus = typeof COLLECTION_STATUSES[number];
export type ProductStatus = typeof PRODUCT_STATUSES[number];
export type TaskPriority = typeof TASK_PRIORITIES[number];
export type Role = typeof ROLES[number];
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

---

### Task 3: Global TypeScript Types

**Files:**
- Create: `src/types/models.ts`
- Create: `src/types/roles.ts`
- Create: `src/types/api.ts`
- Create: `src/types/index.ts`

- [ ] **Step 1: Create src/types/models.ts**

```typescript
export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Collection {
  id: string;
  name: string;
  season: string;
  launchDate: string;
  status: CollectionStatus;
  progress: number;
  readinessScore: number;
  productCount: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  collectionId: string;
  name: string;
  sku: string;
  status: ProductStatus;
  size: string;
  color: string;
  material: string;
  supplier: string;
  factory: string;
  costPrice: number;
  recommendedPrice: number;
  healthScore: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: TaskPriority;
  assigneeId?: string;
  collectionId?: string;
  productId?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}

export interface Document {
  id: string;
  title: string;
  type: string;
  description?: string;
  tags: string[];
  source: string;
  author: string;
  fileUrl?: string;
  collectionId?: string;
  productId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  entityType: string;
  entityId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  materialType: string;
  rating: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface ProductionBatch {
  id: string;
  productId: string;
  supplierId: string;
  quantity: number;
  status: 'planned' | 'in_progress' | 'completed' | 'delayed';
  startDate: string;
  endDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  rating: number;
  content: string;
  author: string;
  platform: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  createdAt: string;
}
```

- [ ] **Step 2: Create src/types/roles.ts**

```typescript
import type { Role } from '@/lib/constants';

export type Permission =
  | 'collections:read'
  | 'collections:write'
  | 'collections:delete'
  | 'products:read'
  | 'products:write'
  | 'products:delete'
  | 'tasks:read'
  | 'tasks:write'
  | 'tasks:delete'
  | 'users:read'
  | 'users:write'
  | 'content:read'
  | 'content:write'
  | 'production:read'
  | 'production:write'
  | 'analytics:read'
  | 'settings:read'
  | 'settings:write';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  owner: ['collections:read', 'collections:write', 'collections:delete', 'products:read', 'products:write', 'products:delete', 'tasks:read', 'tasks:write', 'tasks:delete', 'users:read', 'users:write', 'content:read', 'content:write', 'production:read', 'production:write', 'analytics:read', 'settings:read', 'settings:write'],
  ceo: ['collections:read', 'collections:write', 'products:read', 'products:write', 'tasks:read', 'tasks:write', 'users:read', 'content:read', 'production:read', 'analytics:read', 'settings:read'],
  product_manager: ['collections:read', 'collections:write', 'products:read', 'products:write', 'tasks:read', 'tasks:write', 'content:read', 'production:read', 'analytics:read'],
  designer: ['collections:read', 'products:read', 'products:write', 'tasks:read', 'tasks:write', 'content:read'],
  production_manager: ['products:read', 'production:read', 'production:write', 'tasks:read', 'tasks:write'],
  content_manager: ['products:read', 'content:read', 'content:write', 'tasks:read', 'tasks:write'],
  marketing: ['products:read', 'content:read', 'analytics:read', 'tasks:read', 'tasks:write'],
  employee: ['collections:read', 'products:read', 'tasks:read', 'tasks:write'],
  guest: ['collections:read', 'products:read'],
};
```

- [ ] **Step 3: Create src/types/api.ts**

```typescript
export interface ApiResponse<T> {
  data: T;
  error?: string;
  meta?: {
    total?: number;
    page?: number;
    pageSize?: number;
  };
}

export interface ApiError {
  error: string;
  status: number;
  message: string;
}
```

- [ ] **Step 4: Create src/types/index.ts**

```typescript
export * from './models';
export * from './roles';
export * from './api';
export type { CollectionStatus, ProductStatus, TaskPriority, Role } from '@/lib/constants';
```

---

### Task 4: AI Service Interfaces and Mock

**Files:**
- Create: `src/ai/interfaces.ts`
- Create: `src/ai/types.ts`
- Create: `src/ai/mock.ts`
- Create: `src/ai/rag/interfaces.ts`
- Create: `src/ai/rag/types.ts`
- Create: `src/ai/rag/mock.ts`
- Create: `src/ai/embeddings/interfaces.ts`
- Create: `src/ai/embeddings/mock.ts`

- [ ] **Step 1: Create src/ai/types.ts**

```typescript
export interface AiRecommendation {
  id: string;
  type: 'content' | 'production' | 'quality' | 'launch' | 'pricing' | 'risk';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  entityType?: string;
  entityId?: string;
}

export interface AiSummary {
  text: string;
  keyPoints: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface LaunchReadinessScore {
  overall: number;
  categories: {
    design: number;
    samples: number;
    production: number;
    photos: number;
    video: number;
    seo: number;
    wildberries: number;
    ozon: number;
    documents: number;
    certificates: number;
    tasks: number;
    quality: number;
    approval: number;
  };
  summary: string;
  recommendations: AiRecommendation[];
}

export interface ProductHealthScore {
  overall: number;
  categories: {
    content: number;
    photos: number;
    seo: number;
    reviews: number;
    returns: number;
  };
  recommendations: AiRecommendation[];
}

export interface ExecutiveReport {
  date: string;
  summary: string;
  readyForLaunch: number;
  delayedProduction: number;
  highRiskReturns: number;
  stockAlerts: string[];
  recommendations: AiRecommendation[];
}

export interface FutureInsight {
  type: 'success_probability' | 'delay_risk' | 'return_risk' | 'demand_forecast' | 'price_optimization';
  title: string;
  value: number;
  description: string;
  entityId?: string;
  entityName?: string;
}
```

- [ ] **Step 2: Create src/ai/interfaces.ts**

```typescript
import type { LaunchReadinessScore, ProductHealthScore, ExecutiveReport, FutureInsight, AiRecommendation, AiSummary } from './types';

export interface AiService {
  generateReadinessScore(collectionId: string): Promise<LaunchReadinessScore>;
  generateProductHealthScore(productId: string): Promise<ProductHealthScore>;
  generateProductDescription(product: { name: string; category: string; material: string; color: string }): Promise<{
    title: string;
    description: string;
    seo: string;
    benefits: string[];
    specifications: Record<string, string>;
    keywords: string[];
    siteDescription: string;
    wildberriesDescription: string;
    ozonDescription: string;
  }>;
  analyzeReviews(productId: string): Promise<{
    total: number;
    sentiment: { positive: number; neutral: number; negative: number };
    topics: Array<{ keyword: string; count: number; sentiment: string }>;
    summary: string;
    recommendations: AiRecommendation[];
  }>;
  generateExecutiveReport(): Promise<ExecutiveReport>;
  generateInsights(): Promise<FutureInsight[]>;
  generateSummary(text: string): Promise<AiSummary>;
}

export type AiModelProvider = 'openai' | 'openrouter' | 'mock';
```

- [ ] **Step 3: Create src/ai/mock.ts**

```typescript
import type { AiService } from './interfaces';
import type { LaunchReadinessScore, ProductHealthScore, ExecutiveReport, FutureInsight, AiRecommendation, AiSummary } from './types';

export class MockAiService implements AiService {
  async generateReadinessScore(collectionId: string): Promise<LaunchReadinessScore> {
    return {
      overall: 82,
      categories: {
        design: 100, samples: 90, production: 75, photos: 60, video: 40,
        seo: 55, wildberries: 70, ozon: 65, documents: 85, certificates: 50,
        tasks: 88, quality: 92, approval: 80,
      },
      summary: 'Collection is progressing well. Photography and certificates need attention.',
      recommendations: [
        { id: '1', type: 'content', title: 'Complete product photography', description: '3 products still need photos', priority: 'high', entityType: 'collection', entityId: collectionId },
        { id: '2', type: 'content', title: 'Fill SEO fields', description: 'Product descriptions missing for 2 items', priority: 'high' },
        { id: '3', type: 'launch', title: 'Upload certificates', description: 'Quality certificates not yet uploaded', priority: 'medium' },
        { id: '4', type: 'launch', title: 'Prepare Wildberries card', description: 'Marketplace listing not started', priority: 'medium' },
        { id: '5', type: 'launch', title: 'Prepare Ozon card', description: 'Marketplace listing not started', priority: 'medium' },
      ],
    };
  }

  async generateProductHealthScore(productId: string): Promise<ProductHealthScore> {
    return {
      overall: 94,
      categories: { content: 100, photos: 100, seo: 78, reviews: 92, returns: 95 },
      recommendations: [
        { id: '1', type: 'content', title: 'Improve SEO keywords', description: 'Add more relevant keywords to product description', priority: 'medium' },
      ],
    };
  }

  async generateProductDescription(product: { name: string; category: string; material: string; color: string }) {
    return {
      title: `${product.name} — Premium ${product.category}`,
      description: `Elevate your wardrobe with the ${product.name}, crafted from premium ${product.material} in an elegant ${product.color} hue. Designed for the modern fashion enthusiast who values both style and comfort.`,
      seo: `Buy ${product.name} online. Premium ${product.material} ${product.category} in ${product.color}. Free shipping. Official store. New collection 2027.`,
      benefits: ['Premium quality material', 'Designed for comfort', 'Versatile styling options', 'Durable construction'],
      specifications: { Material: product.material, Color: product.color, Care: 'Machine washable', Origin: 'Imported' },
      keywords: [product.name, product.material, product.category, product.color, 'fashion', 'premium', 'new collection'],
      siteDescription: `Discover the ${product.name} — a premium ${product.material} ${product.category} in ${product.color}. Part of our latest collection. Shop now.`,
      wildberriesDescription: `${product.name} — стильная ${product.category.toLowerCase()} из премиального ${product.material.toLowerCase()} цвета ${product.color}. Идеально подходит для повседневной носки и особых случаев.`,
      ozonDescription: `${product.name} — элегантная ${product.category.toLowerCase()} от LaunchFlow. Высококачественный ${product.material.toLowerCase()}, цвет ${product.color}. Быстрая доставка.`,
    };
  }

  async analyzeReviews(productId: string) {
    return {
      total: 734,
      sentiment: { positive: 85, neutral: 10, negative: 5 },
      topics: [
        { keyword: 'quality', count: 234, sentiment: 'positive' },
        { keyword: 'fit', count: 156, sentiment: 'neutral' },
        { keyword: 'fabric', count: 98, sentiment: 'positive' },
        { keyword: 'size', count: 87, sentiment: 'negative' },
        { keyword: 'color', count: 65, sentiment: 'positive' },
      ],
      summary: 'Customers praise the quality and fabric. Some concerns about sizing — consider reviewing size chart.',
      recommendations: [
        { id: '1', type: 'quality', title: 'Review sizing', description: 'Multiple customers report sizing issues', priority: 'high' },
        { id: '2', type: 'content', title: 'Update size chart', description: 'Add more detailed measurements', priority: 'medium' },
      ],
    };
  }

  async generateExecutiveReport(): Promise<ExecutiveReport> {
    return {
      date: new Date().toISOString(),
      summary: 'Four models ready for launch today. One production delay detected. Two products show high return risk. Size L will run out in 5 days.',
      readyForLaunch: 4,
      delayedProduction: 1,
      highRiskReturns: 2,
      stockAlerts: ['Size L — Linen Dress will run out in 5 days'],
      recommendations: [
        { id: '1', type: 'production', title: 'Increase Linen Dress production', description: 'Size L projected to sell out in 5 days', priority: 'high' },
        { id: '2', type: 'quality', title: 'Review Basic Shirt returns', description: 'Higher than expected return rate', priority: 'high' },
      ],
    };
  }

  async generateInsights(): Promise<FutureInsight[]> {
    return [
      { type: 'success_probability', title: 'Launch Success Probability', value: 87, description: 'Based on current readiness and historical data', entityName: 'Summer 2027' },
      { type: 'delay_risk', title: 'Delay Risk', value: 23, description: 'Low risk based on current production timeline' },
      { type: 'return_risk', title: 'Return Risk — Basic Shirt', value: 68, description: 'Higher than average return rate predicted', entityName: 'Basic Shirt' },
      { type: 'demand_forecast', title: 'Demand Forecast — Linen Dress', value: 92, description: 'High demand expected in first week', entityName: 'Linen Dress' },
      { type: 'price_optimization', title: 'Optimal Price — Linen Dress', value: 89, description: 'Current pricing is well positioned', entityName: 'Linen Dress' },
    ];
  }

  async generateSummary(text: string): Promise<AiSummary> {
    return {
      text: `Analysis complete. Key findings from the provided content: ${text.slice(0, 50)}...`,
      keyPoints: ['Analysis completed successfully', 'Key information extracted', 'Recommendations available'],
      sentiment: 'positive',
    };
  }
}

export const aiService = new MockAiService();
```

- [ ] **Step 4: Create src/ai/rag/types.ts**

```typescript
export interface RagDocument {
  id: string;
  title: string;
  content: string;
  metadata: DocumentMetadata;
  embedding?: number[];
  score?: number;
}

export interface DocumentMetadata {
  type: string;
  description?: string;
  tags: string[];
  source: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface RagQuery {
  text: string;
  filters?: Record<string, unknown>;
  topK?: number;
}
```

- [ ] **Step 5: Create src/ai/rag/interfaces.ts**

```typescript
import type { RagDocument, RagQuery } from './types';

export interface RetrievalService {
  indexDocument(document: RagDocument): Promise<void>;
  search(query: RagQuery): Promise<RagDocument[]>;
  deleteDocument(id: string): Promise<void>;
  getDocument(id: string): Promise<RagDocument | null>;
}
```

- [ ] **Step 6: Create src/ai/rag/mock.ts**

```typescript
import type { RetrievalService } from './interfaces';
import type { RagDocument, RagQuery } from './types';

export class MockRetrievalService implements RetrievalService {
  private documents: Map<string, RagDocument> = new Map();

  async indexDocument(document: RagDocument): Promise<void> {
    this.documents.set(document.id, document);
  }

  async search(query: RagQuery): Promise<RagDocument[]> {
    const results = Array.from(this.documents.values())
      .filter((doc) => {
        if (!query.filters) return true;
        return Object.entries(query.filters).every(
          ([key, value]) => doc.metadata[key as keyof typeof doc.metadata] === value
        );
      })
      .slice(0, query.topK ?? 5);
    return results.map((doc) => ({ ...doc, score: 0.85 }));
  }

  async deleteDocument(id: string): Promise<void> {
    this.documents.delete(id);
  }

  async getDocument(id: string): Promise<RagDocument | null> {
    return this.documents.get(id) ?? null;
  }
}
```

- [ ] **Step 7: Create src/ai/embeddings/interfaces.ts**

```typescript
export interface EmbeddingService {
  generateEmbedding(text: string): Promise<number[]>;
  generateEmbeddings(texts: string[]): Promise<number[][]>;
  cosineSimilarity(a: number[], b: number[]): number;
}

export interface VectorStore {
  storeEmbedding(id: string, embedding: number[], metadata: Record<string, unknown>): Promise<void>;
  searchSimilar(embedding: number[], topK?: number): Promise<Array<{ id: string; score: number; metadata: Record<string, unknown> }>>;
  deleteEmbedding(id: string): Promise<void>;
}
```

- [ ] **Step 8: Create src/ai/embeddings/mock.ts**

```typescript
import type { EmbeddingService, VectorStore } from './interfaces';

export class MockEmbeddingService implements EmbeddingService {
  async generateEmbedding(text: string): Promise<number[]> {
    return new Array(1536).fill(0).map(() => Math.random() * 2 - 1);
  }

  async generateEmbeddings(texts: string[]): Promise<number[][]> {
    return Promise.all(texts.map((t) => this.generateEmbedding(t)));
  }

  cosineSimilarity(a: number[], b: number[]): number {
    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dot / (magA * magB);
  }
}

export class MockVectorStore implements VectorStore {
  private store: Map<string, { embedding: number[]; metadata: Record<string, unknown> }> = new Map();

  async storeEmbedding(id: string, embedding: number[], metadata: Record<string, unknown>): Promise<void> {
    this.store.set(id, { embedding, metadata });
  }

  async searchSimilar(embedding: number[], topK = 10): Promise<Array<{ id: string; score: number; metadata: Record<string, unknown> }>> {
    const embedService = new MockEmbeddingService();
    const results = Array.from(this.store.entries()).map(([id, data]) => ({
      id,
      score: embedService.cosineSimilarity(embedding, data.embedding),
      metadata: data.metadata,
    }));
    return results.sort((a, b) => b.score - a.score).slice(0, topK);
  }

  async deleteEmbedding(id: string): Promise<void> {
    this.store.delete(id);
  }
}
```

---

### Task 5: Database Schema — All Tables

**Files:**
- Create: `db/schema/users.ts`
- Create: `db/schema/collections.ts`
- Create: `db/schema/products.ts`
- Create: `db/schema/tasks.ts`
- Create: `db/schema/notifications.ts`
- Create: `db/schema/documents.ts`
- Create: `db/schema/activity_logs.ts`
- Create: `db/schema/comments.ts`
- Create: `db/schema/suppliers.ts`
- Create: `db/schema/production.ts`
- Create: `db/schema/reviews.ts`
- Create: `db/schema/index.ts`
- Create: `db/index.ts`
- Create: `db/seed.ts`
- Create: `drizzle.config.ts`

- [ ] **Step 1: Create drizzle.config.ts**

```typescript
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './db/schema/index.ts',
  out: './db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

- [ ] **Step 2: Create db/schema/users.ts**

```typescript
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('employee'),
  avatarUrl: text('avatar_url'),
  clerkId: varchar('clerk_id', { length: 255 }).unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

- [ ] **Step 3: Create db/schema/collections.ts**

```typescript
import { pgTable, text, timestamp, integer, varchar, doublePrecision } from 'drizzle-orm/pg-core';

export const collections = pgTable('collections', {
  id: text('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  season: varchar('season', { length: 100 }).notNull(),
  launchDate: timestamp('launch_date').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('planning'),
  progress: integer('progress').default(0),
  readinessScore: doublePrecision('readiness_score').default(0),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

- [ ] **Step 4: Create db/schema/products.ts**

```typescript
import { pgTable, text, timestamp, varchar, doublePrecision, integer } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: text('id').primaryKey(),
  collectionId: text('collection_id').notNull().references(() => collections.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  sku: varchar('sku', { length: 100 }).notNull().unique(),
  status: varchar('status', { length: 50 }).notNull().default('idea'),
  size: varchar('size', { length: 50 }),
  color: varchar('color', { length: 100 }),
  material: varchar('material', { length: 255 }),
  supplier: varchar('supplier', { length: 255 }),
  factory: varchar('factory', { length: 255 }),
  costPrice: doublePrecision('cost_price').default(0),
  recommendedPrice: doublePrecision('recommended_price').default(0),
  healthScore: doublePrecision('health_score').default(100),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

- [ ] **Step 5: Create db/schema/tasks.ts**

```typescript
import { pgTable, text, timestamp, varchar, integer, boolean } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
  id: text('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  status: varchar('status', { length: 50 }).notNull().default('todo'),
  priority: varchar('priority', { length: 20 }).notNull().default('medium'),
  assigneeId: text('assignee_id'),
  collectionId: text('collection_id'),
  productId: text('product_id'),
  dueDate: timestamp('due_date'),
  parentId: text('parent_id'),
  completed: boolean('completed').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

- [ ] **Step 6: Create db/schema/notifications.ts**

```typescript
import { pgTable, text, timestamp, varchar, boolean } from 'drizzle-orm/pg-core';

export const notifications = pgTable('notifications', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  type: varchar('type', { length: 20 }).notNull().default('info'),
  read: boolean('read').default(false),
  channel: varchar('channel', { length: 20 }).default('in_app'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

- [ ] **Step 7: Create db/schema/documents.ts**

```typescript
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const documents = pgTable('documents', {
  id: text('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  type: varchar('type', { length: 100 }).notNull(),
  description: text('description'),
  tags: text('tags').default(''),
  source: varchar('source', { length: 100 }).default('manual'),
  author: varchar('author', { length: 255 }).notNull(),
  fileUrl: text('file_url'),
  collectionId: text('collection_id'),
  productId: text('product_id'),
  metadata: text('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

- [ ] **Step 8: Create db/schema/activity_logs.ts**

```typescript
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const activityLogs = pgTable('activity_logs', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  action: varchar('action', { length: 255 }).notNull(),
  entityType: varchar('entity_type', { length: 50 }).notNull(),
  entityId: text('entity_id').notNull(),
  metadata: text('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

- [ ] **Step 9: Create db/schema/comments.ts**

```typescript
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const comments = pgTable('comments', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  entityType: varchar('entity_type', { length: 50 }).notNull(),
  entityId: text('entity_id').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

- [ ] **Step 10: Create db/schema/suppliers.ts**

```typescript
import { pgTable, text, timestamp, varchar, doublePrecision } from 'drizzle-orm/pg-core';

export const suppliers = pgTable('suppliers', {
  id: text('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  contactPerson: varchar('contact_person', { length: 255 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  address: text('address'),
  materialType: varchar('material_type', { length: 255 }),
  rating: doublePrecision('rating').default(0),
  status: varchar('status', { length: 20 }).default('active'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

- [ ] **Step 11: Create db/schema/production.ts**

```typescript
import { pgTable, text, timestamp, varchar, integer } from 'drizzle-orm/pg-core';

export const production = pgTable('production', {
  id: text('id').primaryKey(),
  productId: text('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  supplierId: text('supplier_id').references(() => suppliers.id),
  quantity: integer('quantity').default(0),
  status: varchar('status', { length: 50 }).default('planned'),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

- [ ] **Step 12: Create db/schema/reviews.ts**

```typescript
import { pgTable, text, timestamp, varchar, integer, doublePrecision } from 'drizzle-orm/pg-core';

export const reviews = pgTable('reviews', {
  id: text('id').primaryKey(),
  productId: text('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  rating: integer('rating').notNull(),
  content: text('content').notNull(),
  author: varchar('author', { length: 255 }),
  platform: varchar('platform', { length: 50 }).default('website'),
  sentiment: varchar('sentiment', { length: 20 }).default('neutral'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

- [ ] **Step 13: Create db/schema/index.ts**

```typescript
export { users } from './users';
export { collections } from './collections';
export { products } from './products';
export { tasks } from './tasks';
export { notifications } from './notifications';
export { documents } from './documents';
export { activityLogs } from './activity_logs';
export { comments } from './comments';
export { suppliers } from './suppliers';
export { production } from './production';
export { reviews } from './reviews';
```

- [ ] **Step 14: Create db/index.ts**

```typescript
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema';

export const db = drizzle(sql, { schema });
```

- [ ] **Step 15: Create db/seed.ts — demo data**

```typescript
import { db } from './index';
import { users } from './schema/users';
import { collections } from './schema/collections';
import { products } from './schema/products';
import { tasks } from './schema/tasks';
import { notifications } from './schema/notifications';
import { suppliers } from './schema/suppliers';
import { reviews } from './schema/reviews';

async function seed() {
  console.log('Seeding database...');

  // Users
  await db.insert(users).values([
    { id: 'demo-owner', email: 'demo@launchflow.ai', name: 'Alex Morgan', role: 'owner', avatarUrl: '' },
    { id: 'demo-ceo', email: 'ceo@launchflow.ai', name: 'Sarah Chen', role: 'ceo', avatarUrl: '' },
    { id: 'demo-pm', email: 'pm@launchflow.ai', name: 'James Wilson', role: 'product_manager', avatarUrl: '' },
    { id: 'demo-designer', email: 'designer@launchflow.ai', name: 'Maria Garcia', role: 'designer', avatarUrl: '' },
    { id: 'demo-production', email: 'production@launchflow.ai', name: 'David Kim', role: 'production_manager', avatarUrl: '' },
  ]);

  // Collections
  await db.insert(collections).values([
    { id: 'col-summer-2027', name: 'Summer 2027', season: 'Summer 2027', launchDate: new Date('2027-05-01'), status: 'production', progress: 82, readinessScore: 82 },
    { id: 'col-spring-2027', name: 'Spring 2027 Capsule', season: 'Spring 2027', launchDate: new Date('2027-03-15'), status: 'launched', progress: 100, readinessScore: 96 },
    { id: 'col-fall-2027', name: 'Fall 2027 Premium', season: 'Fall 2027', launchDate: new Date('2027-09-01'), status: 'planning', progress: 15, readinessScore: 54 },
    { id: 'col-winter-2027', name: 'Winter 2027 Collection', season: 'Winter 2027', launchDate: new Date('2027-11-01'), status: 'design', progress: 35, readinessScore: 61 },
    { id: 'col-resort-2027', name: 'Resort 2027', season: 'Resort 2027', launchDate: new Date('2027-07-15'), status: 'sampling', progress: 55, readinessScore: 73 },
  ]);

  // Products
  await db.insert(products).values([
    { id: 'prod-linen-dress', collectionId: 'col-summer-2027', name: 'Linen Dress', sku: 'LF-S27-001', status: 'production', size: 'S-M-L', color: 'Natural White', material: 'Premium Linen', supplier: 'Italian Fabrics Co.', factory: 'Factory A', costPrice: 45, recommendedPrice: 189, healthScore: 92 },
    { id: 'prod-cotton-blazer', collectionId: 'col-summer-2027', name: 'Cotton Blazer', sku: 'LF-S27-002', status: 'photo', size: 'S-M-L-XL', color: 'Navy Blue', material: 'Organic Cotton', supplier: 'Organic Textiles Ltd.', factory: 'Factory A', costPrice: 65, recommendedPrice: 249, healthScore: 88 },
    { id: 'prod-silk-blouse', collectionId: 'col-summer-2027', name: 'Silk Blouse', sku: 'LF-S27-003', status: 'content', size: 'XS-S-M-L', color: 'Blush Pink', material: 'Mulberry Silk', supplier: 'Silk Road Imports', factory: 'Factory B', costPrice: 55, recommendedPrice: 219, healthScore: 94 },
    { id: 'prod-basic-shirt', collectionId: 'col-summer-2027', name: 'Basic Shirt', sku: 'LF-S27-004', status: 'production', size: 'S-M-L-XL', color: 'White', material: 'Cotton Poplin', supplier: 'Organic Textiles Ltd.', factory: 'Factory A', costPrice: 25, recommendedPrice: 99, healthScore: 78 },
    { id: 'prod-linen-pants', collectionId: 'col-summer-2027', name: 'Linen Pants', sku: 'LF-S27-005', status: 'wildberries', size: 'S-M-L', color: 'Beige', material: 'Premium Linen', supplier: 'Italian Fabrics Co.', factory: 'Factory B', costPrice: 40, recommendedPrice: 169, healthScore: 90 },
  ]);

  // Suppliers
  await db.insert(suppliers).values([
    { id: 'sup-italian', name: 'Italian Fabrics Co.', contactPerson: 'Marco Rossi', email: 'marco@italianfabrics.com', phone: '+39 123 456 789', materialType: 'Linen, Cotton, Wool', rating: 4.8, status: 'active' },
    { id: 'sup-organic', name: 'Organic Textiles Ltd.', contactPerson: 'Emma Green', email: 'emma@organictextiles.com', phone: '+44 123 456 789', materialType: 'Organic Cotton, Bamboo', rating: 4.5, status: 'active' },
    { id: 'sup-silk', name: 'Silk Road Imports', contactPerson: 'Li Wei', email: 'li@silkroad.com', phone: '+86 123 456 789', materialType: 'Mulberry Silk, Satin', rating: 4.9, status: 'active' },
  ]);

  // Tasks
  await db.insert(tasks).values([
    { id: 'task-1', title: 'Complete product photography for Linen Dress', status: 'in_progress', priority: 'high', assigneeId: 'demo-designer', collectionId: 'col-summer-2027', productId: 'prod-linen-dress', dueDate: new Date('2027-02-20') },
    { id: 'task-2', title: 'Upload quality certificates', status: 'todo', priority: 'high', assigneeId: 'demo-pm', collectionId: 'col-summer-2027', dueDate: new Date('2027-02-25') },
    { id: 'task-3', title: 'Prepare Wildberries listing', status: 'in_progress', priority: 'medium', assigneeId: 'demo-production', collectionId: 'col-summer-2027', dueDate: new Date('2027-03-01') },
    { id: 'task-4', title: 'Review sample for Cotton Blazer', status: 'review', priority: 'high', assigneeId: 'demo-designer', collectionId: 'col-summer-2027', productId: 'prod-cotton-blazer', dueDate: new Date('2027-02-18') },
    { id: 'task-5', title: 'Finalize pricing for Summer 2027', status: 'todo', priority: 'medium', assigneeId: 'demo-ceo', collectionId: 'col-summer-2027', dueDate: new Date('2027-03-10') },
    { id: 'task-6', title: 'Design lookbook Spring 2027', status: 'done', priority: 'medium', assigneeId: 'demo-designer', collectionId: 'col-spring-2027', dueDate: new Date('2027-01-15') },
    { id: 'task-7', title: 'Source new linen supplier', status: 'in_progress', priority: 'low', assigneeId: 'demo-pm', dueDate: new Date('2027-03-20') },
    { id: 'task-8', title: 'Prepare Ozon card for Linen Pants', status: 'todo', priority: 'medium', assigneeId: 'demo-production', collectionId: 'col-summer-2027', productId: 'prod-linen-pants', dueDate: new Date('2027-02-28') },
  ]);

  // Notifications
  await db.insert(notifications).values([
    { id: 'notif-1', userId: 'demo-owner', title: 'Production Delay', message: 'Cotton Blazer production is delayed by 4 days', type: 'warning', read: false },
    { id: 'notif-2', userId: 'demo-owner', title: 'Material Low Stock', message: 'Linen fabric is running low — reorder needed', type: 'warning', read: false },
    { id: 'notif-3', userId: 'demo-owner', title: 'Photos Missing', message: '3 products still need photos', type: 'error', read: false },
    { id: 'notif-4', userId: 'demo-owner', title: 'Launch Readiness Update', message: 'Spring 2027 Capsule is 96% ready for launch', type: 'success', read: true },
    { id: 'notif-5', userId: 'demo-owner', title: 'New Reviews Available', message: '734 new reviews — AI analysis ready', type: 'info', read: false },
    { id: 'notif-6', userId: 'demo-owner', title: 'AI Recommendation', message: 'Increase first batch of Linen Dress', type: 'info', read: false },
    { id: 'notif-7', userId: 'demo-owner', title: 'Return Risk Alert', message: 'Basic Shirt has higher than expected return rate', type: 'error', read: false },
    { id: 'notif-8', userId: 'demo-ceo', title: 'Executive Report Ready', message: 'Morning report for today is ready', type: 'info', read: false },
  ]);

  // Reviews
  await db.insert(reviews).values([
    { id: 'rev-1', productId: 'prod-basic-shirt', rating: 4, content: 'Great basic shirt, fits well. Will buy again.', author: 'Anna K.', platform: 'Wildberries', sentiment: 'positive' },
    { id: 'rev-2', productId: 'prod-basic-shirt', rating: 2, content: 'Runs small, order a size up. Fabric is nice though.', author: 'Elena M.', platform: 'Wildberries', sentiment: 'negative' },
    { id: 'rev-3', productId: 'prod-basic-shirt', rating: 5, content: 'Perfect fit and excellent quality!', author: 'Olga S.', platform: 'Ozon', sentiment: 'positive' },
    { id: 'rev-4', productId: 'prod-silk-blouse', rating: 5, content: 'Beautiful silk blouse, true to size. Love the color!', author: 'Maria L.', platform: 'Wildberries', sentiment: 'positive' },
    { id: 'rev-5', productId: 'prod-silk-blouse', rating: 4, content: 'Elegant design, slightly sheer but works for evening', author: 'Tatiana P.', platform: 'Ozon', sentiment: 'positive' },
    { id: 'rev-6', productId: 'prod-linen-dress', rating: 5, content: 'Perfect summer dress! Linen is high quality.', author: 'Natasha R.', platform: 'Wildberries', sentiment: 'positive' },
    { id: 'rev-7', productId: 'prod-linen-pants', rating: 4, content: 'Comfortable and stylish. Runs a bit long.', author: 'Irina D.', platform: 'Ozon', sentiment: 'neutral' },
    { id: 'rev-8', productId: 'prod-cotton-blazer', rating: 3, content: 'Nice blazer but the sizing is inconsistent', author: 'Svetlana K.', platform: 'Wildberries', sentiment: 'neutral' },
    { id: 'rev-9', productId: 'prod-basic-shirt', rating: 1, content: 'Shrank after first wash. Disappointed.', author: 'Anastasia V.', platform: 'Ozon', sentiment: 'negative' },
    { id: 'rev-10', productId: 'prod-linen-dress', rating: 5, content: 'Got so many compliments! Ordering in another color.', author: 'Daria N.', platform: 'Wildberries', sentiment: 'positive' },
  ]);

  console.log('Seed completed successfully!');
}

seed()
  .catch(console.error)
  .finally(() => process.exit());
```

---

### Task 6: Vercel Serverless API Setup

**Files:**
- Create: `api/index.ts`
- Create: `api/_lib/db.ts`
- Create: `api/_lib/middleware.ts`
- Create: `api/_lib/response.ts`
- Create: `vercel.json`
- Create: `.env.example`

- [ ] **Step 1: Create api/_lib/db.ts**

```typescript
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from '../../db/schema';

export const db = drizzle(sql, { schema });
```

- [ ] **Step 2: Create api/_lib/response.ts**

```typescript
import type { ApiResponse } from '@/types/api';

export function success<T>(data: T, meta?: ApiResponse<T>['meta']): ApiResponse<T> {
  return { data, meta };
}

export function error(message: string, status: number = 400): { error: string; status: number } {
  return { error: message, status };
}
```

- [ ] **Step 3: Create api/_lib/middleware.ts**

```typescript
import { verifyToken } from '@clerk/backend';
import type { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  userId?: string;
  userRole?: string;
}

const clerkSecretKey = process.env.CLERK_SECRET_KEY;

export async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  // Demo mode: allow requests with x-demo-user header
  const demoUser = req.headers['x-demo-user'] as string;
  if (demoUser) {
    req.userId = demoUser;
    req.userRole = 'owner';
    return next();
  }

  const sessionToken = req.headers.authorization?.replace('Bearer ', '');
  if (!sessionToken || !clerkSecretKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const payload = await verifyToken(sessionToken, { secretKey: clerkSecretKey });
    req.userId = payload.sub;
    req.userRole = (payload as any).role || 'employee';
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export function requireRole(...roles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.userRole || !roles.includes(req.userRole)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error('API Error:', err);
  res.status(500).json({ error: 'Internal server error' });
}
```

- [ ] **Step 4: Create api/index.ts — Express app as Vercel Serverless Function**

```typescript
import express from 'express';
import cors from 'cors';
import { db } from './_lib/db';
import { success, error } from './_lib/response';
import { requireAuth, errorHandler } from './_lib/middleware';
import { collections } from '../db/schema/collections';
import { products } from '../db/schema/products';
import { tasks } from '../db/schema/tasks';
import { notifications } from '../db/schema/notifications';
import { reviews } from '../db/schema/reviews';
import { suppliers } from '../db/schema/suppliers';
import { eq } from 'drizzle-orm';

const app = express();

app.use(cors({ origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : '*' }));
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json(success({ status: 'ok', timestamp: new Date().toISOString() }));
});

// Collections
app.get('/api/collections', requireAuth, async (_req, res, next) => {
  try {
    const data = await db.select().from(collections);
    res.json(success(data));
  } catch (e) { next(e); }
});

app.get('/api/collections/:id', requireAuth, async (req, res, next) => {
  try {
    const data = await db.select().from(collections).where(eq(collections.id, req.params.id));
    if (!data.length) return res.status(404).json(error('Collection not found', 404));
    res.json(success(data[0]));
  } catch (e) { next(e); }
});

// Products
app.get('/api/products', requireAuth, async (_req, res, next) => {
  try {
    const data = await db.select().from(products);
    res.json(success(data));
  } catch (e) { next(e); }
});

app.get('/api/products/:id', requireAuth, async (req, res, next) => {
  try {
    const data = await db.select().from(products).where(eq(products.id, req.params.id));
    if (!data.length) return res.status(404).json(error('Product not found', 404));
    res.json(success(data[0]));
  } catch (e) { next(e); }
});

app.get('/api/products/collection/:collectionId', requireAuth, async (req, res, next) => {
  try {
    const data = await db.select().from(products).where(eq(products.collectionId, req.params.collectionId));
    res.json(success(data));
  } catch (e) { next(e); }
});

// Tasks
app.get('/api/tasks', requireAuth, async (_req, res, next) => {
  try {
    const data = await db.select().from(tasks);
    res.json(success(data));
  } catch (e) { next(e); }
});

app.get('/api/tasks/collection/:collectionId', requireAuth, async (req, res, next) => {
  try {
    const data = await db.select().from(tasks).where(eq(tasks.collectionId, req.params.collectionId));
    res.json(success(data));
  } catch (e) { next(e); }
});

// Notifications
app.get('/api/notifications', requireAuth, async (req, res, next) => {
  try {
    const data = await db.select().from(notifications);
    res.json(success(data));
  } catch (e) { next(e); }
});

// Reviews
app.get('/api/reviews', requireAuth, async (_req, res, next) => {
  try {
    const data = await db.select().from(reviews);
    res.json(success(data));
  } catch (e) { next(e); }
});

app.get('/api/reviews/product/:productId', requireAuth, async (req, res, next) => {
  try {
    const data = await db.select().from(reviews).where(eq(reviews.productId, req.params.productId));
    res.json(success(data));
  } catch (e) { next(e); }
});

// Suppliers
app.get('/api/suppliers', requireAuth, async (_req, res, next) => {
  try {
    const data = await db.select().from(suppliers);
    res.json(success(data));
  } catch (e) { next(e); }
});

// AI mock endpoints
app.get('/api/ai/readiness/:collectionId', requireAuth, async (req, res, next) => {
  try {
    const { aiService } = await import('../src/ai/mock');
    const score = await aiService.generateReadinessScore(req.params.collectionId);
    res.json(success(score));
  } catch (e) { next(e); }
});

app.get('/api/ai/health/:productId', requireAuth, async (req, res, next) => {
  try {
    const { aiService } = await import('../src/ai/mock');
    const score = await aiService.generateProductHealthScore(req.params.productId);
    res.json(success(score));
  } catch (e) { next(e); }
});

app.get('/api/ai/executive-report', requireAuth, async (_req, res, next) => {
  try {
    const { aiService } = await import('../src/ai/mock');
    const report = await aiService.generateExecutiveReport();
    res.json(success(report));
  } catch (e) { next(e); }
});

app.get('/api/ai/insights', requireAuth, async (_req, res, next) => {
  try {
    const { aiService } = await import('../src/ai/mock');
    const insights = await aiService.generateInsights();
    res.json(success(insights));
  } catch (e) { next(e); }
});

app.post('/api/ai/product-description', requireAuth, async (req, res, next) => {
  try {
    const { aiService } = await import('../src/ai/mock');
    const description = await aiService.generateProductDescription(req.body);
    res.json(success(description));
  } catch (e) { next(e); }
});

app.use(errorHandler);

export default app;
```

- [ ] **Step 5: Create vercel.json**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,POST,PUT,DELETE,OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "Content-Type, Authorization" }
      ]
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

- [ ] **Step 6: Create .env.example**

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/launchflow

# Authentication (Clerk)
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxx
CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx

# AI Providers
OPENAI_API_KEY=sk-xxxxxxxxxxxx
OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxx

# Application
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

- [ ] **Step 7: Add dependencies for server**

Run: `npm install express cors @vercel/postgres drizzle-orm @clerk/backend serverless-http && npm install -D @types/express @types/cors`

---

### Task 7: Theme System

**Files:**
- Create: `src/core/theme/ThemeProvider.tsx`
- Create: `src/core/theme/ThemeToggle.tsx`

- [ ] **Step 1: Create src/core/theme/ThemeProvider.tsx**

```typescript
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'launchflow-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () => setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
```

- [ ] **Step 2: Create src/core/theme/ThemeToggle.tsx**

```typescript
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/core/ui/button';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className="relative">
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </motion.div>
    </Button>
  );
}
```

---

### Task 8: Auth — Clerk + Demo Mode

**Files:**
- Create: `src/core/auth/ClerkProvider.tsx`
- Create: `src/core/auth/ProtectedRoute.tsx`
- Create: `src/core/auth/DemoAuth.tsx`
- Create: `src/core/auth/usePermissions.ts`
- Create: `src/features/auth/pages/SignInPage.tsx`
- Create: `src/features/auth/pages/SignUpPage.tsx`

- [ ] **Step 1: Create src/core/auth/ClerkProvider.tsx**

```typescript
import { ClerkProvider as ClerkReactProvider } from '@clerk/clerk-react';
import { type ReactNode } from 'react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_placeholder';

export function ClerkProvider({ children }: { children: ReactNode }) {
  if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
    return <>{children}</>;
  }

  return (
    <ClerkReactProvider publishableKey={PUBLISHABLE_KEY}>
      {children}
    </ClerkReactProvider>
  );
}
```

- [ ] **Step 2: Create src/core/auth/ProtectedRoute.tsx**

```typescript
import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string[];
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const location = useLocation();
  const isDemo = typeof window !== 'undefined' && sessionStorage.getItem('launchflow-demo') === 'true';

  // Demo mode is always allowed
  if (isDemo) {
    return <>{children}</>;
  }

  // Check if Clerk is configured
  if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
    // Redirect to demo auth if no Clerk configured
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  // TODO: Actual Clerk auth check will be added when Clerk is configured
  return <>{children}</>;
}

export function usePermissions() {
  const isDemo = typeof window !== 'undefined' && sessionStorage.getItem('launchflow-demo') === 'true';

  return {
    isDemo,
    can: (_permission: string) => true, // Demo: full access
    role: isDemo ? 'owner' : 'employee',
  };
}
```

- [ ] **Step 3: Create src/core/auth/DemoAuth.tsx**

```typescript
import { useNavigate } from 'react-router';
import { Button } from '@/core/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/ui/card';

export function DemoAuth() {
  const navigate = useNavigate();

  const enterDemo = () => {
    sessionStorage.setItem('launchflow-demo', 'true');
    sessionStorage.setItem('launchflow-demo-user', JSON.stringify({
      id: 'demo-owner',
      name: 'Alex Morgan',
      email: 'demo@launchflow.ai',
      role: 'owner',
    }));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to LaunchFlow AI</CardTitle>
          <CardDescription>
            AI Product Operating System for Fashion Brands
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {import.meta.env.VITE_CLERK_PUBLISHABLE_KEY && (
            <>
              <Button className="w-full" onClick={() => navigate('/auth/sign-in')}>
                Sign In
              </Button>
              <Button className="w-full" variant="outline" onClick={() => navigate('/auth/sign-up')}>
                Create Account
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>
            </>
          )}
          <Button variant="secondary" className="w-full" onClick={enterDemo}>
            Enter Demo Mode
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Explore the platform with pre-loaded demo data. No registration required.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
```

- [ ] **Step 4: Create src/core/auth/usePermissions.ts**

```typescript
import { ROLE_PERMISSIONS, type Role } from '@/types';
import type { Permission } from '@/types/roles';

export function usePermissions() {
  const isDemo = typeof window !== 'undefined' && sessionStorage.getItem('launchflow-demo') === 'true';
  const demoUser = typeof window !== 'undefined'
    ? JSON.parse(sessionStorage.getItem('launchflow-demo-user') || '{}')
    : {};
  const role: Role = isDemo ? (demoUser.role || 'owner') : 'employee';
  const permissions = ROLE_PERMISSIONS[role] || [];

  return {
    role,
    isDemo,
    can: (permission: Permission) => permissions.includes(permission),
    user: isDemo ? demoUser : null,
  };
}
```

- [ ] **Step 5: Create sign-in/sign-up placeholder pages**

```typescript
// src/features/auth/pages/SignInPage.tsx
import { SignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router';
import { Button } from '@/core/ui/button';

export function SignInPage() {
  const navigate = useNavigate();

  if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
        <p className="text-muted-foreground">Clerk is not configured.</p>
        <Button variant="secondary" onClick={() => navigate('/auth/demo')}>
          Enter Demo Mode
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SignIn />
    </div>
  );
}

// src/features/auth/pages/SignUpPage.tsx
import { SignUp } from '@clerk/clerk-react';

export function SignUpPage() {
  if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-muted-foreground">Clerk is not configured.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SignUp />
    </div>
  );
}
```

---

### Task 9: Base Layout — Sidebar, Header, AppLayout

**Files:**
- Create: `src/core/layout/AppLayout.tsx`
- Create: `src/core/layout/Sidebar.tsx`
- Create: `src/core/layout/Header.tsx`
- Create: `src/core/layout/DemoBanner.tsx`

- [ ] **Step 1: Create src/core/layout/DemoBanner.tsx**

```typescript
import { FlaskConical } from 'lucide-react';

export function DemoBanner() {
  const isDemo = typeof window !== 'undefined' && sessionStorage.getItem('launchflow-demo') === 'true';
  if (!isDemo) return null;

  return (
    <div className="bg-primary/10 border-b border-primary/20 px-4 py-1.5 text-center text-xs font-medium text-primary flex items-center justify-center gap-2">
      <FlaskConical className="h-3 w-3" />
      <span>Demo Mode — Exploring LaunchFlow AI with sample data</span>
    </div>
  );
}
```

- [ ] **Step 2: Create src/core/layout/Sidebar.tsx**

```typescript
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/constants';
import {
  LayoutDashboard, Layers, Shirt, Kanban, MessageSquare, Store,
  Image, Factory, CheckSquare, Bell, BookOpen, Brain, BarChart3,
  Puzzle, ChevronLeft, ChevronRight, Sparkles,
} from 'lucide-react';
import { ScrollArea } from '@/core/ui/scroll-area';
import { Separator } from '@/core/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import type { ElementType } from 'react';

const iconMap: Record<string, ElementType> = {
  LayoutDashboard, Layers, Shirt, Kanban, MessageSquare, Store,
  Image, Factory, CheckSquare, Bell, BookOpen, Brain, BarChart3, Puzzle,
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        'relative flex flex-col border-r bg-sidebar-background transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 px-4 border-b">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="font-semibold text-sm whitespace-nowrap overflow-hidden"
            >
              LaunchFlow AI
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-2">
        <nav className="space-y-0.5 px-2">
          {NAV_ITEMS.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const isActive = location.pathname.startsWith(item.href);

            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                    : 'text-sidebar-foreground/70',
                  'group relative'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {item.phase > 2 && !collapsed && (
                  <span className="ml-auto text-[10px] text-muted-foreground/50 font-mono">
                    v{item.phase}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Collapse button */}
      <div className="border-t p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  );
}
```

- [ ] **Step 3: Create src/core/layout/Header.tsx**

```typescript
import { useNavigate } from 'react-router';
import { ThemeToggle } from '@/core/theme/ThemeToggle';
import { Button } from '@/core/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/core/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/core/ui/dropdown-menu';
import { Bell, LogOut, Settings, User } from 'lucide-react';

export function Header() {
  const navigate = useNavigate();
  const isDemo = typeof window !== 'undefined' && sessionStorage.getItem('launchflow-demo') === 'true';
  const demoUser = typeof window !== 'undefined'
    ? JSON.parse(sessionStorage.getItem('launchflow-demo-user') || '{}')
    : {};

  const user = isDemo ? demoUser : null;

  const handleSignOut = () => {
    sessionStorage.removeItem('launchflow-demo');
    sessionStorage.removeItem('launchflow-demo-user');
    navigate('/auth/demo');
  };

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-medium text-muted-foreground">
          AI Command Center
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
            5
          </span>
        </Button>
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="text-xs">
                  {user?.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email || ''}</p>
                <p className="text-xs leading-none text-muted-foreground capitalize mt-1">{user?.role || ''}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              <Settings className="mr-2 h-4 w-4" /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Create src/core/layout/AppLayout.tsx**

```typescript
import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { DemoBanner } from './DemoBanner';

export function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DemoBanner />
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

---

### Task 10: Placeholder Pages for All Routes

**Files:** Create placeholder page components for all features.

- [ ] **Step 1: Create placeholder page component template**

Each placeholder page follows the same pattern. Create these files:

1. `src/features/dashboard/pages/DashboardPage.tsx`
2. `src/features/collections/pages/CollectionsPage.tsx`
3. `src/features/collections/pages/CollectionDetailPage.tsx`
4. `src/features/products/pages/ProductsPage.tsx`
5. `src/features/products/pages/ProductDetailPage.tsx`
6. `src/features/pipeline/pages/PipelinePage.tsx`
7. `src/features/reviews/pages/ReviewsPage.tsx`
8. `src/features/marketplace/pages/MarketplacePage.tsx`
9. `src/features/content/pages/ContentPage.tsx`
10. `src/features/production/pages/ProductionPage.tsx`
11. `src/features/tasks/pages/TasksPage.tsx`
12. `src/features/notifications/pages/NotificationsPage.tsx`
13. `src/features/knowledge/pages/KnowledgePage.tsx`
14. `src/features/insights/pages/InsightsPage.tsx`
15. `src/features/analytics/pages/AnalyticsPage.tsx`
16. `src/features/integrations/pages/IntegrationsPage.tsx`
17. `src/features/settings/pages/SettingsPage.tsx`

```typescript
// Example: src/features/dashboard/pages/DashboardPage.tsx
import { motion } from 'framer-motion';

export function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">AI Command Center</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Coming in Phase 3 — AI-powered dashboard with real-time insights
        </p>
      </div>
      <div className="rounded-lg border border-dashed p-12 text-center">
        <p className="text-muted-foreground">This module will be implemented in Phase 3</p>
      </div>
    </motion.div>
  );
}
```

All placeholder pages use the same pattern. Settings page gets a more complete implementation.

- [ ] **Step 2: Create a richer SettingsPage**

```typescript
// src/features/settings/pages/SettingsPage.tsx
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/ui/card';
import { Button } from '@/core/ui/button';
import { Separator } from '@/core/ui/separator';
import { useTheme } from '@/core/theme/ThemeProvider';

export function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your workspace settings</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the look and feel of LaunchFlow AI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Theme</p>
                <p className="text-xs text-muted-foreground">Choose between light and dark mode</p>
              </div>
              <div className="flex gap-2">
                <Button variant={theme === 'light' ? 'default' : 'outline'} size="sm" onClick={() => setTheme('light')}>Light</Button>
                <Button variant={theme === 'dark' ? 'default' : 'outline'} size="sm" onClick={() => setTheme('dark')}>Dark</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure notification preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Notification settings coming in Phase 7</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Account management coming in Phase 2</p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
```

---

### Task 11: Routing Setup

**Files:**
- Modify: `src/App.tsx`
- Create: `src/router.tsx`

- [ ] **Step 1: Create src/router.tsx**

```typescript
import { createBrowserRouter, Navigate } from 'react-router';
import { AppLayout } from '@/core/layout/AppLayout';
import { ProtectedRoute } from '@/core/auth/ProtectedRoute';
import { DemoAuth } from '@/core/auth/DemoAuth';
import { SignInPage } from '@/features/auth/pages/SignInPage';
import { SignUpPage } from '@/features/auth/pages/SignUpPage';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { CollectionsPage } from '@/features/collections/pages/CollectionsPage';
import { CollectionDetailPage } from '@/features/collections/pages/CollectionDetailPage';
import { ProductsPage } from '@/features/products/pages/ProductsPage';
import { ProductDetailPage } from '@/features/products/pages/ProductDetailPage';
import { PipelinePage } from '@/features/pipeline/pages/PipelinePage';
import { ReviewsPage } from '@/features/reviews/pages/ReviewsPage';
import { MarketplacePage } from '@/features/marketplace/pages/MarketplacePage';
import { ContentPage } from '@/features/content/pages/ContentPage';
import { ProductionPage } from '@/features/production/pages/ProductionPage';
import { TasksPage } from '@/features/tasks/pages/TasksPage';
import { NotificationsPage } from '@/features/notifications/pages/NotificationsPage';
import { KnowledgePage } from '@/features/knowledge/pages/KnowledgePage';
import { InsightsPage } from '@/features/insights/pages/InsightsPage';
import { AnalyticsPage } from '@/features/analytics/pages/AnalyticsPage';
import { IntegrationsPage } from '@/features/integrations/pages/IntegrationsPage';
import { SettingsPage } from '@/features/settings/pages/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/auth/demo',
    element: <DemoAuth />,
  },
  {
    path: '/auth/sign-in',
    element: <SignInPage />,
  },
  {
    path: '/auth/sign-up',
    element: <SignUpPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'collections', element: <CollectionsPage /> },
      { path: 'collections/:id', element: <CollectionDetailPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:id', element: <ProductDetailPage /> },
      { path: 'pipeline', element: <PipelinePage /> },
      { path: 'reviews', element: <ReviewsPage /> },
      { path: 'marketplace', element: <MarketplacePage /> },
      { path: 'content', element: <ContentPage /> },
      { path: 'production', element: <ProductionPage /> },
      { path: 'tasks', element: <TasksPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'knowledge', element: <KnowledgePage /> },
      { path: 'insights', element: <InsightsPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'integrations', element: <IntegrationsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);
```

- [ ] **Step 2: Update src/App.tsx**

```typescript
import { RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/core/theme/ThemeProvider';
import { ClerkProvider } from '@/core/auth/ClerkProvider';
import { router } from '@/router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

export function App() {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
```

---

### Task 12: API Client

**Files:**
- Create: `src/api/client.ts`
- Create: `src/api/endpoints.ts`

- [ ] **Step 1: Create src/api/client.ts**

```typescript
export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || '/api';
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    // Demo mode or auth
    const isDemo = sessionStorage.getItem('launchflow-demo') === 'true';
    if (isDemo) {
      const user = JSON.parse(sessionStorage.getItem('launchflow-demo-user') || '{}');
      headers['x-demo-user'] = user.id || 'demo-owner';
    }

    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  }

  get<T>(path: string): Promise<T> {
    return this.request<T>(path);
  }

  post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  put<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  delete<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
```

- [ ] **Step 2: Create src/api/endpoints.ts**

```typescript
import { apiClient } from './client';
import type { ApiResponse } from '@/types/api';
import type { Collection, Product, Task, Notification, Review, Supplier } from '@/types/models';

// Collections
export const collectionsApi = {
  list: () => apiClient.get<ApiResponse<Collection[]>>('/collections'),
  get: (id: string) => apiClient.get<ApiResponse<Collection>>(`/collections/${id}`),
};

// Products
export const productsApi = {
  list: () => apiClient.get<ApiResponse<Product[]>>('/products'),
  get: (id: string) => apiClient.get<ApiResponse<Product>>(`/products/${id}`),
  byCollection: (collectionId: string) => apiClient.get<ApiResponse<Product[]>>(`/products/collection/${collectionId}`),
};

// Tasks
export const tasksApi = {
  list: () => apiClient.get<ApiResponse<Task[]>>('/tasks'),
  byCollection: (collectionId: string) => apiClient.get<ApiResponse<Task[]>>(`/tasks/collection/${collectionId}`),
};

// Notifications
export const notificationsApi = {
  list: () => apiClient.get<ApiResponse<Notification[]>>('/notifications'),
};

// Reviews
export const reviewsApi = {
  list: () => apiClient.get<ApiResponse<Review[]>>('/reviews'),
  byProduct: (productId: string) => apiClient.get<ApiResponse<Review[]>>(`/reviews/product/${productId}`),
};

// Suppliers
export const suppliersApi = {
  list: () => apiClient.get<ApiResponse<Supplier[]>>('/suppliers'),
};

// AI
export const aiApi = {
  readiness: (collectionId: string) => apiClient.get(`/ai/readiness/${collectionId}`),
  health: (productId: string) => apiClient.get(`/ai/health/${productId}`),
  executiveReport: () => apiClient.get('/ai/executive-report'),
  insights: () => apiClient.get('/ai/insights'),
  productDescription: (data: { name: string; category: string; material: string; color: string }) =>
    apiClient.post('/ai/product-description', data),
};
```

---

### Task 13: shadcn/ui components

- [ ] **Step 1: Create core UI components**

Following the shadcn/ui patterns, create the base UI components needed for the layout:

- `src/core/ui/button.tsx`
- `src/core/ui/card.tsx`
- `src/core/ui/avatar.tsx`
- `src/core/ui/dropdown-menu.tsx`
- `src/core/ui/separator.tsx`
- `src/core/ui/scroll-area.tsx`
- `src/core/ui/badge.tsx`
- `src/core/ui/skeleton.tsx`

These are standard shadcn/ui components. Generate them by running:

```bash
npx shadcn@latest add button card avatar dropdown-menu separator scroll-area badge skeleton -y
```

---

### Task 14: Vercel Config and Build Verification

- [ ] **Step 1: Install all dependencies**

Run: `npm install`
Expected: Clean install, no errors.

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: Build succeeds, `dist/` created with no TypeScript errors.

- [ ] **Step 3: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: No TypeScript errors.

- [ ] **Step 4: Create .gitignore**

```gitignore
node_modules/
dist/
dist-server/
.env
.env.local
*.tsbuildinfo
```

- [ ] **Step 5: Verify project structure is clean**

Expected structure matches the spec.

---

### Task 15: Final Completion Checklist

- [ ] `npm install` passes without errors
- [ ] `npm run build` succeeds (both frontend types + Vite build)
- [ ] TypeScript compilation passes (`npx tsc --noEmit`)
- [ ] All route placeholders render without crashing
- [ ] Theme toggle works (light/dark)
- [ ] Demo mode flow works (enter demo → redirect to dashboard)
- [ ] Sidebar navigation renders all items
- [ ] API health endpoint responds
- [ ] Environment variables documented in `.env.example`
- [ ] `vercel.json` configured for SPA + API routing
