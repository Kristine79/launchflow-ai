import { useQuery } from '@tanstack/react-query';
import { collectionsApi } from '@/api/endpoints';

export function useCollections() {
  return useQuery({
    queryKey: ['collections'],
    queryFn: () => collectionsApi.list(),
  });
}

export function useCollection(id: string) {
  return useQuery({
    queryKey: ['collection', id],
    queryFn: () => collectionsApi.get(id),
    enabled: !!id,
  });
}
