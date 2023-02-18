import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import defaultAvatar from '../../assets/user_default.png';
import { useAuth } from '../../Context/auth';

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

const Message = ({ content, createdAt, userId }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { _id, avatar, name, coin } = userId;
  const [isSelf, setIsSelf] = useState(false);

  const timeFormat = (createdTime) => {
    const theDay = moment(createdTime);
    return theDay.fromNow(true);
  };

  const handleAvatarOnClick = (id) => {
    navigate(`/users/${id}`);
  };

  useEffect(() => {
    if (user.id === _id) {
      setIsSelf(true);
    }
  }, []);

  return (
    <div className="w-full">
      <div
        className={`flex gap-x-4 ${isSelf ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <button
          className="flex"
          onClick={() => handleAvatarOnClick(_id)}
          type="button"
        >
          <img
            src={avatar === '' ? defaultAvatar : avatar}
            alt=""
            className="rounded-full w-14 h-14 object-cover
          "
          />
        </button>
        <div className={`flex flex-col justify-between `}>
          <div
            className={`flex pb-4 items-center gap-x-8 ${
              isSelf ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <span className="font-bold">{name}</span>
            <span className="text-sm">{timeFormat(createdAt)}前</span>
          </div>
          <div className="max-w-xs  bg-gray-100 rounded-lg p-2">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;
