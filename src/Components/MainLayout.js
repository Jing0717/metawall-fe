import React from 'react';
import Header from './Header';
import Sider from './Sider';

const MainLayout = ({ children }) => {
  return (
    <main className='linear-gradient h-screen'>
      <Header />
      <section className='container pt-[49px]'>
        {children}
        <Sider />
      </section>
    </main>
  );
};

export default MainLayout;
