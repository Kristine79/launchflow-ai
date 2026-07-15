import type { RetrievalService } from './interfaces';
import type { RagDocument, RagQuery } from './types';

export class MockRetrievalService implements RetrievalService {
  private documents: Map<string, RagDocument> = new Map();

  async indexDocument(document: RagDocument): Promise<void> {
    this.documents.set(document.id, document);
  }

  async search(query: RagQuery): Promise<RagDocument[]> {
    const results = Array.from(this.documents.values())
      .filter((doc) => {
        if (!query.filters) return true;
        return Object.entries(query.filters).every(
          ([key, value]) => doc.metadata[key as keyof typeof doc.metadata] === value
        );
      })
      .slice(0, query.topK ?? 5);
    return results.map((doc) => ({ ...doc, score: 0.85 }));
  }

  async deleteDocument(id: string): Promise<void> {
    this.documents.delete(id);
  }

  async getDocument(id: string): Promise<RagDocument | null> {
    return this.documents.get(id) ?? null;
  }
}
