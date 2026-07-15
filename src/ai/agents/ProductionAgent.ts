import type { AIAgent, AgentAnalysis, AgentRecommendation } from './types';

export class ProductionAgent implements AIAgent {
  id = 'production-agent';
  name = 'Production AI';
  role = 'Управление производством';
  description = 'Контролирует поставщиков, производственные партии и выявляет задержки';

  async analyze(): Promise<AgentAnalysis> {
    return {
      status: 'warning',
      score: 65,
      findings: [
        { type: 'supplier', severity: 'high', title: 'Фабрика №7: задержка поставки ткани', description: 'Поставка ткани для Fall 2027 задерживается на 10 дней. Причина — логистические проблемы.', impact: 'Задержка всего производства Fall 2027', confidence: 95 },
        { type: 'quality', severity: 'medium', title: 'QC: повышенный процент брака', description: 'В партии B-789 выявлено 8% брака при норме 3%.', impact: 'Дополнительные затраты на перепроизводство', confidence: 82 },
        { type: 'capacity', severity: 'low', title: 'Загрузка фабрик: 85%', description: 'Фабрика №7 загружена на 85%. Доступен резерв для ускорения.', impact: 'Возможность увеличения объёмов при необходимости', confidence: 76 },
      ],
      summary: 'Производственный сектор под давлением. Ключевая проблема — задержка поставки ткани от Фабрики №7. Рекомендуется искать альтернативного поставщика.',
    };
  }

  async recommend(): Promise<AgentRecommendation[]> {
    return [
      { id: 'prod-rec-1', action: 'Найти альтернативного поставщика ткани', reason: 'Текущий поставщик задерживает поставку на 10 дней', priority: 'critical', expectedImpact: 'Снижение риска задержки на 90%', confidence: 95, createTask: { title: 'Поиск альтернативного поставщика ткани', description: 'Проверить поставщиков из списка. Требования: артикул F-1024, цвет чёрный, 500 м.', assignee: 'production_manager' } },
      { id: 'prod-rec-2', action: 'Усилить контроль качества на фабрике', reason: 'Процент брака вырос до 8%', priority: 'high', expectedImpact: 'Снижение брака до 3%', confidence: 82, createTask: { title: 'Провести внеплановый QC', description: 'Усилить контроль качества на партии B-789. Проверить швы, ткань, фурнитуру.' } },
      { id: 'prod-rec-3', action: 'Увеличить смены на Фабрике №7', reason: 'Резерв мощности 15% позволяет ускорить производство', priority: 'medium', expectedImpact: 'Сокращение срока производства на 5 дней', confidence: 76, createTask: { title: 'Согласовать дополнительные смены', description: 'Обсудить с Фабрикой №7 возможность работы в 2 смены для ускорения Fall 2027.' } },
    ];
  }
}
