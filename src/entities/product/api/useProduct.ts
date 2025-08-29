import { productService } from '@/services/product.service';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { GetProductResponse } from '@/shared/types';

export function useProduct(id: number) {
  const { data, isLoading, error, isSuccess } = useQuery<
    AxiosResponse<GetProductResponse>,
    Error,
    GetProductResponse
  >({
    queryKey: ['product', id],
    queryFn: () => productService.getProduct(id),
    staleTime: 1000 * 60 * 5,
    select: response => response.data,
    refetchOnWindowFocus: false,
    enabled: !!id
  });

  return { product: data, isLoading, error, isSuccess };
}
