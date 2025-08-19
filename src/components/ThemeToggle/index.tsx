'use client';

import { useTheme } from 'next-themes';

import styles from './index.module.scss';
import { MoonIcon, SunIcon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      color='primary'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={styles.button}
    >
      {theme === 'light' ? (
        <MoonIcon className='w-5 h-5' />
      ) : (
        <SunIcon className='w-5 h-5' />
      )}
    </button>
  );
};

export default ThemeToggle;
