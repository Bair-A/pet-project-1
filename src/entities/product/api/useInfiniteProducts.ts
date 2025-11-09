import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { productService } from '@/services/product.service';
import { GetProductsResponse, Product } from '@/shared/types';

export function useInfiniteProducts(limit = 12) {
  const query = useInfiniteQuery<AxiosResponse<GetProductsResponse>, Error>({
    queryKey: ['products', { limit }],
    queryFn: ({ pageParam = 0 }) =>
      productService.getProducts({ limit, skip: pageParam as number }),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      const { total, limit: l, skip } = lastPage.data;
      const nextSkip = (skip ?? 0) + (l ?? limit);
      return nextSkip < total ? nextSkip : undefined;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false
  });

  const products: Product[] =
    query.data?.pages.flatMap(page => page.data.products) ?? [];

  return {
    products,
    isLoading: query.isLoading,
    error: query.error,
    isSuccess: query.isSuccess,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    isFetchingNextPage: query.isFetchingNextPage
  };
}

