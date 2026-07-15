export interface DecisionOption {
  id: string;
  action: string;
  description: string;
  type: 'task' | 'page' | 'analysis' | 'external';
  target?: string;
  confidence: number;
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
}

export interface Decision {
  id: string;
  problem: string;
  summary: string;
  options: DecisionOption[];
  severity: 'critical' | 'high' | 'medium' | 'low';
  source: string;
  expiresAt?: string;
}
