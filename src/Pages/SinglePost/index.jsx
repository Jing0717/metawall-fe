import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '../../Components';
import Post from '../../Components/PostsList/Post';
import { PostApis } from '../../apis/apis';

const SinglePost = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const result = await PostApis.getOne({ id });
      if (result.status) {
        setData(result.data);
      }
    }
    fetchData();
  }, [data]);

  return <MainLayout>{data && <Post data={data} />}</MainLayout>;
};

export default memo(SinglePost);
