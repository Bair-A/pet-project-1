import styles from './index.module.scss';

import NewProductCard from '@/entities/NewProductCart';

import { useProducts } from '@/shared/hooks/useProducts';
import { Loader } from '@/shared/ui/Loader';

const Products = () => {
  const { products, isLoading } = useProducts();
  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Loader />
      ) : (
        products?.map(product => (
          <NewProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default Products;
