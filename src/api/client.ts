export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || '/api';
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    const isDemo = typeof window !== 'undefined' && sessionStorage.getItem('launchflow-demo') === 'true';
    if (isDemo) {
      try {
        const user = JSON.parse(sessionStorage.getItem('launchflow-demo-user') || '{}');
        headers['x-demo-user'] = user.id || 'demo-owner';
      } catch {
        headers['x-demo-user'] = 'demo-owner';
      }
    }

    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(err.error || `API Error: ${res.status}`);
    }

    return res.json();
  }

  get<T>(path: string): Promise<T> {
    return this.request<T>(path);
  }

  post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  put<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  delete<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
