import styles from './index.module.scss';
import Loader from '@/components/Loader';
import NewProductCard from '@/components/NewProductCart';
import { useProducts } from '@/hooks/useProducts';

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
