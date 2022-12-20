import React from 'react';
import { LoginLayout } from '../Components';
import metawall from '../assets/MetaWall.png';

const Register = () => {
  return (
    <LoginLayout>
      <section className='flex flex-col items-center'>
        <img src={metawall} alt='metawall' className='w-[296px] h-[84px]' />
        <h2 className='text-2xl font-bold mb-9'>註冊</h2>
        <input
          className='w-full font-mono border-black border-2 py-4 pl-6 mb-4'
          type='text'
          name='nickname'
          id='nickname'
          placeholder='暱稱'
        />
        <input
          className='w-full font-mono border-black border-2 py-4 pl-6 mb-4'
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
        <button className='w-full bg-[#A8B0B9] border-[#808080] border-2 text-white rounded-md py-4 mb-4'>
          註冊
        </button>
        <p>
          <a href='/' className='hover:text-blue-900'>
            登入
          </a>
        </p>
      </section>
    </LoginLayout>
  );
};

export default Register;
