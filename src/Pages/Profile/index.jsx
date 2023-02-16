/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import MainLayout from '../../Components/Layout/MainLayout';
import style from './profile.module.scss';
import { useAuth } from '../../Context/auth';
import initialAvatar from '../../assets/user_default.png';
import useLocalStorage from '../../helpers/useLocalStorage';
import { UserApis } from '../../apis/apis';
import Uploader from '../../Components/Uploader';

const Profile = () => {
  const [isNameUpdate, setIsNameUpdate] = useState(true);
  const [pwdMessage, setPwdMessage] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(initialAvatar);
  const [isDisabled, setIsDisabled] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const { user, setUser } = useAuth();
  const localUser = useLocalStorage.getUser();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  useLayoutEffect(() => {
    if (JSON.parse(localUser)) {
      setUser(JSON.parse(localUser));
    }
  }, [localUser]);

  useEffect(() => {
    if (user.avatar !== '') {
      setAvatarUrl(user.avatar);
      setValue('avatar', user.avatar);
    }
  }, [user.avatar]);

  const onSubmit = async (data) => {
    setIsDisabled(true);
    if (isNameUpdate) {
      const { name, gender, avatar = '' } = data;
      const result = await UserApis.editProfile({ name, gender, avatar });
      if (result.status) {
        setUser({ ...user, name, avatar });
        useLocalStorage.updateUser({ name, avatar });
        setIsDisabled(false);
      } else {
        setIsDisabled(false);
      }
    } else {
      const { newPassword, confirmNewPassword } = data;
      const result = await UserApis.updatePassword({
        password: newPassword,
        confirmPassword: confirmNewPassword,
      });
      if (result.status) {
        setPwdMessage('更改成功！');
        setIsDisabled(false);
      } else {
        setPwdMessage(result.message);
        setIsDisabled(false);
      }
    }
  };

  const handleUploadFinnish = (status, message) => {
    if (status) {
      setAvatarUrl(message);
      setValue('avatar', message);
      setIsDisabled(false);
      setUploadMessage('');
    } else {
      setUploadMessage(message);
      setIsDisabled(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col w-full">
        <div className="relative pl-1">
          <p className="border-2 border-black text-center bg-white z-10 py-[18px] w-full absolute text-xl font-mono font-bold">
            修改個人資料
          </p>
          <div className="w-full border-2 border-black bg-white absolute h-[64px] right-[1px] top-[10px]" />
        </div>
        <div className="mt-[109px]">
          <div className="flex ml-4">
            <button
              type="button"
              className={`py-2 px-6 rounded-t-lg border-t-2 border-x-2 border-black bg-white ${
                isNameUpdate ? style.active : ''
              }`}
              onClick={() => {
                setIsNameUpdate(true);
              }}
            >
              暱稱修改
            </button>
            <button
              type="button"
              className={`py-2 px-6 rounded-t-lg border-t-2 border-x-2 border-black bg-white ${
                !isNameUpdate ? style.active : ''
              }`}
              onClick={() => {
                setIsNameUpdate(false);
              }}
            >
              重設密碼
            </button>
          </div>
          <div className="border-black border-2 p-8 rounded-lg flex flex-col bg-white shadow-xl">
            {isNameUpdate && (
              <div className="flex flex-col items-center">
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="rounded-full border-2 border-black w-[107px] h-[107px] object-cover"
                />
                <Uploader
                  isDisabled={isDisabled}
                  handleUploadFinnish={handleUploadFinnish}
                  setIsDisabled={setIsDisabled}
                  text="上傳大頭照"
                />
                {uploadMessage !== '' && (
                  <div className="text-center text-[#F57375]">
                    {uploadMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="mt-[15px]">
                  <label htmlFor="name">
                    暱稱
                    <br />
                    <input
                      {...register('name', {
                        required: '暱稱尚未填寫',
                        minLength: {
                          value: 2,
                          message: '暱稱至少 2 個字元以上',
                        },
                      })}
                      className="border-2 border-black py-[14px] pl-6 min-w-[323px]"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="請輸入暱稱"
                    />
                  </label>{' '}
                  <br />
                  <label htmlFor="name" className="mt-4 block">
                    性別
                    <br />
                    <input
                      {...register('gender', { required: '性別尚未選取' })}
                      type="radio"
                      value="male"
                    />
                    男生
                    <input
                      {...register('gender')}
                      type="radio"
                      value="female"
                      className="ml-[29px] mt-2"
                    />
                    女生
                    <input
                      {...register('gender')}
                      type="radio"
                      value="x"
                      className="ml-[29px] mt-2"
                    />
                    不透露
                  </label>
                  {errors.name && (
                    <div className="text-center mt-8 text-[#F57375]">
                      {errors.name.message}
                    </div>
                  )}
                  {errors.gender && (
                    <div className="text-center mt-8 text-[#F57375]">
                      {errors.gender.message}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="bg-[#EEC32A] rounded-lg w-full py-4 border-2 border-black shadow-md mt-8 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-500 hover:bg-[#03438D] hover:text-white"
                    disabled={isDisabled}
                  >
                    送出更新
                  </button>
                </form>
              </div>
            )}
            {!isNameUpdate && (
              <div className="flex flex-col items-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label htmlFor="newPassword">
                    輸入新密碼
                    <br />
                    <input
                      {...register('newPassword', {
                        required: '密碼尚未填寫',
                        minLength: {
                          value: 8,
                          message: '密碼至少 8 個字元以上',
                        },
                      })}
                      className="border-2 border-black py-[14px] pl-6 min-w-[323px]"
                      type="text"
                      id="newPassword"
                      name="newPassword"
                      placeholder="請輸入新密碼"
                    />
                  </label>
                  {errors.newPassword && (
                    <div className="text-[#F57375]">
                      {errors.newPassword.message}
                    </div>
                  )}
                  <br />
                  <label htmlFor="confirmNewPassword" className="mt-4 block">
                    再次輸入
                    <br />
                    <input
                      {...register('confirmNewPassword', {
                        required: '再次輸入密碼尚未填寫',
                        validate: (value) => {
                          const input = watch('newPassword');
                          if (input !== value) {
                            return '確認密碼與密碼不一致';
                          }
                          return true;
                        },
                      })}
                      className="border-2 border-black py-[14px] pl-6 min-w-[323px]"
                      type="text"
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      placeholder="再次輸入新密碼"
                    />
                  </label>
                  {errors.confirmNewPassword && (
                    <div className="text-[#F57375]">
                      {errors.confirmNewPassword.message}
                    </div>
                  )}
                  {pwdMessage !== '' && (
                    <div className="text-center mt-8 text-[#F57375]">
                      {pwdMessage}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-500
                    bg-[#A8B0B9] text-white rounded-lg w-full py-4 border-2 border-black shadow-md mt-8 hover:bg-[#03438D]"
                  >
                    重設密碼
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
