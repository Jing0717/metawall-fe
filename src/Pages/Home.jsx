import React from 'react';
import { MainLayout, Filter, Search, PostsList } from '../Components';

function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col w-full">
        <section className="flex gap-3 justify-between">
          <div className="w-1/3 md:w-5/12">
            <Filter />
          </div>
          <div className="w-2/3 md:w-6/12 relative">
            <Search />
          </div>
        </section>
        <section className="mt-4 space-y-4">
          <PostsList />
        </section>
      </div>
    </MainLayout>
  );
}

export default Home;
