import type { AIAgent, AgentAnalysis, AgentRecommendation } from './types';

export class AnalyticsAgent implements AIAgent {
  id = 'analytics-agent';
  name = 'Analytics AI';
  role = 'Аналитика и прогнозы';
  description = 'Прогнозирует тренды, выявляет аномалии и даёт аналитические рекомендации';

  async analyze(): Promise<AgentAnalysis> {
    return {
      status: 'healthy',
      score: 76,
      findings: [
        { type: 'revenue', severity: 'low', title: 'Рост выручки: +23% за месяц', description: 'Декабрь показал рост выручки до 890K ₽. Тренд положительный 3 месяца подряд.', impact: 'Прогноз на январь: 950K ₽', confidence: 90 },
        { type: 'seasonal', severity: 'medium', title: 'Сезонное снижение спроса в январе', description: 'На основе исторических данных ожидается снижение спроса на 12-15% в январе.', impact: 'Потенциальное снижение выручки на 120K ₽', confidence: 84 },
        { type: 'category', severity: 'low', title: 'Категория \"Платья\": рост 40%', description: 'Продажи платьев выросли на 40% — самый быстрорастущий сегмент.', impact: 'Рекомендуется увеличить долю платьев в следующих коллекциях', confidence: 87 },
      ],
      summary: 'Финансовые показатели положительные с устойчивым ростом. Сезонное снижение в январе ожидаемо. Категория платьев — драйвер роста.',
    };
  }

  async recommend(): Promise<AgentRecommendation[]> {
    return [
      { id: 'anl-rec-1', action: 'Увеличить долю платьев в Весна 2027', reason: 'Категория платьев показала рост 40% — самый быстрорастущий сегмент', priority: 'high', expectedImpact: 'Дополнительная выручка 600K ₽', confidence: 87, createTask: { title: 'Увеличить количество платьев в Весна 2027', description: 'Рассмотреть добавление 3-5 новых моделей платьев в коллекцию на основе аналитики продаж.' } },
      { id: 'anl-rec-2', action: 'Подготовиться к сезонному спаду в январе', reason: 'Ожидается снижение спроса на 12-15%', priority: 'medium', expectedImpact: 'Минимизация потерь — сохранить выручку на уровне декабря', confidence: 84, createTask: { title: 'Разработать план январских акций', description: 'Подготовить акции и скидки для компенсации сезонного спада спроса.' } },
      { id: 'anl-rec-3', action: 'Проанализировать сегмент верхней одежды', reason: 'Сегмент показывает стабильный рост 15% в месяц', priority: 'low', expectedImpact: 'Потенциал расширения категории', confidence: 73, createTask: { title: 'Анализ сегмента верхней одежды', description: 'Провести анализ конкурентов в категории верхней одежды. Оценить потенциал расширения.' } },
    ];
  }
}
