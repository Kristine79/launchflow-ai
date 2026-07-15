export type EventType =
  | 'CollectionCreated'
  | 'CollectionPublished'
  | 'ProductCreated'
  | 'TaskAssigned'
  | 'MarketplaceConnected'
  | 'ReviewImported'
  | 'NotificationSent'
  | 'AIRecommendationGenerated';

export interface LaunchFlowEvent {
  id: string;
  type: EventType;
  timestamp: string;
  actor: string;
  data: Record<string, unknown>;
}

export type EventSubscriber = (event: LaunchFlowEvent) => void;
