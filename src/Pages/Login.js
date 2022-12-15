import React from 'react';
import LoginLayout from '../Components/LoginLayout';
import metawall from '../assets/MetaWall.png';

const Login = () => {
  return (
    <>
      <LoginLayout>
        <section className='flex flex-col items-center'>
          <img src={metawall} alt='metawall' className='w-[296px] h-[84px]' />
          <h2 className='text-2xl font-bold mb-9'>到元宇宙展開全新社交圈</h2>
          <input
            className='w-full font-mono border-black border-2 py-4 pl-6 m-4'
            type='text'
            name='email'
            id='email'
            placeholder='Email'
          />
          <input
            className='w-full font-mono border-black border-2 py-4 pl-6 mb-8'
            type='text'
            name='password'
            id='password'
            placeholder='Password'
          />
          <button className='w-full bg-blue-900 text-white rounded-md py-4 mb-4'>
            登入
          </button>
          <p>
            <a href='/#' className='hover:text-blue-900'>
              註冊帳號
            </a>
          </p>
        </section>
      </LoginLayout>
    </>
  );
};

export default Login;
