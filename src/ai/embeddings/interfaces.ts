export interface EmbeddingService {
  generateEmbedding(text: string): Promise<number[]>;
  generateEmbeddings(texts: string[]): Promise<number[][]>;
  cosineSimilarity(a: number[], b: number[]): number;
}

export interface VectorStore {
  storeEmbedding(id: string, embedding: number[], metadata: Record<string, unknown>): Promise<void>;
  searchSimilar(embedding: number[], topK?: number): Promise<Array<{ id: string; score: number; metadata: Record<string, unknown> }>>;
  deleteEmbedding(id: string): Promise<void>;
  clear(): Promise<void>;
}
