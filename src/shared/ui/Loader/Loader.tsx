'use client';

import styles from './Loader.module.scss';

type LoaderProps = {
  variant?: 'overlay' | 'inline';
};

export const Loader = ({ variant = 'overlay' }: LoaderProps) => {
  const wrapperClass =
    variant === 'overlay' ? styles.spinnerWrapper : styles.inlineWrapper;
  return (
    <div className={wrapperClass}>
      <div className={styles.spinner} aria-label='Loading...' />
    </div>
  );
};
