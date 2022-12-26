import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';

import Comment from '../Comment';
import user from '../../../assets/user.png';
import fakeUser from '../../../assets/user6.png';
import fakeImg from '../../../assets/image.png';

function Post({ data }) {
  return (
    <div>
      <div className="border-black border-2 p-6 rounded-lg flex flex-col bg-white">
        <div className="flex mb-4">
          <img
            src={data.posterImg}
            alt="userImg"
            className="rounded-full w-[45px] h-[45px]"
          />
          <div className="flex flex-col items-baseline gap-1">
            <span className="font-bold ml-4">{data.posterName}</span>
            <span className="text-xs text-gray-300">{data.postTime}</span>
          </div>
        </div>
        <div className="space-y-4">
          <p>{data.content}</p>
          <img src={data.postImg} alt="fakeImg" className="w-full" />
        </div>
        <div className="text-[#03438D] my-5">
          <FontAwesomeIcon icon={faThumbsUp} size="xl" />
          <span className="ml-2 text-black">{data.likes}</span>
        </div>
        <div className="flex">
          <img
            src={user}
            alt="userImg"
            className="rounded-full w-[45px] h-[45px]"
          />
          <input
            type="text"
            className="border-black border-2 w-2/3 pl-4 ml-2"
            placeholder="留言..."
          />
          <button
            type="button"
            className="bg-[#03438D] text-white w-1/3 border-black border-2 border-l-0"
          >
            留言
          </button>
        </div>
        {data.comments !== [] &&
          data.comments.map((comment) => (
            <Comment key={comment.content} data={comment} />
          ))}
      </div>
    </div>
  );
}

export default Post;
