import type { Decision } from './types';

const DECISIONS: Decision[] = [
  {
    id: 'dec-prod-delay',
    problem: 'Производство отстаёт от графика',
    summary: 'Выполнено только 40% производственных задач для Весна 2027. Поставщики не подтвердили сроки.',
    severity: 'critical',
    source: 'Production Agent',
    options: [
      { id: 'opt-1', action: 'Связаться с поставщиками', description: 'Запросить подтверждение сроков у топ-3 поставщиков', type: 'task', confidence: 92, effort: 'low', impact: 'high' },
      { id: 'opt-2', action: 'Пересмотреть приоритеты производства', description: 'Определить товары для ускоренного производства', type: 'analysis', target: '/production', confidence: 85, effort: 'medium', impact: 'high' },
      { id: 'opt-3', action: 'Найти резервных поставщиков', description: 'Подготовить список альтернативных поставщиков', type: 'task', confidence: 70, effort: 'high', impact: 'medium' },
    ],
  },
  {
    id: 'dec-wb-growth',
    problem: 'Wildberries — потенциал роста +35%',
    summary: 'Увеличение ассортимента до 135 товаров может дать дополнительную выручку 890K ₽.',
    severity: 'high',
    source: 'Marketplace Agent',
    options: [
      { id: 'opt-4', action: 'Ускорить размещение новых товаров', description: 'Добавить 20 товаров на WB до конца недели', type: 'task', confidence: 88, effort: 'medium', impact: 'high' },
      { id: 'opt-5', action: 'Оптимизировать текущие карточки', description: 'Улучшить SEO и фото для 50 текущих товаров', type: 'page', target: '/marketplace', confidence: 82, effort: 'medium', impact: 'medium' },
      { id: 'opt-6', action: 'Запустить рекламную кампанию', description: 'Трафик на новые товары через рекламные инструменты WB', type: 'task', confidence: 75, effort: 'high', impact: 'medium' },
    ],
  },
  {
    id: 'dec-telegram-shop',
    problem: 'Telegram Shop — неиспользованный канал',
    summary: 'Telegram Shop может дать +15% к выручке при минимальных вложениях.',
    severity: 'medium',
    source: 'Marketplace Agent',
    options: [
      { id: 'opt-7', action: 'Настроить Telegram Shop', description: 'Интеграция с Telegram для продаж', type: 'task', confidence: 85, effort: 'medium', impact: 'medium' },
      { id: 'opt-8', action: 'Загрузить топ-30 товаров', description: 'Выбрать и загрузить товары для Telegram Shop', type: 'task', confidence: 78, effort: 'low', impact: 'medium' },
    ],
  },
  {
    id: 'dec-size-issues',
    problem: 'Жалобы на размерную сетку',
    summary: '12% отзывов содержат жалобы на несоответствие размеров у 3 моделей платьев.',
    severity: 'high',
    source: 'Customer Agent',
    options: [
      { id: 'opt-9', action: 'Проверить лекала проблемных моделей', description: 'Проверить размерную сетку товаров: A-1024, A-1025, A-1026', type: 'task', confidence: 91, effort: 'medium', impact: 'high' },
      { id: 'opt-10', action: 'Ответить на негативные отзывы', description: 'Персональные ответы на 8 негативных отзывов', type: 'task', confidence: 76, effort: 'low', impact: 'medium' },
    ],
  },
];

export class DecisionEngine {
  private decisions: Decision[] = DECISIONS;

  getCritical(): Decision | undefined {
    return this.decisions.find(d => d.severity === 'critical');
  }

  getAll(): Decision[] {
    return [...this.decisions];
  }

  getBySeverity(severity: Decision['severity']): Decision[] {
    return this.decisions.filter(d => d.severity === severity);
  }

  async diagnoseProblem(problem: string): Promise<Decision | null> {
    const normalized = problem.toLowerCase();
    if (normalized.includes('производств') || normalized.includes('delay') || normalized.includes('график')) {
      return this.decisions.find(d => d.id === 'dec-prod-delay') || null;
    }
    if (normalized.includes('wildberries') || normalized.includes('wb') || normalized.includes('рост')) {
      return this.decisions.find(d => d.id === 'dec-wb-growth') || null;
    }
    if (normalized.includes('telegram') || normalized.includes('канал')) {
      return this.decisions.find(d => d.id === 'dec-telegram-shop') || null;
    }
    if (normalized.includes('размер') || normalized.includes('отзыв') || normalized.includes('custom')) {
      return this.decisions.find(d => d.id === 'dec-size-issues') || null;
    }
    return null;
  }

  async decide(): Promise<Decision> {
    const critical = this.getCritical();
    if (critical) return critical;

    const highPriority = this.getBySeverity('high');
    if (highPriority.length > 0) return highPriority[0];

    return this.decisions[0];
  }
}

export const decisionEngine = new DecisionEngine();
