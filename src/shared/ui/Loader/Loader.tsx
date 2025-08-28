'use client';

import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinner} aria-label='Loading...' />
    </div>
  );
};
