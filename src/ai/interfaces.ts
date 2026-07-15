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
