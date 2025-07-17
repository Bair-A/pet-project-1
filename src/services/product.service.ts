import { PRODUCTS_PATH } from '@/constants';
import axios from 'axios';

import { Product } from '@/shared/types';

class ProductService {
  getProducts() {
    return axios.get(PRODUCTS_PATH);
  }

  getProductById(id: string) {
    return axios.get<{ data: { products: Product } }>(`${PRODUCTS_PATH}/${id}`);
  }
}

export const productService = new ProductService();
