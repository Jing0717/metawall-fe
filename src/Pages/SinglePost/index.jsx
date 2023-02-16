import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '../../Components';
import Post from '../../Components/PostsList/Post';
import { PostApis } from '../../apis/apis';
import Loading from '../../Components/Loading';

const SinglePost = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await PostApis.getOne({ id });
      if (result.status) {
        setData(result.data);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return (
    <MainLayout>
      {isLoading ? <Loading /> : data && <Post data={data} />}
    </MainLayout>
  );
};

export default memo(SinglePost);
