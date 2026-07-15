import { type EventType, type LaunchFlowEvent, type EventSubscriber } from './types';

type ListenerMap = Partial<Record<EventType, EventSubscriber[]>>;

class EventBus {
  private listeners: ListenerMap = {};
  private history: LaunchFlowEvent[] = [];
  private counter = 0;

  subscribe(type: EventType, cb: EventSubscriber): () => void {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type]!.push(cb);
    return () => {
      this.listeners[type] = this.listeners[type]?.filter(l => l !== cb);
    };
  }

  dispatch(type: EventType, actor: string, data: Record<string, unknown> = {}): LaunchFlowEvent {
    const event: LaunchFlowEvent = {
      id: `evt-${++this.counter}`,
      type,
      timestamp: new Date().toISOString(),
      actor,
      data,
    };
    this.history.push(event);
    this.listeners[type]?.forEach(cb => cb(event));
    return event;
  }

  getHistory(): LaunchFlowEvent[] {
    return [...this.history];
  }

  clearHistory(): void {
    this.history = [];
  }
}

export const eventBus = new EventBus();
