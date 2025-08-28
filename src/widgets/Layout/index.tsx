import React from 'react';

import styles from './index.module.scss';

import Content from '@/widgets/Layout/ui/Content';
import Footer from '@/widgets/Layout/ui/Footer';
import Header from '@/widgets/Layout/ui/Header';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className={styles.layout}>
    <Header />
    <Content>{children}</Content>
    <Footer />
  </div>
);

export default Layout;
