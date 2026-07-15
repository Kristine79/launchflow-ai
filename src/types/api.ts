export interface ApiResponse<T> {
  data: T;
  error?: string;
  meta?: {
    total?: number;
    page?: number;
    pageSize?: number;
  };
}

export interface ApiError {
  error: string;
  status: number;
  message: string;
}
