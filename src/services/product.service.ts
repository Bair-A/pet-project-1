import axios from 'axios';

import { PRODUCTS_PATH } from '@/shared/constants';
import { GetProductResponse, GetProductsResponse } from '@/shared/types';

class ProductService {
  getProducts() {
    return axios.get<GetProductsResponse>(PRODUCTS_PATH);
  }

  getProduct(id: number) {
    return axios.get<GetProductResponse>(`${PRODUCTS_PATH}/${id}`);
  }
}

export const productService = new ProductService();
