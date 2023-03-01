import React from 'react';

const EMPTY_WORDING = {
  POST: '查無該篇文章，請確認 ID 後，重新查詢',
  POSTS: '目前尚無動態，新增一則貼文吧！',
  LIKES: '目前尚無按讚的貼文，快去找喜歡的文章吧！',
  FOLLOWS: '目前尚無追蹤任何人，快去追蹤喜歡的作者吧！',
  USER: '該使用者目前無任何文章',
};

const Empty = ({ type }) => {
  const emptyType = EMPTY_WORDING[type];
  return (
    <div className="border-2 border-black rounded-lg bg-white w-full">
      <div className="border-b-2 border-black p-4">
        <span className="inline-block w-[9px] h-[9px] border-[1px] border-gray-600 rounded-full mr-[6px] bg-red-500" />
        <span className="inline-block w-[9px] h-[9px] border-[1px] border-gray-600  rounded-full mr-[6px] bg-yellow-400" />
        <span className="inline-block w-[9px] h-[9px] border-[1px] border-gray-600  rounded-full mr-[6px] bg-green-500" />
      </div>
      <div className="text-gray-600 p-20 md:p-32 text-center">{emptyType}</div>
    </div>
  );
};

export default Empty;
