import React from 'react';
import user from '../../assets/user.png';

function Header() {
  return (
    <header className="bg-white py-3 border-black border-b-[3px]">
      <div className="container flex justify-between items-center">
        <h1 className="font-paytone text-[26px]">MetaWall</h1>
        <div className="flex items-center">
          <img src={user} alt="" className="rounded-full w-[30px]" />
          <p className="ml-[10px] font-mono font-bold border-b-2 border-black">
            Member
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;