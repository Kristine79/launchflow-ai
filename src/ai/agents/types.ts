export interface AgentFinding {
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  confidence: number;
}

export interface AgentRecommendation {
  id: string;
  action: string;
  reason: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  expectedImpact: string;
  confidence: number;
  entityType?: string;
  entityId?: string;
  createTask?: { title: string; description: string; assignee?: string };
}

export interface AgentAnalysis {
  status: 'healthy' | 'warning' | 'critical';
  score: number;
  findings: AgentFinding[];
  summary: string;
}

export interface AIAgent {
  id: string;
  name: string;
  role: string;
  description: string;
  analyze(): Promise<AgentAnalysis>;
  recommend(): Promise<AgentRecommendation[]>;
}
