import styles from './index.module.scss';
import { useProducts } from '@/hooks/useProducts';

import NewProductCard from '../../entities/NewProductCart';
import Loader from '../../shared/Loader';

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
