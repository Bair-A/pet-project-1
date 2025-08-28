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

import ThemeToggle from '@/features/ThemeToggle';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href='/public'>
        Logo
      </Link>
      <div className={styles.menu}>
        <SignedOut>
          <SignInButton mode={'modal'}>
            <span className={styles.signButton}>Sign in</span>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
          <SignOutButton redirectUrl={'./'}>
            <span className={styles.signButton}>Sign out</span>
          </SignOutButton>
        </SignedIn>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
