/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoginLayout } from '../Components';
import metawall from '../assets/MetaWall.png';
import { useAuth } from '../Context/auth';

function Register() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    const { name, email, password, confirmPassword } = data;
    await signup(
      { name, email, password, confirmPassword },
      () => {
        navigate('/', { replace: true });
      },
      (msg) => {
        setIsError(true);
        setErrorMessage(msg);
      }
    );
  };

  return (
    <LoginLayout>
      <>
        <h2 className="text-2xl font-bold mb-9">註冊</h2>
        <form
          className="flex flex-col items-center w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register('name', {
              required: '暱稱尚未填寫',
              minLength: {
                value: 2,
                message: '暱稱至少 2 個字元以上',
              },
            })}
            className={`w-full font-mono border-black border-2 py-4 pl-6 w-12${
              errors.name && 'ring-2 ring-red-500'
            }`}
            placeholder="暱稱"
          />
          {errors.name && (
            <div className="text-[#F57375]">{errors.name.message}</div>
          )}

          <input
            {...register('email', {
              required: '信箱尚未填寫',
              pattern: {
                value: /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})(\.\w+)*$/,
                message: '錯誤的 Email 格式',
              },
            })}
            className="w-full font-mono border-black border-2 py-4 pl-6 mt-4"
            placeholder="Email"
            type="email"
          />
          {errors.email && (
            <div className="text-[#F57375]">{errors.email.message}</div>
          )}
          <input
            {...register('password', {
              required: '密碼尚未填寫',
              minLength: {
                value: 8,
                message: '密碼至少 8 個字元以上',
              },
            })}
            className="w-full font-mono border-black border-2 py-4 pl-6 mt-4"
            placeholder="Password"
            type="password"
          />
          {errors.password && (
            <span className="text-[#F57375]">{errors.password.message}</span>
          )}
          <input
            {...register('confirmPassword', {
              required: '再次輸入密碼尚未填寫',
              minLength: {
                value: 8,
                message: '再次輸入密碼尚未填寫',
              },
              validate: (value) => {
                const input = watch('password');
                if (input !== value) {
                  return '確認密碼與密碼不一致';
                }
                return true;
              },
            })}
            className="w-full font-mono border-black border-2 py-4 pl-6 mt-4"
            placeholder="confirmPassword"
            type="password"
          />
          {errors.confirmPassword && (
            <div className="text-[#F57375]">
              {errors.confirmPassword.message}
            </div>
          )}
          {isError && <span className="text-[#F57375]">{errorMessage}</span>}
          <input
            type="submit"
            className="w-full bg-[#A8B0B9] border-[#808080] border-2 text-white rounded-md py-4 my-4"
            value="註冊"
          />
        </form>
        <p>
          <a href="/" className="hover:text-blue-900 hover:underline">
            登入
          </a>
        </p>
      </>
    </LoginLayout>
  );
}

export default Register;
