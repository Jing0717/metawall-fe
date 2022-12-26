import React from 'react';
import Header from '../Header';
import SideBar from '../SideBar';

function MainLayout({ children }) {
  return (
    <main className="linear-gradient bg-repeat pb-16 min-h-screen">
      <Header />
      <section className="container flex pt-[49px] justify-between items-start">
        {children}
        <SideBar />
      </section>
    </main>
  );
}

export default MainLayout;
