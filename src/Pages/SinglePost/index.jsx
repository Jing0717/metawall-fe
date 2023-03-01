import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '../../Components';
import Post from '../../Components/PostsList/Post';
import { PostApis } from '../../apis/apis';
import Loading from '../../Components/Loading';
import Empty from '../../Components/Empty';

const SinglePost = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notPost, setNotPost] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await PostApis.getOne({ id });
      if (result.status) {
        setData(result.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setNotPost(true);
      }
    }
    fetchData();
  }, [id]);

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (notPost) {
    content = <Empty type="POST" />;
  } else if (data) {
    content = <Post data={data} />;
  }

  return <MainLayout>{content}</MainLayout>;
};

export default memo(SinglePost);
