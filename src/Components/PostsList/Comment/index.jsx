import React from 'react';

function Comments({ data }) {
  return (
    <div className="mt-[18.5px]">
      <div className="bg-[#EFECE7] rounded-lg p-4 bg-opacity-30">
        <div className="flex items-start">
          <img src={data.avtar} alt="fakeUser" />
          <div className="flex flex-col ml-3">
            <div className="flex flex-col mb-1">
              <span>{data.user}</span>
              <span className="text-[#9B9893] text-xs">{data.time}</span>
            </div>
            <p>{data.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
