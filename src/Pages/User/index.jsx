import React, { useEffect, useState, memo } from 'react';
import { useParams } from 'react-router-dom';
import { UserApis } from '../../apis/apis';
import { useAuth } from '../../Context/auth';
import { Filter, MainLayout, Search } from '../../Components';
import Post from '../../Components/PostsList/Post';

const User = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [listData, setListData] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [isFollowed, setIsFollowed] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await UserApis.getUserProfiles({ id });
      setListData(result.data.post);
      setUserInfo(result.data.user);
    };
    fetchData();
    if (user.id === id) {
      setDisabled(true);
    }
  }, [id]);

  useEffect(() => {
    if (userInfo.followers?.some((follower) => follower.user === user.id)) {
      setIsFollowed(true);
    }
  }, [userInfo]);

  const handleFollowing = async () => {
    if (isFollowed) {
      const result = await UserApis.unFollow({ id });
      if (result.status) {
        setIsFollowed(false);
        const copyArr = Array.from(userInfo.followers);
        const followResult = copyArr.filter((item) => item.user !== user.id);
        setUserInfo({ ...userInfo, followers: followResult });
      }
    } else {
      const result = await UserApis.follow({ id });
      if (result.status) {
        setIsFollowed(true);
        const copyArr = Array.from(userInfo.followers);
        copyArr.push({ user: user.id, createdAt: '' });
        setUserInfo({ ...userInfo, followers: copyArr });
      }
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col w-full">
        <div className="relative">
          <div className="border-2 border-black text-center bg-white z-10 h-[80px] py-[18px] w-full absolute text-xl font-mono font-bold rounded-lg flex">
            {userInfo && (
              <div className="flex justify-between items-center w-full">
                <div className="flex">
                  <img
                    src={userInfo.avatar}
                    alt=""
                    className="h-[76px] w-20 absolute top-0 border-r-2 border-black rounded-l-lg object-cover"
                  />
                  <div className="flex flex-col ml-24 items-baseline justify-center space-y-0">
                    <p className="font-bold text-base">{userInfo.name}</p>
                    {userInfo.followers && (
                      <p className="text-[14px]">
                        {`${userInfo?.followers?.length}人追蹤`}
                      </p>
                    )}
                  </div>
                </div>
                {!disabled && (
                  <button
                    type="button"
                    className={`border-2 border-black ${
                      isFollowed ? 'bg-[#EFECE7]' : 'bg-[#EEC32A]'
                    }  rounded-lg py-[6px] px-8 shadow-list mr-4`}
                    onClick={handleFollowing}
                  >
                    {isFollowed ? '取消追蹤' : '追蹤'}
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="w-full border-2 border-black bg-white absolute h-[80px] rounded-lg mt-2 right-2" />
        </div>
        <section className="mt-24 w-full mb-3">
          <div className="flex justify-between">
            <div className="w-1/3 md:w-5/12">
              <Filter />
            </div>
            <div className="w-2/3 md:w-6/12 relative">
              <Search />
            </div>
          </div>
        </section>
        {listData &&
          listData !== [] &&
          listData.map((post) => <Post key={post._id} data={post} />)}
      </div>
    </MainLayout>
  );
};

export default memo(User);
