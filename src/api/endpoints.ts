import { apiClient } from './client';
import type { ApiResponse } from '@/types/api';
import type { Collection, Product, Task, Notification, Review, Supplier } from '@/types/models';

export const collectionsApi = {
  list: () => apiClient.get<ApiResponse<Collection[]>>('/collections'),
  get: (id: string) => apiClient.get<ApiResponse<Collection>>(`/collections/${id}`),
};

export const productsApi = {
  list: () => apiClient.get<ApiResponse<Product[]>>('/products'),
  get: (id: string) => apiClient.get<ApiResponse<Product>>(`/products/${id}`),
  byCollection: (collectionId: string) => apiClient.get<ApiResponse<Product[]>>(`/products/collection/${collectionId}`),
};

export const tasksApi = {
  list: () => apiClient.get<ApiResponse<Task[]>>('/tasks'),
  byCollection: (collectionId: string) => apiClient.get<ApiResponse<Task[]>>(`/tasks/collection/${collectionId}`),
};

export const notificationsApi = {
  list: () => apiClient.get<ApiResponse<Notification[]>>('/notifications'),
};

export const reviewsApi = {
  list: () => apiClient.get<ApiResponse<Review[]>>('/reviews'),
  byProduct: (productId: string) => apiClient.get<ApiResponse<Review[]>>(`/reviews/product/${productId}`),
};

export const suppliersApi = {
  list: () => apiClient.get<ApiResponse<Supplier[]>>('/suppliers'),
};

export const aiApi = {
  readiness: (collectionId: string) => apiClient.get(`/ai/readiness/${collectionId}`),
  health: (productId: string) => apiClient.get(`/ai/health/${productId}`),
  executiveReport: () => apiClient.get('/ai/executive-report'),
  insights: () => apiClient.get('/ai/insights'),
  productDescription: (data: { name: string; category: string; material: string; color: string }) =>
    apiClient.post('/ai/product-description', data),
};
