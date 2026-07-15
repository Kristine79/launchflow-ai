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

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : '*',
  credentials: true,
}));
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json(success({ status: 'ok', timestamp: new Date().toISOString() }));
});

// Collections
app.get('/collections', requireAuth, async (_req, res, next) => {
  try {
    const data = await db.select().from(collections).orderBy(collections.createdAt);
    res.json(success(data));
  } catch (e) { next(e); }
});

app.get('/collections/:id', requireAuth, async (req, res, next) => {
  try {
    const data = await db.select().from(collections).where(eq(collections.id, req.params.id)).limit(1);
    if (!data.length) return res.status(404).json(error('Collection not found', 404));
    res.json(success(data[0]));
  } catch (e) { next(e); }
});

// Products
app.get('/products', requireAuth, async (_req, res, next) => {
  try {
    const data = await db.select().from(products).orderBy(products.createdAt);
    res.json(success(data));
  } catch (e) { next(e); }
});

app.get('/products/:id', requireAuth, async (req, res, next) => {
  try {
    const data = await db.select().from(products).where(eq(products.id, req.params.id)).limit(1);
    if (!data.length) return res.status(404).json(error('Product not found', 404));
    res.json(success(data[0]));
  } catch (e) { next(e); }
});

app.get('/products/collection/:collectionId', requireAuth, async (req, res, next) => {
  try {
    const data = await db.select().from(products)
      .where(eq(products.collectionId, req.params.collectionId))
      .orderBy(products.createdAt);
    res.json(success(data));
  } catch (e) { next(e); }
});

// Tasks
app.get('/tasks', requireAuth, async (_req, res, next) => {
  try {
    const data = await db.select().from(tasks).orderBy(tasks.createdAt);
    res.json(success(data));
  } catch (e) { next(e); }
});

app.get('/tasks/collection/:collectionId', requireAuth, async (req, res, next) => {
  try {
    const data = await db.select().from(tasks)
      .where(eq(tasks.collectionId, req.params.collectionId))
      .orderBy(tasks.createdAt);
    res.json(success(data));
  } catch (e) { next(e); }
});

// Notifications
app.get('/notifications', requireAuth, async (_req, res, next) => {
  try {
    const data = await db.select().from(notifications).orderBy(notifications.createdAt);
    res.json(success(data));
  } catch (e) { next(e); }
});

// Reviews
app.get('/reviews', requireAuth, async (_req, res, next) => {
  try {
    const data = await db.select().from(reviews).orderBy(reviews.createdAt);
    res.json(success(data));
  } catch (e) { next(e); }
});

app.get('/reviews/product/:productId', requireAuth, async (req, res, next) => {
  try {
    const data = await db.select().from(reviews)
      .where(eq(reviews.productId, req.params.productId))
      .orderBy(reviews.createdAt);
    res.json(success(data));
  } catch (e) { next(e); }
});

// Suppliers
app.get('/suppliers', requireAuth, async (_req, res, next) => {
  try {
    const data = await db.select().from(suppliers).orderBy(suppliers.name);
    res.json(success(data));
  } catch (e) { next(e); }
});

// AI endpoints
app.get('/ai/readiness/:collectionId', requireAuth, async (req, res, next) => {
  try {
    const { aiService } = await import('../src/ai/service');
    const score = await aiService.generateReadinessScore(req.params.collectionId);
    res.json(success(score));
  } catch (e) { next(e); }
});

app.get('/ai/health/:productId', requireAuth, async (req, res, next) => {
  try {
    const { aiService } = await import('../src/ai/service');
    const score = await aiService.generateProductHealthScore(req.params.productId);
    res.json(success(score));
  } catch (e) { next(e); }
});

app.get('/ai/executive-report', requireAuth, async (_req, res, next) => {
  try {
    const { aiService } = await import('../src/ai/service');
    const report = await aiService.generateExecutiveReport();
    res.json(success(report));
  } catch (e) { next(e); }
});

app.get('/ai/insights', requireAuth, async (_req, res, next) => {
  try {
    const { aiService } = await import('../src/ai/service');
    const insights = await aiService.generateInsights();
    res.json(success(insights));
  } catch (e) { next(e); }
});

app.post('/ai/product-description', requireAuth, async (req, res, next) => {
  try {
    const { aiService } = await import('../src/ai/service');
    const description = await aiService.generateProductDescription(req.body);
    res.json(success(description));
  } catch (e) { next(e); }
});

// Chat
app.post('/chat', requireAuth, async (req, res, next) => {
  try {
    const { messages } = req.body;
    const lastMessage = messages?.[messages.length - 1]?.content || '';
    if (!lastMessage) return res.status(400).json(error('Message is required', 400));

    const { default: OpenAI } = await import('openai');
    const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.json(success({
        role: 'assistant',
        content: 'AI не настроен. Добавьте OPENROUTER_API_KEY или OPENAI_API_KEY в .env.local',
      }));
    }

    const client = new OpenAI({
      apiKey,
      baseURL: process.env.OPENROUTER_API_KEY ? 'https://openrouter.ai/api/v1' : undefined,
      defaultHeaders: process.env.OPENROUTER_API_KEY
        ? { 'HTTP-Referer': 'https://launchflow.ai', 'X-Title': 'LaunchFlow AI' }
        : undefined,
    });

    const systemMsg = {
      role: 'system',
      content: `Ты — AI-ассистент платформы LaunchFlow AI. Ты помогаешь fashion-брендам управлять коллекциями, производством, контентом и маркетплейсами.

Ты можешь:
- Отвечать на вопросы о платформе и её возможностях
- Помогать с описанием товаров и коллекций
- Давать советы по управлению fashion-брендом
- Анализировать данные и предлагать инсайты

Отвечай на том же языке, на котором к тебе обращаются. Будь полезным, конкретным и дружелюбным.`,
    };

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [systemMsg, ...messages.slice(-10)],
      stream: true,
      temperature: 0.5,
    });

    let fullContent = '';
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        fullContent += content;
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (e) { next(e); }
});

app.use(errorHandler);

export default app;
