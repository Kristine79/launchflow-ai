import type { AiService } from './interfaces';
import type { LaunchReadinessScore, ProductHealthScore, ExecutiveReport, FutureInsight, AiRecommendation, AiSummary } from './types';

export class MockAiService implements AiService {
  async generateReadinessScore(collectionId: string): Promise<LaunchReadinessScore> {
    const scores: Record<string, LaunchReadinessScore> = {
      'col-summer-2027': {
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
      },
      'col-spring-2027': {
        overall: 96,
        categories: {
          design: 100, samples: 100, production: 100, photos: 100, video: 90,
          seo: 95, wildberries: 100, ozon: 100, documents: 100, certificates: 100,
          tasks: 100, quality: 98, approval: 95,
        },
        summary: 'Collection is almost ready. Minor video content pending.',
        recommendations: [
          { id: '1', type: 'content', title: 'Finalize video content', description: 'Complete lookbook video', priority: 'low' },
        ],
      },
      'col-fall-2027': {
        overall: 54,
        categories: {
          design: 60, samples: 30, production: 20, photos: 10, video: 0,
          seo: 15, wildberries: 0, ozon: 0, documents: 40, certificates: 20,
          tasks: 35, quality: 50, approval: 25,
        },
        summary: 'Early planning stage. Focus on design completion and sample development.',
        recommendations: [
          { id: '1', type: 'production', title: 'Complete design phase', description: '3 models still in sketch phase', priority: 'high' },
          { id: '2', type: 'production', title: 'Order samples', description: 'No samples ordered yet', priority: 'high' },
          { id: '3', type: 'launch', title: 'Define timeline', description: 'Production timeline not set', priority: 'medium' },
        ],
      },
    };

    return scores[collectionId] || {
      overall: 72,
      categories: {
        design: 80, samples: 70, production: 65, photos: 50, video: 30,
        seo: 60, wildberries: 55, ozon: 50, documents: 75, certificates: 45,
        tasks: 78, quality: 85, approval: 70,
      },
      summary: 'Collection is progressing. Several areas need attention.',
      recommendations: [
        { id: '1', type: 'content', title: 'Complete product photography', description: 'Products need photos', priority: 'high' },
      ],
    };
  }

  async generateProductHealthScore(productId: string): Promise<ProductHealthScore> {
    const scores: Record<string, ProductHealthScore> = {
      'prod-linen-dress': {
        overall: 92,
        categories: { content: 95, photos: 80, seo: 88, reviews: 96, returns: 98 },
        recommendations: [
          { id: '1', type: 'content', title: 'Add lifestyle photos', description: 'Product has only studio shots', priority: 'low' },
        ],
      },
      'prod-basic-shirt': {
        overall: 78,
        categories: { content: 100, photos: 100, seo: 65, reviews: 55, returns: 70 },
        recommendations: [
          { id: '1', type: 'quality', title: 'Review return reasons', description: 'Return rate is 12% — above average', priority: 'high' },
          { id: '2', type: 'content', title: 'Improve SEO keywords', description: 'Add more relevant keywords', priority: 'medium' },
        ],
      },
    };

    return scores[productId] || {
      overall: 88,
      categories: { content: 90, photos: 85, seo: 80, reviews: 90, returns: 92 },
      recommendations: [
        { id: '1', type: 'content', title: 'Optimize product description', description: 'Add more details for better conversion', priority: 'medium' },
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

  async analyzeReviews(_productId: string) {
    const recommendations: AiRecommendation[] = [
      { id: '1', type: 'quality', title: 'Review sizing', description: 'Multiple customers report sizing issues', priority: 'high' },
      { id: '2', type: 'content', title: 'Update size chart', description: 'Add more detailed measurements', priority: 'medium' },
    ];
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
      recommendations,
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
