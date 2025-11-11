'use client';

import Link from 'next/link';

import styles from './index.module.scss';
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import { ShoppingCart } from 'lucide-react';

import { useCartCount } from '@/app/store/cart';

import ThemeToggle from '@/features/ThemeToggle';

const Header = () => {
  const cartCount = useCartCount();

  return (
    <header className={styles.header}>
      <Link className={styles.logo} href='/'>
        Logo
      </Link>
      <div className={styles.menu}>
        <SignedOut>
          <SignInButton mode={'modal'}>
            <span className={`${styles.signButton} ${styles.signIn}`}>
              Sign in
            </span>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
          <SignOutButton redirectUrl={'./'}>
            <span className={styles.signButton}>Sign out</span>
          </SignOutButton>
        </SignedIn>
        <Link className={styles.signButton} href='/cart'>
          {' '}
          <ShoppingCart size={20} /> ({cartCount})
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
