'use client';

import styles from './Main.module.scss';

import HeaderSlider from '@/widgets/HeaderSlider';
import ScrollTopButton from '@/features/ScrollTopButton';

import Products from '../../widgets/Products';

const Main = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Official online store</h1>
      <HeaderSlider />
      <Products />
      <ScrollTopButton />
    </div>
  );
};

export default Main;
