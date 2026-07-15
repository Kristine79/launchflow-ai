import OpenAI from 'openai';
import type { AiService, AiModelProvider } from './interfaces';
import type {
  LaunchReadinessScore, ProductHealthScore, ExecutiveReport,
  FutureInsight, AiRecommendation, AiSummary,
} from './types';
import { MockAiService } from './mock';

function getProvider(): AiModelProvider {
  if (typeof process !== 'undefined' && process.env?.OPENROUTER_API_KEY) return 'openrouter';
  if (typeof process !== 'undefined' && process.env?.OPENAI_API_KEY) return 'openai';
  return 'mock';
}

function createClient(): OpenAI {
  const openrouterKey = typeof process !== 'undefined' ? process.env?.OPENROUTER_API_KEY : undefined;
  const openaiKey = typeof process !== 'undefined' ? process.env?.OPENAI_API_KEY : undefined;

  if (openrouterKey) {
    return new OpenAI({
      apiKey: openrouterKey,
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': 'https://launchflow.ai',
        'X-Title': 'LaunchFlow AI',
      },
    });
  }

  return new OpenAI({ apiKey: openaiKey });
}

const MODEL = 'gpt-4o-mini';

function extractJson(text: string): Record<string, unknown> {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)```/) || text.match(/\{[\s\S]*\}/);
  if (!match) return {};
  try { return JSON.parse(match[1] || match[0]); } catch { return {}; }
}

export class RealAiService implements AiService {
  private client: OpenAI;
  private provider: AiModelProvider;

  constructor() {
    this.provider = getProvider();
    this.client = createClient();
  }

  async generateReadinessScore(collectionId: string): Promise<LaunchReadinessScore> {
    const completion = await this.client.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant for a fashion brand's product operations platform.
Analyze the collection readiness and return a JSON object.
Collection ID: ${collectionId}

Return valid JSON (no markdown) with:
{
  "overall": <0-100>,
  "categories": {
    "design": <0-100>, "samples": <0-100>, "production": <0-100>,
    "photos": <0-100>, "video": <0-100>, "seo": <0-100>,
    "wildberries": <0-100>, "ozon": <0-100>, "documents": <0-100>,
    "certificates": <0-100>, "tasks": <0-100>, "quality": <0-100>,
    "approval": <0-100>
  },
  "summary": "<2-3 sentence analysis>",
  "recommendations": [
    { "id": "r1", "type": "content|production|quality|launch|pricing|risk", "title": "...", "description": "...", "priority": "low|medium|high" }
  ]
}`,
        },
        { role: 'user', content: `Analyze readiness score for collection ${collectionId}` },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const raw = completion.choices[0]?.message?.content || '{}';
    const data = JSON.parse(raw) as Record<string, unknown>;

    return {
      overall: (data.overall as number) || 72,
      categories: {
        design: (data.categories as any)?.design ?? 70,
        samples: (data.categories as any)?.samples ?? 70,
        production: (data.categories as any)?.production ?? 70,
        photos: (data.categories as any)?.photos ?? 70,
        video: (data.categories as any)?.video ?? 70,
        seo: (data.categories as any)?.seo ?? 70,
        wildberries: (data.categories as any)?.wildberries ?? 70,
        ozon: (data.categories as any)?.ozon ?? 70,
        documents: (data.categories as any)?.documents ?? 70,
        certificates: (data.categories as any)?.certificates ?? 70,
        tasks: (data.categories as any)?.tasks ?? 70,
        quality: (data.categories as any)?.quality ?? 70,
        approval: (data.categories as any)?.approval ?? 70,
      },
      summary: (data.summary as string) || 'Collection analysis complete.',
      recommendations: (data.recommendations as AiRecommendation[]) || [],
    };
  }

  async generateProductHealthScore(productId: string): Promise<ProductHealthScore> {
    const completion = await this.client.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant for a fashion brand. Analyze product health and return JSON.
Product ID: ${productId}

Return valid JSON:
{
  "overall": <0-100>,
  "categories": { "content": <0-100>, "photos": <0-100>, "seo": <0-100>, "reviews": <0-100>, "returns": <0-100> },
  "recommendations": [
    { "id": "r1", "type": "content|production|quality|launch|pricing|risk", "title": "...", "description": "...", "priority": "low|medium|high" }
  ]
}`,
        },
        { role: 'user', content: `Analyze product health for ${productId}` },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const raw = completion.choices[0]?.message?.content || '{}';
    const data = JSON.parse(raw);

    return {
      overall: data.overall || 85,
      categories: {
        content: data.categories?.content ?? 85,
        photos: data.categories?.photos ?? 85,
        seo: data.categories?.seo ?? 85,
        reviews: data.categories?.reviews ?? 85,
        returns: data.categories?.returns ?? 85,
      },
      recommendations: data.recommendations || [],
    };
  }

  async generateProductDescription(product: { name: string; category: string; material: string; color: string }) {
    const completion = await this.client.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: `You are a fashion copywriter. Generate product descriptions for a fashion brand.
Product: ${product.name}, Category: ${product.category}, Material: ${product.material}, Color: ${product.color}

Return JSON:
{
  "title": "...",
  "description": "...",
  "seo": "...",
  "benefits": ["...", "..."],
  "specifications": { "Material": "...", "Color": "...", ... },
  "keywords": ["...", "..."],
  "siteDescription": "...",
  "wildberriesDescription": "...",
  "ozonDescription": "..."
}`,
        },
        { role: 'user', content: `Generate product description for ${product.name}` },
      ],
      temperature: 0.5,
      response_format: { type: 'json_object' },
    });

    const raw = completion.choices[0]?.message?.content || '{}';
    const data = JSON.parse(raw);

    return {
      title: data.title || `${product.name} — Premium ${product.category}`,
      description: data.description || '',
      seo: data.seo || '',
      benefits: data.benefits || [],
      specifications: data.specifications || {},
      keywords: data.keywords || [],
      siteDescription: data.siteDescription || '',
      wildberriesDescription: data.wildberriesDescription || '',
      ozonDescription: data.ozonDescription || '',
    };
  }

  async analyzeReviews(productId: string) {
    const completion = await this.client.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: `You are a review analytics AI for a fashion brand. Analyze product reviews and return JSON.
Product ID: ${productId}

Return JSON:
{
  "total": <number>,
  "sentiment": { "positive": <percent>, "neutral": <percent>, "negative": <percent> },
  "topics": [{ "keyword": "...", "count": <number>, "sentiment": "positive|neutral|negative" }],
  "summary": "...",
  "recommendations": [{ "id": "r1", "type": "...", "title": "...", "description": "...", "priority": "low|medium|high" }]
}`,
        },
        { role: 'user', content: `Analyze reviews for product ${productId}` },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const raw = completion.choices[0]?.message?.content || '{}';
    const data = JSON.parse(raw);

    return {
      total: data.total || 0,
      sentiment: {
        positive: data.sentiment?.positive || 80,
        neutral: data.sentiment?.neutral || 15,
        negative: data.sentiment?.negative || 5,
      },
      topics: data.topics || [],
      summary: data.summary || '',
      recommendations: data.recommendations || [],
    };
  }

  async generateExecutiveReport(): Promise<ExecutiveReport> {
    const completion = await this.client.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: `You are an executive AI analyst for a fashion brand. Generate an executive report.

Return JSON:
{
  "date": "<ISO date>",
  "summary": "<2-3 sentence executive summary>",
  "readyForLaunch": <number>,
  "delayedProduction": <number>,
  "highRiskReturns": <number>,
  "stockAlerts": ["..."],
  "recommendations": [{ "id": "r1", "type": "...", "title": "...", "description": "...", "priority": "low|medium|high" }]
}`,
        },
        { role: 'user', content: 'Generate executive report' },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const raw = completion.choices[0]?.message?.content || '{}';
    const data = JSON.parse(raw);

    return {
      date: data.date || new Date().toISOString(),
      summary: data.summary || '',
      readyForLaunch: data.readyForLaunch || 0,
      delayedProduction: data.delayedProduction || 0,
      highRiskReturns: data.highRiskReturns || 0,
      stockAlerts: data.stockAlerts || [],
      recommendations: data.recommendations || [],
    };
  }

  async generateInsights(): Promise<FutureInsight[]> {
    const completion = await this.client.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: `You are a predictive AI analyst for a fashion brand. Generate future insights.

Return JSON array:
[
  { "type": "success_probability|delay_risk|return_risk|demand_forecast|price_optimization", "title": "...", "value": <0-100>, "description": "...", "entityName": "..." }
]`,
        },
        { role: 'user', content: 'Generate future insights' },
      ],
      temperature: 0.4,
      response_format: { type: 'json_object' },
    });

    const raw = completion.choices[0]?.message?.content || '{}';
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : (data.insights || []);
  }

  async generateSummary(text: string): Promise<AiSummary> {
    const completion = await this.client.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: `Summarize the following text for a fashion brand operations platform.

Return JSON:
{
  "text": "<summary>",
  "keyPoints": ["..."],
  "sentiment": "positive|neutral|negative"
}`,
        },
        { role: 'user', content: text },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const raw = completion.choices[0]?.message?.content || '{}';
    const data = JSON.parse(raw);

    return {
      text: data.text || '',
      keyPoints: data.keyPoints || [],
      sentiment: data.sentiment || 'neutral',
    };
  }
}

export function createAiService(): AiService {
  const provider = getProvider();
  if (provider === 'mock') {
    console.log('[AI] No API keys found, using mock AI service');
    return new MockAiService();
  }
  console.log(`[AI] Using ${provider} AI service`);
  return new RealAiService();
}

export const aiService = createAiService();
