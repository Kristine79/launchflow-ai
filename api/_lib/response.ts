export function success<T>(data: T, meta?: { total?: number; page?: number; pageSize?: number }) {
  return { data, meta };
}

export function error(message: string, status: number = 400) {
  return { error: message, status };
}
