# LaunchFlow AI — Phase 1: Foundation Design

## Product Overview
LaunchFlow AI is an AI Product Operating System for fashion brands. It manages the complete collection lifecycle: planning, design, production, content, marketplace publishing, review analytics, and AI-powered decision making.

## Target Environment
- **Frontend**: Vercel (Vite + React 19 + TypeScript)
- **Backend**: Vercel Serverless Functions (Express wrapped for serverless)
- **Database**: PostgreSQL (Neon recommended for serverless via Drizzle ORM)
- **Auth**: Clerk

## Phase 1 Scope (Foundation)

The goal of Phase 1 is to establish the complete architecture skeleton: project scaffolding, auth, routing, layout, theme system, database schema, API layer, and AI service interfaces.

## Architecture

### Repository Structure
```
/
├── src/                          # React frontend
│   ├── core/                     # App-wide: layout, auth, theme, ui primitives
│   │   ├── auth/                 # Clerk provider, RBAC hook, demo auth
│   │   ├── layout/               # AppLayout, Sidebar, Header
│   │   ├── theme/                # ThemeProvider, CSS variables
│   │   └── ui/                   # shadcn/ui components
│   ├── features/                 # Feature modules (placeholders in Phase 1)
│   │   ├── dashboard/
│   │   ├── collections/
│   │   ├── products/
│   │   ├── pipeline/
│   │   ├── reviews/
│   │   ├── marketplace/
│   │   ├── content/
│   │   ├── production/
│   │   ├── tasks/
│   │   ├── notifications/
│   │   ├── knowledge/
│   │   ├── insights/
│   │   ├── analytics/
│   │   └── integrations/
│   ├── api/                      # API client, endpoints, types
│   ├── ai/                       # AI service interfaces + mock
│   ├── lib/                      # Utilities, constants, cn()
│   └── types/                    # Global TypeScript types
├── api/                          # Vercel Serverless Functions
│   ├── index.ts                  # Express app → serverless handler (all /api/* routes)
│   │
│   └── _lib/                     # Shared server utilities
│       ├── db.ts                 # Drizzle client (serverless pool)
│       ├── middleware.ts          # Auth, RBAC, error handling
│       ├── response.ts           # Response helpers (envelope)
│       └── seed.ts               # Demo seed data
├── db/                           # Database
│   ├── schema/                   # Drizzle schema files
│   │   ├── users.ts
│   │   ├── collections.ts
│   │   ├── products.ts
│   │   ├── tasks.ts
│   │   ├── notifications.ts
│   │   ├── documents.ts
│   │   ├── activity_logs.ts
│   │   ├── comments.ts
│   │   ├── suppliers.ts
│   │   ├── production.ts
│   │   └── reviews.ts
│   ├── migrations/
│   └── index.ts                  # DB connection
├── public/
├── vercel.json
├── .env.example
├── vite.config.ts
├── tsconfig.json
├── tsconfig.server.json          # Serverless function tsconfig
├── tailwind.config.ts
├── components.json
└── package.json
```

### Tech Stack (Phase 1)
- **React 19** + **TypeScript 5.x**
- **Vite 6.x** (bundler)
- **Tailwind CSS v4** + **shadcn/ui** (UI)
- **React Router v7** (routing with nested layouts)
- **TanStack Query v5** (server state)
- **Framer Motion v11** (animations)
- **Recharts** (charts — installed, used Phase 2+)
- **Clerk** (authentication)
- **Express** (API — wrapped as Vercel serverless function)
- **Drizzle ORM** (database)
- **PostgreSQL** (production: Neon; dev: local or Neon)

### Design System
- Apple × Linear × Stripe × Notion aesthetic
- Premium minimalism with generous whitespace
- HSL CSS variables for theming
- Dark/Light mode with smooth transitions
- Typography: Inter (primary), JetBrains Mono (code/monospace)
- Color palette: neutral-based with accent colors for status

### Auth & RBAC
- Clerk for authentication (sign-in, sign-up, user profile)
- Roles stored in Clerk public metadata
- Roles: Owner, CEO, Product Manager, Designer, Production Manager, Content Manager, Marketing, Employee, Guest
- `usePermissions()` hook for frontend RBAC
- Server middleware for backend RBAC

### API Layer
- Express app mounted as Vercel serverless function
- Route modules: `/api/collections`, `/api/products`, `/api/tasks`, etc.
- Drizzle ORM for all DB queries
- Middleware: auth (Clerk session verification), RBAC, error handling, CORS
- All responses: JSON with consistent envelope `{ data, error, meta }`

### AI Layer
- Interface-based abstraction for AI services
- `AiService` interface with methods: `generateText`, `analyzeSentiment`, `generateRecommendations`, `calculateScore`
- Mock implementation returning realistic demo data
- Architecture ready for OpenAI / OpenRouter swap via config

### Route Map
| Path | Page | Phase |
|------|------|-------|
| `/` | Redirect → /dashboard | 1 |
| `/dashboard` | AI Command Center | 3 |
| `/collections` | Collections | 2 |
| `/collections/:id` | Collection Detail | 2 |
| `/products` | Products | 2 |
| `/products/:id` | Product Detail | 2 |
| `/pipeline` | Product Pipeline (Kanban) | 4 |
| `/reviews` | Review Analytics | 5 |
| `/marketplace` | Marketplace Center | 5 |
| `/content` | Content Studio | 6 |
| `/production` | Production | 6 |
| `/tasks` | Tasks | 7 |
| `/notifications` | Notifications | 7 |
| `/knowledge` | Knowledge Base | 7 |
| `/insights` | AI Executive & Insights | 8 |
| `/analytics` | Analytics | 8 |
| `/integrations` | Integrations | 8 |
| `/settings` | Settings | 1 |

### Environment Variables
```
DATABASE_URL=
CLERK_SECRET_KEY=
CLERK_PUBLISHABLE_KEY=
OPENAI_API_KEY=
OPENROUTER_API_KEY=
NODE_ENV=development
```

### Deployment
- Frontend: `npm run build` → `dist/` → Vercel
- Serverless functions: `/api/*` → auto-detected by Vercel
- `vercel.json`: rewrites for SPA routing, headers, CORS
- DB: Neon PostgreSQL with connection pooling for serverless

## Demo Mode
- Visitor can explore the product without registration
- Demo account: pre-seeded with realistic collections, products, tasks, analytics
- Demo data mimics a real fashion brand workspace
- Demo banner in header indicating "Demo Mode"
- All CRUD operations work within demo session (in-memory or seeded DB)
- Clerk authentication is bypassed for demo users

## AI Knowledge Architecture (RAG-Ready)
- **Documents entity** in DB schema with metadata fields
- **Document metadata**: title, type, description, tags, source, author, created_at, updated_at
- **Vector storage abstraction**: `VectorStore` interface with methods `storeEmbedding`, `searchSimilar`, `deleteEmbedding`
- **Embedding service interface**: `EmbeddingService` with method `generateEmbedding(text: string): number[]`
- **AI retrieval layer**: `RetrievalService` interface combining vector search + keyword search
- Mock implementations: in-memory vector store, dummy embeddings
- Architecture is ready for: pgvector, Pinecone, Weaviate, or any vector DB

## Key Constraints
- All AI features use mock implementations (but production-ready interfaces)
- No real third-party API integrations (interface-ready)
- Stateless serverless-compatible architecture
- Feature-based modules for independent development
- No traditional always-running backend server
- All secrets stored via environment variables only

## Out of Scope (Phase 1)
- Real AI integrations (OpenAI/OpenRouter)
- Real marketplace APIs (Wildberries/Ozon)
- File uploads
- Real-time notifications
- Knowledge Base RAG implementation
- Full responsive testing (basic only)
- Vector database implementation (interface only)

## Phase 1 Completion Checklist
Before marking Phase 1 complete:
- [ ] `npm install` passes without errors
- [ ] `npm run build` succeeds
- [ ] TypeScript compilation passes
- [ ] No critical ESLint errors
- [ ] Application starts locally
- [ ] Vercel deployment simulation completed
- [ ] Environment variables documented
- [ ] Database connection tested
- [ ] Clerk authentication tested
- [ ] Protected routes tested

## Technical Debt to Track
- Mock AI service needs real implementation when OpenAI key is configured
- RBAC permissions are hardcoded; should become database-driven
- Serverless functions may need warm-up optimization for production
- No rate limiting yet on API routes
- Demo mode uses in-memory data; needs proper session management for production
