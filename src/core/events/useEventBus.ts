import { useEffect, useState } from 'react';
import { eventBus } from './eventBus';
import { type EventType, type LaunchFlowEvent } from './types';

export function useEventHistory(limit = 50): LaunchFlowEvent[] {
  const [events, setEvents] = useState<LaunchFlowEvent[]>(eventBus.getHistory().slice(-limit));

  useEffect(() => {
    const unsubs: (() => void)[] = [];
    const types: EventType[] = [
      'CollectionCreated', 'CollectionPublished', 'ProductCreated',
      'TaskAssigned', 'MarketplaceConnected', 'ReviewImported',
      'NotificationSent', 'AIRecommendationGenerated',
    ];
    for (const type of types) {
      const unsub = eventBus.subscribe(type, (e) => {
        setEvents(prev => [...prev.slice(-limit + 1), e]);
      });
      unsubs.push(unsub);
    }
    return () => unsubs.forEach(u => u());
  }, [limit]);

  return events;
}

export { eventBus };
