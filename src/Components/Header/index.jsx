import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/auth';

function Header() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [dropMenuShow, setDropMenuShow] = useState(false);
  return (
    <header className="bg-white border-black border-b-[3px]">
      <div className="container flex justify-between items-center">
        <h1 className="font-paytone text-[26px]">MetaWall</h1>
        <div
          className="flex flex-col relative py-4"
          onMouseOver={() => setDropMenuShow(true)}
          onFocus={() => {}}
          onMouseLeave={() => setDropMenuShow(false)}
        >
          <div className="flex items-center">
            <img
              src={user.avatar}
              alt="avatar"
              className="rounded-full w-[30px] h-[30px]"
            />
            <p className="ml-[10px] font-mono font-bold border-b-2 border-black">
              {user.name}
            </p>
          </div>
          {dropMenuShow && (
            <div className="relative">
              <ul className="font-sans flex flex-col border-2 border-black text-center w-[182px] absolute bg-white top-3 left-0 z-20">
                <li className="border-b-2 border-black hover:bg-[#EFECE7]">
                  <Link to="/#" className="py-2 block">
                    我的貼文牆
                  </Link>
                </li>
                <li className="border-b-2 border-black ">
                  <Link to="/#" className="py-2 block hover:bg-[#EFECE7]">
                    修改個人資料
                  </Link>
                </li>
                <li className="hover:bg-[#EFECE7]">
                  <button
                    className="py-2"
                    type="button"
                    onClick={() => {
                      logOut(() => {
                        navigate('/login');
                      });
                    }}
                  >
                    登出
                  </button>
                </li>
              </ul>
              <div className="absolute left-2 top-4 w-[178px] h-32 border-2 border-solid border-black bg-white" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
