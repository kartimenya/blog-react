import React, { FC } from 'react';
import Header from '../Header/Header';
import styles from './Layout.module.scss';

type ILayout = {
  children?: React.ReactNode;
};

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <>
      <div className={styles.container}>
        <Header />
        {children}
      </div>
    </>
  );
};

export default Layout;
