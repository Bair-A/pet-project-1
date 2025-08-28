'use client';

import styles from './index.module.scss';

import { useUser } from '@/app/store/auth';

import { YEAR } from '@/widgets/Layout/ui/Footer/const/footer.constants';

export default function Footer() {
  const user = useUser();

  return (
    <footer className={styles.footer}>
      {YEAR} {user ? `Logged as ${user.email}` : ''}
    </footer>
  );
}
