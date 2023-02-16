import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { MainLayout } from '../../Components';
import { UserApis } from '../../apis/apis';
import Loading from '../../Components/Loading';

const FollowingItem = ({ data }) => {
  const { createdAt, user } = data;
  const timeFormat = (createdTime) => {
    const theDay = moment(createdTime);
    return theDay.format('YYYY-MM-DD HH:mm');
  };

  moment.updateLocale('zh', {
    relativeTime: {
      s: '%d 秒',
      ss: '%d 秒',
      m: '1 分鐘',
      mm: '%d 分鐘',
      h: '1 小時',
      hh: '%d 小時',
      d: '%d 天',
      dd: '%d 天',
      w: '1 週',
      ww: '%d 週',
      M: '1 個月',
      MM: '%d 月',
      y: '1 年',
      yy: '%d 年',
    },
  });

  const calculateFollowsTime = () => {
    const theDay = moment(createdAt);
    return theDay.fromNow(true);
  };

  return (
    <Link
      to={`/users/${user._id}`}
      className="border-2 border-black rounded-lg bg-white flex justify-between items-center p-4 shadow-list"
    >
      <div className="flex">
        <img
          src={user.avatar}
          alt="userImg"
          className="rounded-full w-[40px] h-[40px] border-2 border-black object-cover"
        />
        <div className="flex flex-col gap-1 ml-4">
          <span className="font-bold hover:text-[#03438D] hover:underline ">
            {user.name}
          </span>
          <span className="text-xs text-[#9B9893]">
            追蹤時間：{timeFormat(createdAt)}
          </span>
        </div>
      </div>
      <p className="text-[14px]">您已追蹤 {calculateFollowsTime()}！</p>
    </Link>
  );
};

const Follow = () => {
  const [followingList, setFollowingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFollowingList = async () => {
      const result = await UserApis.getFollowList();
      if (result.status) {
        setFollowingList(result.data[0].following);
      }
      setIsLoading(false);
    };
    fetchFollowingList();
  }, []);
  return (
    <MainLayout>
      <div className="flex flex-col w-full">
        <div className="relative pl-1">
          <p className="border-2 border-black text-center bg-white z-10 py-[18px] w-full absolute text-xl font-mono font-bold">
            追蹤名單
          </p>
          <div className="w-full border-2 border-black bg-white absolute h-[64px] right-[1px] top-[10px]" />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="mt-24 space-y-4">
            {followingList.map((following) => (
              <FollowingItem key={following.user._id} data={following} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Follow;
