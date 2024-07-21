import React, { ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: ReactNode;
  auth?: unknown;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isLogged: string =
    localStorage.getItem('isLogged') === 'yes' ? 'yes' : 'no';

  return (
    <>
      <Header isLogged={isLogged} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
