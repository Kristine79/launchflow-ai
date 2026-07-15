import type { AIAgent, AgentAnalysis, AgentRecommendation } from './types';

export class MarketplaceAgent implements AIAgent {
  id = 'marketplace-agent';
  name = 'Marketplace AI';
  role = 'Управление маркетплейсами';
  description = 'Анализирует эффективность каналов продаж, карточки товаров и динамику';

  async analyze(): Promise<AgentAnalysis> {
    return {
      status: 'healthy',
      score: 78,
      findings: [
        { type: 'growth', severity: 'medium', title: 'WB: взрывной рост продаж', description: 'Продажи на Wildberries выросли на 35% за последний месяц. Конверсия 8.2%.', impact: 'Потенциал увеличения выручки на 2.1M ₽', confidence: 88 },
        { type: 'optimization', severity: 'medium', title: 'Ozon: низкая конверсия карточек', description: 'Конверсия на Ozon 4.1% — ниже среднего по категории (6.5%).', impact: 'Потеря до 15% потенциальных продаж', confidence: 79 },
        { type: 'content', severity: 'low', title: 'Неполные карточки товаров', description: '30% товаров не имеют видео-контента в карточках.', impact: 'Снижение конверсии на 12% у товаров без видео', confidence: 73 },
      ],
      summary: 'Wildberries показывает отличную динамику. Ozon требует оптимизации карточек. Рекомендуется добавить видео к товарам без контента.',
    };
  }

  async recommend(): Promise<AgentRecommendation[]> {
    return [
      { id: 'mkt-rec-1', action: 'Увеличить рекламный бюджет Wildberries', reason: 'Рост продаж 35% — высокий ROI при увеличении инвестиций', priority: 'high', expectedImpact: '+2.1M ₽ выручки', confidence: 88, entityType: 'marketplace', entityId: 'wb' },
      { id: 'mkt-rec-2', action: 'Оптимизировать карточки на Ozon', reason: 'Конверсия 4.1% против средних 6.5% по категории', priority: 'high', expectedImpact: 'Рост продаж на Ozon на 30%', confidence: 79, entityType: 'marketplace', entityId: 'ozon', createTask: { title: 'Оптимизировать карточки товаров на Ozon', description: 'Обновить описания, добавить больше фото, проверить ключевые слова для топ-10 товаров.', assignee: 'content_manager' } },
      { id: 'mkt-rec-3', action: 'Добавить видео к товарам без контента', reason: '30% товаров без видео — потеря конверсии 12%', priority: 'medium', expectedImpact: 'Рост конверсии на 12% у 30% товаров', confidence: 73, createTask: { title: 'Создать видео для карточек товаров', description: 'Снять shorts-видео для 15 товаров без видео-контента. Длительность 30-60 секунд.' } },
    ];
  }
}
