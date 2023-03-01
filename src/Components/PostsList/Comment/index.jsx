import moment from 'moment';
import React from 'react';

function Comments({ data }) {
  const { user, comment, createdAt } = data;

  const timeFormat = (createdTime) => {
    const theDay = moment(createdTime);
    return theDay.format('YYYY-MM-DD HH:mm');
  };

  return (
    <div className="mt-[18.5px]">
      <div className="bg-main rounded-lg p-4 bg-opacity-30">
        <div className="flex items-start">
          <img
            src={user.avatar}
            alt="commentUser"
            className="w-10 h-10 rounded-full border-2 border-black object-cover"
          />
          <div className="flex flex-col ml-3">
            <div className="flex flex-col mb-1">
              <span>{user.name}</span>
              <span className="text-[#9B9893] text-xs">
                {timeFormat(createdAt)}
              </span>
            </div>
            <p>{comment}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
