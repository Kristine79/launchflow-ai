export interface RagDocument {
  id: string;
  title: string;
  content: string;
  metadata: DocumentMetadata;
  embedding?: number[];
  score?: number;
}

export interface DocumentMetadata {
  type: string;
  description?: string;
  tags: string[];
  source: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface RagQuery {
  text: string;
  filters?: Record<string, unknown>;
  topK?: number;
}
