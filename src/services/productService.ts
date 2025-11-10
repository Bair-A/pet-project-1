import axios from 'axios';

import { PRODUCTS_PATH } from '@/shared/constants';
import { GetProductResponse, GetProductsResponse } from '@/shared/types';

class ProductService {
  getProducts(params?: { limit?: number; skip?: number }) {
    return axios.get<GetProductsResponse>(PRODUCTS_PATH, { params });
  }

  getProduct(id: number) {
    return axios.get<GetProductResponse>(`${PRODUCTS_PATH}/${id}`);
  }
}

export const productService = new ProductService();
