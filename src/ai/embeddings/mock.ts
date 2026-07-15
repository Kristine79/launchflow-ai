import type { EmbeddingService, VectorStore } from './interfaces';

export class MockEmbeddingService implements EmbeddingService {
  async generateEmbedding(_text: string): Promise<number[]> {
    return new Array(1536).fill(0).map(() => Math.random() * 2 - 1);
  }

  async generateEmbeddings(texts: string[]): Promise<number[][]> {
    return Promise.all(texts.map((t) => this.generateEmbedding(t)));
  }

  cosineSimilarity(a: number[], b: number[]): number {
    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dot / (magA * magB);
  }
}

export class MockVectorStore implements VectorStore {
  private store: Map<string, { embedding: number[]; metadata: Record<string, unknown> }> = new Map();

  async storeEmbedding(id: string, embedding: number[], metadata: Record<string, unknown>): Promise<void> {
    this.store.set(id, { embedding, metadata });
  }

  async searchSimilar(embedding: number[], topK = 10): Promise<Array<{ id: string; score: number; metadata: Record<string, unknown> }>> {
    const embedService = new MockEmbeddingService();
    const results = Array.from(this.store.entries()).map(([id, data]) => ({
      id,
      score: embedService.cosineSimilarity(embedding, data.embedding),
      metadata: data.metadata,
    }));
    return results.sort((a, b) => b.score - a.score).slice(0, topK);
  }

  async deleteEmbedding(id: string): Promise<void> {
    this.store.delete(id);
  }

  async clear(): Promise<void> {
    this.store.clear();
  }
}
