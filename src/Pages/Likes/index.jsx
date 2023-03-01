import React, { useEffect, useState, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faArrowAltCircleRight,
} from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { MainLayout } from '../../Components';
import { PostApis, UserApis } from '../../apis/apis';
import Loading from '../../Components/Loading';
import Empty from '../../Components/Empty';

const LikesItem = ({ data, removeLike }) => {
  const { createdAt, userId, _id: postID } = data;

  const timeFormat = (createdTime) => {
    const theDay = moment(createdTime);
    return theDay.format('YYYY-MM-DD HH:mm');
  };
  const handleUnLike = async () => {
    const result = await PostApis.unLike({ postID });
    if (result.status) {
      removeLike(postID);
    }
  };

  return (
    <div className="border-2 border-black rounded-lg bg-white flex justify-between items-center p-4 shadow-list">
      <div className="flex">
        <img
          src={userId.avatar}
          alt="userImg"
          className="rounded-full w-[40px] h-[40px] border-2 border-black object-cover"
        />
        <div className="flex flex-col gap-1 ml-4">
          <span className="font-bold hover:text-[#03438D] hover:underline">
            {userId.name}
          </span>
          <span className="text-xs text-[#9B9893]">
            發文時間：{timeFormat(createdAt)}
          </span>
        </div>
      </div>
      <div className="flex space-x-8">
        <button
          type="button"
          className="flex flex-col gap-1"
          onClick={handleUnLike}
        >
          <FontAwesomeIcon icon={faThumbsUp} size="xl" />
          取消
        </button>
        <Link to={`/posts/${postID}`} className="flex flex-col gap-1">
          <FontAwesomeIcon icon={faArrowAltCircleRight} size="xl" />
          查看
        </Link>
      </div>
    </div>
  );
};

const Likes = () => {
  const [likesList, setLikesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikeList = async () => {
      const result = await UserApis.getLikesList();
      if (result.status) {
        setLikesList(result.data);
        setIsLoading(false);
      }
    };

    fetchLikeList();
  }, []);

  const removeLike = (postID) => {
    const copyArr = Object.values(likesList);
    setLikesList(copyArr.filter((item) => item._id !== postID));
  };

  return (
    <MainLayout>
      <div className="flex flex-col w-full">
        <div className="relative pl-1">
          <p className="border-2 border-black text-center bg-white z-10 py-[18px] w-full absolute text-xl font-mono font-bold">
            我按讚的貼文
          </p>
          <div className="w-full border-2 border-black bg-white absolute h-[64px] right-[1px] top-[10px]" />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="mt-24 space-y-4">
            {likesList && likesList.length ? (
              likesList.map((like) => (
                <LikesItem key={like._id} data={like} removeLike={removeLike} />
              ))
            ) : (
              <Empty type="LIKES" />
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};
export default memo(Likes);
