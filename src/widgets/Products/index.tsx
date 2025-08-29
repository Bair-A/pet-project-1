import { useEffect } from 'react';

import styles from './index.module.scss';

import { useProduct } from '@/entities/product/api/useProduct';
import { useProducts } from '@/entities/product/api/useProducts';

import { Loader } from '@/shared/ui/Loader';

import NewProductCard from '../../entities/product/ui/NewProductCart';

const Products = () => {
  const { products, isLoading } = useProducts();
  const { product } = useProduct(1);

  useEffect(() => {
    console.log(product, 'ПРОДУКТ');
  }, [product]);

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Loader />
      ) : (
        products?.map(prod => <NewProductCard key={prod.id} product={prod} />)
      )}
    </div>
  );
};

export default Products;
