import React, { useEffect, useState, memo, useLayoutEffect } from 'react';
import { MainLayout, Filter, Search, PostsList } from '../Components';
import { PostApis } from '../apis/apis';
import Loading from '../Components/Loading';

function Home() {
  const [listsData, setListsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const fetchLists = async () => {
      const result = await PostApis.getAll();
      setListsData(result.data);
      setIsLoading(false);
    };
    fetchLists();
  }, []);

  return (
    <MainLayout>
      {isLoading ? (
        <Loading />
      ) : (
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
            <PostsList data={listsData} />
          </section>
        </div>
      )}
    </MainLayout>
  );
}

export default memo(Home);
