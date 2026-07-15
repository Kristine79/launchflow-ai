import type { RagDocument, RagQuery } from './types';

export interface RetrievalService {
  indexDocument(document: RagDocument): Promise<void>;
  search(query: RagQuery): Promise<RagDocument[]>;
  deleteDocument(id: string): Promise<void>;
  getDocument(id: string): Promise<RagDocument | null>;
}
