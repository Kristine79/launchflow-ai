import { eventBus } from './eventBus';

export function initDemoEvents() {
  if (eventBus.getHistory().length > 0) return;

  eventBus.dispatch('CollectionCreated', 'Анна Смирнова', { name: 'Осень 2027', season: 'Осень', products: 24 });
  eventBus.dispatch('CollectionPublished', 'Анна Смирнова', { name: 'Весна 2027', status: 'launched' });
  eventBus.dispatch('ProductCreated', 'Иван Петров', { name: 'Платье A-1024', collection: 'Осень 2027' });
  eventBus.dispatch('TaskAssigned', 'Марина Орлова', { task: 'Фотосессия Осень 2027', assignee: 'Артём Фёдоров' });
  eventBus.dispatch('MarketplaceConnected', 'Павел Козлов', { platform: 'Wildberries', status: 'connected' });
  eventBus.dispatch('ReviewImported', 'Система', { source: 'WB', count: 156, avgRating: 4.3 });
  eventBus.dispatch('NotificationSent', 'Система', { type: 'production_alert', recipients: 3 });
  eventBus.dispatch('AIRecommendationGenerated', 'AI Engine', { type: 'pricing', confidence: 92, impact: '+480K' });
}
