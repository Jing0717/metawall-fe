import React, { memo, useEffect } from 'react';
import Post from './Post';
import Empty from '../Empty';

function PostsList({ data }) {
  const postsArray = Object.values(data);

  return postsArray && postsArray.length ? (
    postsArray.map((post) => <Post key={post._id} data={post} />)
  ) : (
    <Empty type="POSTS" />
  );
}

export default memo(PostsList);
