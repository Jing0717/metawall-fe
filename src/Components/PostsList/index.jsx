import React from 'react';
import Post from './Post';

import fakeUser from '../../assets/user6.png';
import postImg1 from '../../assets/image.png';
import postImg2 from '../../assets/image2.png';
import user from '../../assets/user.png';

const ListData = [
  {
    posterName: '邊緣小杰',
    postTime: '2022/1/10 12:00',
    posterImg: `${user}`,
    content: '外面看起來就超冷.... 我決定回被窩繼續睡....>.<',
    likes: 12,
    postImg: `${postImg1}`,
    comments: [
      {
        user: '希琳',
        content: '真的～我已經準備冬眠了',
        time: '2022/1/11 10:00',
        avtar: `${fakeUser}`,
      },
      {
        user: '波吉',
        content: '會嗎？我沒穿衣服都不覺得冷',
        time: '2022/1/11 10:00',
        avtar: `${fakeUser}`,
      },
    ],
  },
  {
    posterName: '米卡莎',
    postTime: '2022/1/10 12:00',
    posterImg: `${user}`,
    content: '搶到想要的 NFT 啦！ya~~',
    likes: 13,
    postImg: `${postImg2}`,
    comments: [],
  },
];

function PostsList() {
  return (
    ListData && ListData.map((post) => <Post key={post.content} data={post} />)
  );
}

export default PostsList;
