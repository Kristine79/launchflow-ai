import type { AIAgent, AgentAnalysis, AgentRecommendation, AgentFinding } from './types';
import { CEOAgent } from './CEOAgent';
import { CollectionAgent } from './CollectionAgent';
import { ProductionAgent } from './ProductionAgent';
import { MarketplaceAgent } from './MarketplaceAgent';
import { CustomerAgent } from './CustomerAgent';
import { AnalyticsAgent } from './AnalyticsAgent';

class AgentRegistry {
  private agents: Map<string, AIAgent> = new Map();

  constructor() {
    this.register(new CEOAgent());
    this.register(new CollectionAgent());
    this.register(new ProductionAgent());
    this.register(new MarketplaceAgent());
    this.register(new CustomerAgent());
    this.register(new AnalyticsAgent());
  }

  register(agent: AIAgent): void {
    this.agents.set(agent.id, agent);
  }

  get(id: string): AIAgent | undefined {
    return this.agents.get(id);
  }

  getAll(): AIAgent[] {
    return Array.from(this.agents.values());
  }

  async analyzeAll(): Promise<Map<string, AgentAnalysis>> {
    const results = new Map<string, AgentAnalysis>();
    for (const agent of this.agents.values()) {
      results.set(agent.id, await agent.analyze());
    }
    return results;
  }

  async recommendAll(): Promise<Map<string, AgentRecommendation[]>> {
    const results = new Map<string, AgentRecommendation[]>();
    for (const agent of this.agents.values()) {
      results.set(agent.id, await agent.recommend());
    }
    return results;
  }

  getAllFindings(allAnalyses: Map<string, AgentAnalysis>): AgentFinding[] {
    const findings: AgentFinding[] = [];
    for (const analysis of allAnalyses.values()) {
      findings.push(...analysis.findings);
    }
    return findings.sort((a, b) => {
      const order = { critical: 0, high: 1, medium: 2, low: 3 };
      return order[a.severity] - order[b.severity];
    });
  }

  getOverallScore(allAnalyses: Map<string, AgentAnalysis>): number {
    const scores = Array.from(allAnalyses.values()).map(a => a.score);
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }

  getOverallStatus(allAnalyses: Map<string, AgentAnalysis>): 'healthy' | 'warning' | 'critical' {
    const statuses = Array.from(allAnalyses.values()).map(a => a.status);
    if (statuses.some(s => s === 'critical')) return 'critical';
    if (statuses.some(s => s === 'warning')) return 'warning';
    return 'healthy';
  }
}

export const agentRegistry = new AgentRegistry();
