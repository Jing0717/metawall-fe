import React, { memo, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as solidThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Comment from '../Comment';
import defaultUser from '../../../assets/user_default.png';
import { useAuth } from '../../../Context/auth';
import { CommentApis, PostApis } from '../../../apis/apis';

function Post({ data }) {
  const { user } = useAuth();
  const {
    _id: postID,
    userId,
    content,
    image,
    createdAt,
    comments,
    likes,
  } = data;
  const [commentData, setCommentData] = useState(comments);
  const [commentContent, setCommentContent] = useState('');
  const [isLiked, setIsLiked] = useState(null);
  const [likesList, setLikesList] = useState(likes);
  const avatar = userId.avatar !== '' ? userId.avatar : defaultUser;

  const timeFormat = (createdTime) => {
    const theDay = moment(createdTime);
    return theDay.format('YYYY-MM-DD HH:mm');
  };

  const handleInputOnChange = (e) => {
    setCommentContent(e.target.value);
  };

  const submitComment = async () => {
    const result = await CommentApis.create({
      postID,
      comment: commentContent,
    });
    if (result.status) {
      setCommentData([...commentData, result.data]);
      setCommentContent('');
    }
  };

  const handleClickLikes = async () => {
    const copyArr = Object.values(likesList);
    if (isLiked) {
      const result = await PostApis.unLike({ postID });
      if (result.status) {
        setIsLiked(false);
        setLikesList(copyArr.filter((likeUserID) => likeUserID !== user.id));
      }
    } else {
      const result = await PostApis.addLike({ postID });
      if (result.status) {
        setIsLiked(true);
        copyArr.push(user.id);
        setLikesList(copyArr);
      }
    }
  };

  useEffect(
    () => (likesList.includes(user.id) ? setIsLiked(true) : setIsLiked(false)),
    []
  );

  return (
    <div className="w-full">
      <div className="border-black border-2 p-6 rounded-lg flex flex-col bg-white">
        <Link to={`/users/${userId._id}`} className="flex mb-4">
          <img
            src={avatar}
            alt="userImg"
            className="rounded-full w-[45px] h-[45px] border-2 border-black object-cover"
          />
          <div className="flex flex-col gap-1 ml-4">
            <span className="font-bold">{userId.name}</span>
            <span className="text-xs text-gray-300">
              {timeFormat(createdAt)}
            </span>
          </div>
        </Link>
        <div className="space-y-4">
          <p>{content}</p>
          {image !== '' && (
            <img
              src={image}
              alt="fakeImg"
              className="w-full rounded-lg border-2 border-black"
            />
          )}
        </div>
        <button
          className="text-[#03438D] my-5 text-left"
          onClick={handleClickLikes}
          type="button"
        >
          <FontAwesomeIcon
            icon={isLiked ? solidThumbsUp : faThumbsUp}
            size="xl"
          />
          <span className="ml-2 text-black">
            {likesList.length === 0 ? '成為第一個按讚的朋友' : likesList.length}
          </span>
        </button>
        <div className="flex w-full justify-between">
          <img
            src={user.avatar}
            alt="userImg"
            className="rounded-full w-[45px] h-[45px] border-2 border-black mr-2 object-cover"
          />
          <div className="flex w-11/12">
            <input
              type="text"
              className="border-black border-2 w-full pl-4 flex-grow"
              placeholder="留言..."
              value={commentContent}
              onChange={handleInputOnChange}
            />
            <button
              type="button"
              className="bg-[#03438D] text-white w-1/3 border-black border-2 border-l-0 max-w-[128px]"
              onClick={submitComment}
            >
              留言
            </button>
          </div>
        </div>
        {commentData &&
          commentData.length > 0 &&
          commentData.map((comment) => (
            <Comment key={comment._id} data={comment} />
          ))}
      </div>
    </div>
  );
}

export default memo(Post);
