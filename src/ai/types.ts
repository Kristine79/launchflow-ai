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
