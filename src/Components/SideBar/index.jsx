import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faHome } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/auth';

function Sider() {
  const { user } = useAuth();
  return (
    <div className="">
      <aside className="hidden ml-[27px] md:flex md:flex-col border-2 border-black bg-white py-8 px-6 min-w-[309px]">
        <Link
          to="/create"
          className="border-2 border-black rounded-md py-4 bg-[#03438D] text-white shadow-btn font-mono font-bold mb-6 text-center"
        >
          張貼動態
        </Link>
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
      <aside className="md:hidden fixed bottom-5 left-0 w-full px-2 bg-transparent">
        <ul className="rounded-full border-2 border-black flex justify-between px-[46px] py-[9px] bg-[#EFECE7]">
          <li>
            <Link
              to="/"
              className="block border-2 border-black rounded-full bg-white w-12 h-12 text-center"
            >
              <FontAwesomeIcon icon={faHome} size="xl" className="p-2" />
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="block border-2 border-black rounded-full bg-white w-12 h-12 text-center"
            >
              <FontAwesomeIcon icon={faBell} size="xl" className="p-2" />
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="block border-2 border-black rounded-full bg-white w-12 h-12 text-center"
            >
              <FontAwesomeIcon icon={faThumbsUp} size="xl" className="p-2" />
            </Link>
          </li>
          <li>
            <Link
              to="/create"
              className="block border-2 border-black rounded-full bg-[#03438D] w-12 h-12 text-white text-center"
            >
              <FontAwesomeIcon icon={faPlus} size="xl" className="p-2" />
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Sider;
