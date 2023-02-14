import React, { memo, useEffect } from 'react';
import Post from './Post';

function PostsList({ data }) {
  const postsArray = Object.values(data);

  return (
    postsArray &&
    postsArray !== [] &&
    postsArray.map((post) => <Post key={post._id} data={post} />)
  );
}

export default memo(PostsList);
