'use client';

import Link from 'next/link';

import styles from './index.module.scss';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href='/'>
        Logo
      </Link>
      <SignedOut>
        <SignInButton mode={'modal'} />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

export default Header;
