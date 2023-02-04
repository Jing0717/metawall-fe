/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoginLayout } from '../Components';
import metawall from '../assets/MetaWall.png';
import { useAuth } from '../Context/auth';

function Register() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const url = `${process.env.REACT_APP_API_URL}/users/create`;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        setUser(res.headers.get('authorization'));
        res.json();
      })
      .then((res) => {
        navigate('/');
      });
  };

  return (
    <LoginLayout>
      <section className="flex flex-col items-center">
        <img src={metawall} alt="metawall" className="w-[296px] h-[84px]" />
        <h2 className="text-2xl font-bold mb-9">註冊</h2>
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register('name', { required: true })}
            className="w-full font-mono border-black border-2 py-4 pl-6 mb-4"
            placeholder="暱稱"
          />
          <input
            {...register('email', { required: true })}
            className="w-full font-mono border-black border-2 py-4 pl-6 mb-4"
            placeholder="Email"
          />
          <input
            {...register('password', { required: true })}
            className="w-full font-mono border-black border-2 py-4 pl-6 mb-4"
            placeholder="Password"
          />
          <input
            {...register('confirmPassword', { required: true })}
            className="w-full font-mono border-black border-2 py-4 pl-6 mb-4"
            placeholder="confirmPassword"
          />
          {/* <select
            {...register('gender', { required: true })}
            className="appearance-none w-full font-mono border-black border-2 py-4 pl-6 mb-8"
          >
            <option value="">性別</option>
            <option value="male">男生</option>
            <option value="female">女生</option>
            <option value="x">不想透露</option>
          </select> */}
          <input
            type="submit"
            className="w-full bg-[#A8B0B9] border-[#808080] border-2 text-white rounded-md py-4 mb-4"
            value="註冊"
          />
        </form>
        <p>
          <a href="/" className="hover:text-blue-900">
            登入
          </a>
        </p>
      </section>
    </LoginLayout>
  );
}

export default Register;
