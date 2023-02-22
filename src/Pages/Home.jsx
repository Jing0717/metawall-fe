import React, { useEffect, useState, memo, useLayoutEffect } from 'react';
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
      <div className="flex flex-col w-full">
        <section className="flex gap-2 justify-between">
          <Filter setListsData={setListsData} setIsLoading={setIsLoading} />
        </section>
        {isLoading ? (
          <Loading />
        ) : (
          <section className="mt-4 space-y-4">
            <PostsList data={listsData} />
          </section>
        )}
      </div>
    </MainLayout>
  );
}

export default memo(Home);
