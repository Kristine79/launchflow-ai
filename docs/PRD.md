# LaunchFlow AI — Product Requirements Document

**Version:** 0.1.0
**Status:** MVP Complete (Phases 1-8)
**Date:** July 2026

---

## 1. Product Overview

### Vision
LaunchFlow AI is an AI-powered Product Operating System for fashion brands. It unifies collection management, production tracking, marketplace operations, content management, and AI-driven analytics into a single platform — replacing fragmented workflows across spreadsheets, messengers, and separate marketplace dashboards.

### Mission
Reduce the time from design to launch for fashion collections by 40% through intelligent automation, real-time collaboration, and AI-powered decision support.

### Elevator Pitch
> One platform to plan, build, launch, and optimize fashion collections — with AI that sees what you miss.

---

## 2. Target Audience

### Primary ICP
- **Role:** Brand Owner, CEO / Founder
- **Company:** Small to mid-size fashion brands (5-200 employees)
- **Pain:** Juggling Excel/Notion/Trello + WhatsApp/Telegram + WB/Ozon dashboards
- **Need:** Single source of truth for the entire collection lifecycle

### Secondary ICP
- **Role:** Product Manager, Production Manager, Content Manager
- **Company:** Same brands
- **Pain:** No visibility into upstream/downstream dependencies, manual status updates
- **Need:** Clear task ownership, pipeline visibility, automated notifications

### Current Focus
Russian-speaking fashion brands selling on Wildberries and Ozon (hence Russian-first localization). English localization is architected but not yet filled.

---

## 3. User Personas

| Persona | Goals | Pain Points |
|---------|-------|-------------|
| **Alexey** — Brand Owner | See real-time business health, make data-driven decisions, reduce time-to-market | Spreadsheets outdated, no single dashboard, can't spot bottlenecks |
| **Anna** — Product Manager | Track collections from design to launch, manage tasks, coordinate teams | Status meetings waste time, no pipeline visibility, manual updates |
| **Elena** — Content Manager | Manage photo/video production, track marketplace listings | No asset tracking, rework due to lost files, missed deadlines |
| **Dmitry** — Production Manager | Manage suppliers, track batches, monitor quality | Late deliveries not flagged, supplier performance not tracked |

---

## 4. Core Features

### 4.1 Auth & Access Control
- Clerk-powered authentication (email + social login)
- Built-in demo mode with preloaded data (no signup required)
- Role-based access: owner, ceo, product_manager, designer, production_manager, content_manager, marketing, employee, guest

### 4.2 Dashboard
- Executive overview — stat cards (collections, products, readiness, tasks)
- AI-powered analytical summary with dynamic insights
- Recent collections with quick status glance
- Activity feed (launches, photos, production starts)
- Quick actions (new collection, new product, tasks, reviews)

### 4.3 Collections
- Collection list with status badges and launch readiness scores
- Collection detail with panoramic readiness radar
- Category-level scoring (design, samples, production, photos, video, SEO, marketplace cards, documents, certificates, tasks, quality, approval)
- AI-generated recommendations per collection
- Production timeline with milestones

### 4.4 Products
- Product grid with status, health score, and pricing
- Product detail with health breakdown, pricing analysis, and full status pipeline
- 12-status lifecycle: idea → sketch → design → sample → approval → production → photo → content → wildberries → ozon → launched → optimization

### 4.5 Pipeline (Kanban)
- Drag-and-drop Kanban board across all 12 product statuses
- Visual progress tracking for all products
- Inline status updates with optimistic UI

### 4.6 Review Analytics
- Aggregated review statistics from marketplaces
- Sentiment distribution (positive / neutral / negative)
- AI-generated insight summary with topic extraction
- Individual review list with sentiment badges

### 4.7 Marketplace Management
- Wildberries and Ozon account connections
- Per-marketplace product listing status
- Listing summary (total, active listed, pending, errors)
- Product-level marketplace sync status

### 4.8 Content Studio
- Asset management for photos, videos, and content
- Per-type completion tracking
- AI-generated content status summary
- Status badges per asset (done, in_progress, pending)

### 4.9 Production Management
- Supplier directory with ratings and material types
- Production batch tracking with timeline
- Status badges (planned, in_progress, completed, delayed)
- Active supplier and batch counts

### 4.10 Tasks
- Priority-sorted task list (urgent → high → medium → low)
- Task status workflow (todo → in_progress → review → done)
- AI-summarized team progress and overdue alerts

### 4.11 Notifications
- Multi-channel notification center
- Four types: info, warning, success, error
- Channel badges: email, telegram, push
- Unread count with mark-all-read capability

### 4.12 Knowledge Base
- Document management with tags and categories
- Category and tag filter preview
- AI summary of knowledge base health
- Last-updated tracking

### 4.13 Executive Insights
- Executive dashboard with key metrics
- Revenue forecast line chart (actual vs projected)
- Readiness breakdown donut chart
- AI-generated recommendations (production, pricing, growth)

### 4.14 Analytics
- KPI cards: total revenue, avg order value, conversion rate, active users
- Revenue dynamics line chart
- Category breakdown horizontal bar chart
- Platform distribution pie chart (WB, Ozon, Website, Retail)
- Orders bar chart

### 4.15 Integrations
- Connection management for external services
- Supported: Wildberries, Ozon, Google Drive, Telegram, Slack, Notion, Shopify, ChatGPT
- Per-service connect/disconnect controls
- Integration stats (total, active, disconnected)

---

## 5. AI Features

### 5.1 Architecture
- Interface-based design (`AiService` interface) with three implementations
- **RealAiService** — calls GPT-4o-mini via OpenRouter or OpenAI with `response_format: json_object`
- **MockAiService** — deterministic demo data with hardcoded responses per entity ID
- Automatic provider selection: OpenRouter API key → OpenAI API key → Mock

### 5.2 AI Capabilities
| Feature | Endpoint | Output |
|---------|----------|--------|
| Collection Readiness Score | `GET /ai/readiness/:id` | 13-category 0-100 scores + recommendations |
| Product Health Score | `GET /ai/health/:id` | 5-category scores + recommendations |
| Executive Report | `GET /ai/executive-report` | Summary, launch readiness, risk alerts |
| Future Insights | `GET /ai/insights` | Probability scores, forecasts, optimizations |
| Product Description | `POST /ai/product-description` | SEO, benefits, marketplace descriptions |
| Text Summary | `generateSummary()` | Key points, sentiment |

### 5.3 Prompt Design
Every AI prompt uses:
- System message with role definition + strict JSON schema
- `response_format: { type: 'json_object' }` for guaranteed parseable output
- Low temperature (0.3) for deterministic results
- Russian/English output based on context

---

## 6. Technical Architecture

### 6.1 Frontend
- **Framework:** React 19 with TypeScript
- **Bundler:** Vite 6
- **Routing:** React Router v7 with lazy loading
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **State:** TanStack React Query v5 (configured)
- **Animations:** Framer Motion v11
- **Charts:** Recharts v2

### 6.2 Backend
- **Runtime:** Vercel Serverless Functions (Node.js)
- **Framework:** Express wrapped for serverless
- **Auth:** Clerk backend SDK + custom middleware

### 6.3 Database
- **Provider:** Neon (Serverless PostgreSQL)
- **ORM:** Drizzle ORM with `drizzle-orm/vercel-postgres`
- **Schema:** 12 tables — collections, products, tasks, notifications, reviews, suppliers, production_batches, users, activity_logs, comments, documents, roles

### 6.4 AI Layer
- **Provider:** OpenRouter (primary) → OpenAI (fallback)
- **Model:** `gpt-4o-mini`
- **SDK:** `openai` npm package v4
- **Security:** API keys in `process.env`, never exposed to client

---

## 7. Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Module structure | Feature-based | Co-locates pages, components, and hooks by domain |
| Localization | JSON files in `src/locales/` | Bundled at build time, O(1) lookup via flattened cache |
| Locale default | Russian | Target market is Russian-speaking fashion brands |
| Drag-and-drop | `@hello-pangea/dnd` | Modern maintained fork of react-beautiful-dnd |
| Dropdown menu | Custom Context-based | Full control over positioning and state (no Radix dependency) |
| AI provider | OpenRouter first | Single API for multiple model providers, unified billing |
| Demo mode | sessionStorage | No backend dependency for evaluation |
| Pricing display | RUB (₽) | Primary market is Russia |

---

## 8. Current State & Roadmap

### ✅ Phase 1 — Foundation (Complete)
- Project scaffolding, Vite + React + TypeScript, Tailwind v4, shadcn/ui
- Clerk auth with demo mode
- Router with 19 lazy-loaded routes
- Express API server with 12 CRUD endpoints
- Drizzle schema (12 tables) + seed data
- AI interfaces (AiService) + MockAiService

### ✅ Phase 2 — Collections & Products (Complete)
- Collection list + detail with readiness radar, timeline, AI recommendations
- Product list + detail with health score, pricing, status pipeline

### ✅ Phase 3 — Dashboard (Complete)
- StatCard, StatCardGrid, AiOverview, RecentCollections, ActivityFeed, QuickActions
- I18n infrastructure, migration to useLocale() throughout

### ✅ Phase 4 — Pipeline (Complete)
- Kanban board with drag-and-drop
- 12-column product status workflow

### ✅ Phase 5 — Reviews & Marketplace (Complete)
- Review analytics, sentiment, AI insights
- Marketplace connections, product listings

### ✅ Phase 6 — Content & Production (Complete)
- Asset management, supplier directory, batch tracking

### ✅ Phase 7 — Tasks, Notifications & Knowledge (Complete)
- Priority tasks, notification center, knowledge base

### ✅ Phase 8 — Insights, Analytics & Integrations (Complete)
- Executive dashboard with charts
- Full analytics suite with Recharts
- 8 integration connection cards

### 🔜 Phase 9 — Data Layer & Real API
- Replace all DEMO_* arrays with actual API calls to backend
- React Query hooks for all data fetching
- Loading, error, and empty states for every page

### 🔜 Phase 10 — i18n & UX Polish
- Language switcher in Header/Settings
- Complete English translation (en.json)
- Keyboard shortcuts, advanced filtering, bulk operations
- Mobile-responsive sidebar

### 🔜 Phase 11 — Advanced AI
- RAG-based knowledge base search
- AI image generation for product photos
- Predictive analytics with time-series forecasting
- Automated marketplace listing optimization

### 🔜 Phase 12 — Production Launch
- Stripe/LemonSqueezy billing integration
- Team invitation flows
- Audit logging
- SOC-2 readiness

---

## 9. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Time-to-launch reduction | 40% | Collection cycle time |
| User activation | 60% D7 retention | Users who create/manage a collection |
| AI insight accuracy | >90% | User feedback on recommendations |
| Page load time | <2s | Lighthouse / Web Vitals |
| Build stability | 0 errors | CI pipeline |

---

## 10. Competitive Landscape

| Competitor | Strengths | Weaknesses vs LaunchFlow |
|------------|-----------|-------------------------|
| Excel / Google Sheets | Universal, cheap | No automation, no AI, no real-time sync |
| Trello / Notion | Flexible, familiar | Not fashion-specific, no marketplace integration |
| Asana / Wrike | Powerful project management | No pipeline view, no AI, no content management |
| Marketplace dashboards (WB/Ozon) | Official data | Siloed, no cross-platform view, no planning tools |

**LaunchFlow Differentiator:** Purpose-built for fashion brands with AI that understands collection readiness, marketplace performance, and production risks — not just a generic project management tool.
