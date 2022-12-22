import React from 'react';
import loginImg from '../assets/loginImg.svg';

function LoginLayout({ children }) {
  return (
    <main className="linear-gradient h-screen flex justify-center items-center">
      <section className="border-2 border-black py-[70px] px-12 shadow-3xl  bg-main">
        <div className="flex justify-between items-center">
          <img
            className="hidden md:block mr-12"
            src={loginImg}
            alt="loginImg"
          />
          {children}
        </div>
      </section>
    </main>
  );
}

export default LoginLayout;
