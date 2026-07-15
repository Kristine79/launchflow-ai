import type { CollectionStatus, ProductStatus, TaskPriority, Role } from '@/lib/constants';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Collection {
  id: string;
  name: string;
  season: string;
  launchDate: string;
  status: CollectionStatus;
  progress: number;
  readinessScore: number;
  productCount: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  collectionId: string;
  name: string;
  sku: string;
  status: ProductStatus;
  size: string;
  color: string;
  material: string;
  supplier: string;
  factory: string;
  costPrice: number;
  recommendedPrice: number;
  healthScore: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: TaskPriority;
  assigneeId?: string;
  collectionId?: string;
  productId?: string;
  dueDate?: string;
  parentId?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  channel?: string;
  createdAt: string;
}

export interface Document {
  id: string;
  title: string;
  type: string;
  description?: string;
  tags: string[];
  source: string;
  author: string;
  fileUrl?: string;
  collectionId?: string;
  productId?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  entityType: string;
  entityId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  materialType?: string;
  rating: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface ProductionBatch {
  id: string;
  productId: string;
  supplierId?: string;
  quantity: number;
  status: 'planned' | 'in_progress' | 'completed' | 'delayed';
  startDate?: string;
  endDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  rating: number;
  content: string;
  author?: string;
  platform?: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  createdAt: string;
}
