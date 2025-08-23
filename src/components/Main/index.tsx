'use client';

import styles from './index.module.scss';
import HeaderSlider from '@/components/HeaderSlider';
import Products from '@/components/Products';

const Main = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Official online store</h1>
      <HeaderSlider />
      <Products />
    </div>
  );
};

export default Main;
