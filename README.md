# LaunchFlow AI

**AI-Product Operating System for Fashion Brands**

LaunchFlow AI is a full-stack SaaS platform that manages the complete fashion collection lifecycle — from planning and design through production, content, marketplace publishing, and AI-powered analytics.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite 6, Tailwind CSS v4, shadcn/ui |
| Backend | Vercel Serverless Functions, Express |
| Database | PostgreSQL (Neon via `@vercel/postgres`), Drizzle ORM |
| Auth | Clerk (with built-in demo mode) |
| AI | OpenAI API / OpenRouter (GPT-4o-mini) with mock fallback |
| Charts | Recharts |
| Drag & Drop | `@hello-pangea/dnd` |

## Features by Phase

### Phase 1-2: Foundation
- Clerk authentication with demo mode (sessionStorage)
- Role-based access control (owner → guest)
- 19 route pages with lazy loading + Suspense
- Feature-based module structure (`features/<name>/pages/`, `features/<name>/components/`)

### Phase 3: Dashboard & Operations
- **Dashboard**: Real-time overview — stat cards, AI-powered insights, activity feed, quick actions, recent collections
- **Collections**: CRUD, detail page with readiness radar chart, timeline, AI recommendations
- **Products**: Grid/list, detail page with health score, pricing, status pipeline

### Phase 4: Pipeline
- Kanban board with 12 product status columns (idea → optimization)
- Drag-and-drop via `@hello-pangea/dnd`
- Inline status updates

### Phase 5: Reviews & Marketplace
- **Reviews**: AI review analytics — sentiment distribution, topic extraction, summary
- **Marketplace**: Wildberries / Ozon connection management, product listings, sync status

### Phase 6: Content Studio & Production
- **Content**: Photo/video/content asset management with type icons and statuses
- **Production**: Supplier management with ratings, production batch tracking with timeline

### Phase 7: Tasks, Notifications & Knowledge
- **Tasks**: Priority-sorted task management with AI summary
- **Notifications**: Multi-channel notification center (Email/Telegram/Push) with read/unread
- **Knowledge Base**: Document management with category/tag filtering

### Phase 8: Executive Insights & Analytics
- **Insights**: Executive dashboard with revenue forecast chart, readiness breakdown, AI recommendations
- **Analytics**: Full analytics suite — revenue line chart, category bar chart, platform pie chart, order metrics
- **Integrations**: Connection management for 8 platforms (WB, Ozon, Google Drive, Telegram, Slack, Notion, Shopify, ChatGPT)

## Localization

- Default: Russian (ru) — complete, 300+ keys
- Skeleton: English (en) — same structure, empty strings, ready for translation
- All user-facing strings live in `src/locales/*.json`, accessed via `useLocale()` hook + `t(key, params)`

## Getting Started

```bash
git clone https://github.com/Kristine79/launchflow-ai
cd launchflow-ai
npm install
npm run dev
```

The app starts in demo mode — no registration required. Click "Enter Demo Mode" on the auth page.

### Environment

Copy `.env.example` to `.env.local` and configure:

```env
OPENAI_API_KEY=sk-...          # Optional — for real AI
OPENROUTER_API_KEY=sk-or-...   # Optional — alternative AI provider
DATABASE_URL=postgresql://...   # Optional — for real data
CLERK_SECRET_KEY=sk_test_...   # Optional — for Clerk auth
VITE_CLERK_PUBLISHABLE_KEY=... # Optional — for Clerk auth
```

Without any keys, the app runs fully with demo data and mock AI.

### Build

```bash
npm run build    # tsc -b && vite build — 0 errors
```

## Project Structure

```
src/
├── core/              # App-wide: layout, auth, theme, UI primitives
│   ├── auth/          # Clerk provider, RBAC, demo auth, protected routes
│   ├── i18n/          # I18nProvider, useLocale() hook
│   ├── layout/        # AppLayout, Sidebar, Header, DemoBanner
│   ├── theme/         # ThemeProvider, ThemeToggle
│   └── ui/            # shadcn/ui components (badge, button, card, etc.)
├── features/          # Feature modules
│   ├── collections/   # pages/ + components/ + hooks/
│   ├── products/
│   ├── pipeline/
│   ├── reviews/
│   ├── marketplace/
│   ├── content/
│   ├── production/
│   ├── tasks/
│   ├── notifications/
│   ├── knowledge/
│   ├── insights/
│   ├── analytics/
│   ├── integrations/
│   └── settings/
├── ai/                # AI service interfaces + mock + real implementations
├── api/               # API client & endpoint types
├── lib/               # Utilities, constants (nav items, statuses), score helpers
├── locales/           # ru.json (complete), en.json (skeleton)
└── types/             # Global type definitions
api/                   # Vercel Serverless Functions (Express)
├── index.ts           # All /api/* routes (CRUD + AI endpoints)
└── _lib/              # DB client, middleware, response helpers
db/                    # Database
├── schema/            # Drizzle schema (12 tables)
└── seed.ts            # Demo data seeder
```

## API Routes

```
GET    /health                         # Health check
GET    /collections                    # List collections
GET    /collections/:id                # Collection detail
GET    /products                       # List products
GET    /products/:id                   # Product detail
GET    /products/collection/:collId    # Products by collection
GET    /tasks                          # List tasks
GET    /notifications                  # List notifications
GET    /reviews                        # List reviews
GET    /suppliers                      # List suppliers
GET    /ai/readiness/:collectionId     # AI readiness score
GET    /ai/health/:productId           # AI product health
GET    /ai/executive-report            # AI executive report
GET    /ai/insights                    # AI future insights
POST   /ai/product-description         # AI product copy generation
```

## Deployment

Deployed on Vercel:

```bash
vercel --prod
```
