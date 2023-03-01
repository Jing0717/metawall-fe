import React, { useState, memo, useLayoutEffect } from 'react';
import { MainLayout, Filter, PostsList } from '../Components';
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
      <section className="flex flex-col w-full">
        <div className="flex flex-col w-full gap-2 space-y-2  justify-between md:flex-row md:items-center md:space-y-0">
          <Filter setListsData={setListsData} setIsLoading={setIsLoading} />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="mt-4 space-y-4">
            <PostsList data={listsData} />
          </div>
        )}
      </section>
    </MainLayout>
  );
}

export default memo(Home);
