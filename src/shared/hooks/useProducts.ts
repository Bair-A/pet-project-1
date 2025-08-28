import { productService } from '@/services/product.service';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { GetProductsResponse, Product } from '@/shared/types';

export function useProducts() {
  const { data, isLoading, error } = useQuery<
    AxiosResponse<GetProductsResponse>,
    Error,
    Product[]
  >({
    queryKey: ['products'],
    queryFn: () => productService.getProducts(),
    staleTime: 1000 * 60 * 5,
    select: response => response.data.products,
    refetchOnWindowFocus: false
  });

  return { products: data, isLoading, error };
}
