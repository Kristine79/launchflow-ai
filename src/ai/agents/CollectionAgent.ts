import type { AIAgent, AgentAnalysis, AgentRecommendation } from './types';

export class CollectionAgent implements AIAgent {
  id = 'collection-agent';
  name = 'Collection AI';
  role = 'Управление коллекциями';
  description = 'Анализирует готовность коллекций, этапы запуска и выявляет риски';

  async analyze(): Promise<AgentAnalysis> {
    return {
      status: 'warning',
      score: 68,
      findings: [
        { type: 'readiness', severity: 'critical', title: 'Fall 2027: готовность 54%', description: 'Дизайн 90%, Производство 60%, Фото 45%, Маркетплейс 55%, Документы 78%. Ключевое отставание — производство.', impact: 'Высокий риск переноса запуска коллекции', confidence: 94 },
        { type: 'content', severity: 'high', title: 'Недостаточно контента для Весна 2027', description: 'Для коллекции Весна 2027 готово только 60% фото-контента.', impact: 'Задержка выкладки на маркетплейсы на 7-10 дней', confidence: 87 },
        { type: 'progress', severity: 'low', title: 'Лето 2027: в графике', description: 'Коллекция Лето 2027 идёт по плану, готовность 82%.', impact: 'Ожидаемый запуск в срок', confidence: 96 },
      ],
      summary: 'Из 5 коллекций только 2 в зелёной зоне. Fall 2027 требует немедленного внимания к производству. Весна 2027 нуждается в контенте.',
    };
  }

  async recommend(): Promise<AgentRecommendation[]> {
    return [
      { id: 'col-rec-1', action: 'Создать задачу по ускорению производства Fall 2027', reason: 'Производство отстаёт на 2 недели', priority: 'critical', expectedImpact: 'Восстановление графика запуска', confidence: 94, entityType: 'collection', entityId: 'col-fall-2027', createTask: { title: 'Ускорить пошив Fall 2027', description: 'Связаться с фабрикой №7, запросить дополнительную смену. Проверить наличие ткани.', assignee: 'production_manager' } },
      { id: 'col-rec-2', action: 'Запланировать фотосессию Весна 2027', reason: 'Только 60% контента готово', priority: 'high', expectedImpact: 'Своевременная выкладка на маркетплейсы', confidence: 87, entityType: 'collection', entityId: 'col-spring-2027', createTask: { title: 'Организовать фотосессию Весна 2027', description: 'Забронировать студию, моделей, фотографа. Список товаров: 8 платьев, 5 костюмов.', assignee: 'content_manager' } },
      { id: 'col-rec-3', action: 'Подготовить план Лето 2027 к следующему этапу', reason: 'Коллекция в графике — можно усилить', priority: 'low', expectedImpact: 'Опережение графика', confidence: 89, createTask: { title: 'Подготовить документы для Лето 2027', description: 'Собрать сертификаты, проверить требования маркетплейсов.' } },
    ];
  }
}
