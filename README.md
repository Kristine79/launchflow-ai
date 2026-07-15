# LaunchFlow AI

**AI-операционная система для fashion-брендов**

LaunchFlow AI — full-stack SaaS-платформа для управления полным жизненным циклом fashion-коллекций: от планирования и дизайна до производства, контента, публикации на маркетплейсах и AI-аналитики.

## Tech Stack

| Слой | Технология |
|------|-----------|
| Frontend | React 19, TypeScript, Vite 6, Tailwind CSS v4, shadcn/ui |
| Backend | Vercel Serverless Functions, Express |
| Database | PostgreSQL (Neon через `@vercel/postgres`), Drizzle ORM |
| Auth | Clerk (со встроенным demo-режимом) |
| AI | OpenAI API / OpenRouter (GPT-4o-mini) с fallback на mock |
| Графики | Recharts |
| Drag & Drop | `@hello-pangea/dnd` |

## Фичи по фазам

### Фаза 1-2: Фундамент
- Аутентификация через Clerk с demo-режимом (sessionStorage)
- Ролевая модель доступа (owner → guest)
- 19 маршрутов с lazy loading + Suspense
- Feature-based модульная структура (`features/<name>/pages/`, `features/<name>/components/`)

### Фаза 3: Dashboard & Operations
- **Dashboard**: реальный обзор — stat-карточки, AI-инсайты, лента активности, быстрые действия
- **Коллекции**: CRUD, детальная страница с радаром готовности, таймлайн, AI-рекомендации
- **Товары**: сетка/список, детальная страница с health score, ценообразованием, статусным конвейером

### Фаза 4: Pipeline
- Kanban-доска с 12 колонками статусов (идея → оптимизация)
- Drag-and-drop через `@hello-pangea/dnd`
- Обновление статуса без перезагрузки

### Фаза 5: Отзывы и Маркетплейсы
- **Отзывы**: AI-аналитика отзывов — распределение тональности, извлечение тем, сводка
- **Маркетплейсы**: управление подключениями WB / Ozon, листинг товаров, статус синхронизации

### Фаза 6: Контент-студия и Производство
- **Контент**: управление фото/видео/контент-ассетами с иконками типов и статусами
- **Производство**: управление поставщиками с рейтингами, отслеживание партий с таймлайном

### Фаза 7: Задачи, Уведомления и База знаний
- **Задачи**: приоритизированный список с AI-сводкой
- **Уведомления**: мультиканальный центр (Email/Telegram/Push) с прочитанным/непрочитанным
- **База знаний**: управление документами с фильтрацией по категориям и тегам

### Фаза 8: Executive Insights и Аналитика
- **Инсайты**: executive dashboard с графиком прогноза выручки, распределением готовности, AI-рекомендациями
- **Аналитика**: полный набор — линейный график выручки, столбчатая диаграмма категорий, круговая по платформам
- **Интеграции**: управление подключениями для 8 платформ (WB, Ozon, Google Drive, Telegram, Slack, Notion, Shopify, ChatGPT)

## Локализация

- По умолчанию: русский (ru) — полная, 300+ ключей
- Скелет: английский (en) — та же структура, пустые строки, готов к переводу
- Все строки интерфейса в `src/locales/*.json`, доступ через хук `useLocale()` + `t(key, params)`

## Быстрый старт

```bash
git clone https://github.com/Kristine79/launchflow-ai
cd launchflow-ai
npm install
npm run dev
```

Приложение запускается в demo-режиме — регистрация не требуется. Нажмите «Войти в демо-режим» на странице авторизации.

### Переменные окружения

Скопируйте `.env.example` в `.env.local` и настройте:

```env
OPENAI_API_KEY=sk-...          # Опционально — для реального AI
OPENROUTER_API_KEY=sk-or-...   # Опционально — альтернативный AI-провайдер
DATABASE_URL=postgresql://...   # Опционально — для реальных данных
CLERK_SECRET_KEY=sk_test_...   # Опционально — для Clerk
VITE_CLERK_PUBLISHABLE_KEY=... # Опционально — для Clerk
```

Без ключей приложение полностью работает с демо-данными и mock AI.

### Сборка

```bash
npm run build    # tsc -b && vite build — 0 ошибок
```

## Структура проекта

```
src/
├── core/              # Общеприкладное: layout, auth, theme, UI-примитивы
│   ├── auth/          # Clerk, RBAC, demo auth, protected routes
│   ├── i18n/          # I18nProvider, хук useLocale()
│   ├── layout/        # AppLayout, Sidebar, Header, DemoBanner
│   ├── theme/         # ThemeProvider, ThemeToggle
│   └── ui/            # shadcn/ui компоненты (badge, button, card, и т.д.)
├── features/          # Модули фич
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
├── ai/                # AI-service интерфейсы + mock + реальная реализация
├── api/               # API-клиент и типы endpoint'ов
├── lib/               # Утилиты, константы (nav items, статусы), score helpers
├── locales/           # ru.json (полный), en.json (скелет)
└── types/             # Глобальные TypeScript-типы
api/                   # Vercel Serverless Functions (Express)
├── index.ts           # Все /api/* маршруты (CRUD + AI endpoints)
└── _lib/              # DB client, middleware, response helpers
db/                    # База данных
├── schema/            # Drizzle-схема (12 таблиц)
└── seed.ts            # Сидер демо-данных
```

## API Routes

```
GET    /health                         # Health check
GET    /collections                    # Список коллекций
GET    /collections/:id                # Детали коллекции
GET    /products                       # Список товаров
GET    /products/:id                   # Детали товара
GET    /products/collection/:collId    # Товары по коллекции
GET    /tasks                          # Список задач
GET    /notifications                  # Список уведомлений
GET    /reviews                        # Список отзывов
GET    /suppliers                      # Список поставщиков
GET    /ai/readiness/:collectionId     # AI-оценка готовности
GET    /ai/health/:productId           # AI-оценка здоровья товара
GET    /ai/executive-report            # AI-executive report
GET    /ai/insights                    # AI-прогнозы
POST   /ai/product-description         # AI-генерация описания товара
```

## Деплой

Задеплоено на Vercel:

```bash
vercel --prod
```
