import React from 'react';
import { MainLayout, Filter, Search } from '../Components';

function Home() {
  return (
    <section className="">
      <MainLayout>
        <section className="flex gap-3 justify-between w-full">
          <div className="w-1/3 md:w-5/12">
            <Filter />
          </div>
          <div className="w-2/3 md:w-6/12 relative">
            <Search />
          </div>
        </section>
      </MainLayout>
    </section>
  );
}

export default Home;
