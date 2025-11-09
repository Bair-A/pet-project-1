import { useEffect, useRef } from 'react';

import styles from './index.module.scss';

import { useProduct } from '@/entities/product/api/useProduct';
import { useInfiniteProducts } from '@/entities/product/api/useInfiniteProducts';

import { Loader } from '@/shared/ui/Loader';

import NewProductCard from '../../entities/product/ui/NewProductCart';

const Products = () => {
  const {
    products,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteProducts(12);
  const { product } = useProduct(1);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // keep existing debug log without special characters
    console.log(product);
  }, [product]);

  useEffect(() => {
    if (!bottomRef.current) return;
    const el = bottomRef.current;
    const observer = new IntersectionObserver(
      entries => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: '200px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [bottomRef, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader />}
      {!isLoading &&
        products?.map(prod => <NewProductCard key={prod.id} product={prod} />)}
      <div ref={bottomRef} className={styles.sentinel} />
      {isFetchingNextPage && <Loader variant="inline" />}
    </div>
  );
};

export default Products;
