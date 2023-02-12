import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '../../Context/auth';

function Sider() {
  const { user } = useAuth();
  return (
    <aside className="hidden ml-[27px] md:flex flex-col border-2 border-black bg-white py-8 px-6 min-w-[309px]">
      <button
        type="button"
        className="border-2 border-black rounded-md py-4 bg-[#03438D] text-white shadow-btn font-mono font-bold mb-6"
      >
        張貼動態
      </button>
      <ul className="pl-2 space-y-2">
        <li className="flex items-center">
          <img
            src={user.avatar}
            alt="avatar"
            className="rounded-full w-[50px] h-[50px] border-2 border-black object-cover"
          />
          <span className="font-bold ml-4">{user.name}</span>
        </li>
        <li className="flex items-center">
          <FontAwesomeIcon
            icon={faBell}
            size="xl"
            className="rounded-full border-black border-2 p-3 bg-[#E2EDFA]"
          />
          <span className="font-bold ml-4">追蹤名單</span>
        </li>
        <li className="flex items-center">
          <FontAwesomeIcon
            icon={faThumbsUp}
            size="xl"
            className="rounded-full border-black border-2 p-3 bg-[#E2EDFA]"
          />
          <span className="font-bold ml-4">我按讚的文章</span>
        </li>
      </ul>
    </aside>
  );
}

export default Sider;
