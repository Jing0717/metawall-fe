/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faDiscord,
  faFacebookSquare,
  faGooglePlusSquare,
  faLine,
} from '@fortawesome/free-brands-svg-icons';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoginLayout } from '../Components';
import { useAuth } from '../Context/auth';
import ResetPassword from '../Components/ResetPassword';

function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [tokenIsExist, setTokenIsExist] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const onSubmit = async (data) => {
    const { email, password } = data;
    await login(
      { email, password },
      () => {
        navigate('/', { replace: true });
      },
      (msg) => {
        setIsError(true);
        setErrorMessage(msg);
      }
    );
  };

  useEffect(() => {
    if (token) {
      setTokenIsExist(token);
    }
  }, []);

  useEffect(() => {
    library.add(faGooglePlusSquare, faLine, faFacebookSquare, faDiscord);
  }, []);
  useEffect(() => {
    const { id } = user || {};
    if (id) {
      navigate('/');
    }
  }, [user, navigate]);
  return (
    <LoginLayout>
      <h2 className="text-2xl font-bold mb-9">到元宇宙展開全新社交圈</h2>
      {tokenIsExist !== '' && <ResetPassword token={tokenIsExist} />}
      {tokenIsExist === '' && (
        <>
          <form
            className="flex flex-col items-center w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register('email', {
                required: '信箱尚未填寫',
                pattern: {
                  value: /^\w+([.-]?\w+)@\w+([.-]?\w+)(\w{2,3})+$/,
                  message: '錯誤的 Email 格式',
                },
              })}
              className="w-full font-mono border-black border-2 py-4 pl-6 m-4"
              placeholder="Email"
            />
            <input
              {...register('password', {
                required: '密碼尚未填寫',
                minLength: {
                  value: 8,
                  message: '密碼至少 8 個字元以上',
                },
              })}
              className="w-full font-mono border-black border-2 py-4 pl-6 mb-8"
              placeholder="Password"
              type="password"
            />
            {isError && (
              <span className="text-[#F57375] mb-4">{errorMessage}</span>
            )}
            <input
              type="submit"
              className="w-full bg-blue-900 text-white rounded-md py-4 mb-4"
              value="登入"
            />
          </form>
          <p className="flex justify-around w-full">
            <a
              href="/register"
              className="hover:text-blue-900 hover:underline block"
            >
              註冊帳號
            </a>
            <a
              href="/forget_password"
              className="hover:text-blue-900 hover:underline block"
            >
              忘記密碼?
            </a>
          </p>
        </>
      )}
    </LoginLayout>
  );
}

export default Login;
