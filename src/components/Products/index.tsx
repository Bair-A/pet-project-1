import styles from './index.module.scss';
import Loader from '@/components/Loader';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';

const Products = () => {
  const { products, isLoading } = useProducts();
  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Loader />
      ) : (
        products?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default Products;
