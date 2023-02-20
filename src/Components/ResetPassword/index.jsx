import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserApis } from '../../apis/apis';

const ResetPassword = ({ token }) => {
  const [errMessage, setErrMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;
    const result = await UserApis.resetPassword({
      token,
      password,
      confirmPassword,
    });
    if (result.status) {
      setSuccessMsg(result.message);
    } else {
      setErrMessage(result.message);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mb-4"
      >
        <input
          className="p-2 border-2 border-black"
          type="password"
          placeholder="請輸入新密碼"
          {...register('password', {
            required: '新密碼尚未填寫',
            minLength: {
              value: 8,
              message: '密碼至少 8 個字元以上',
            },
          })}
        />
        {errors.password && (
          <div className="text-[#F57375]">{errors.password.message}</div>
        )}
        <input
          className="border-2 border-black p-2"
          type="password"
          placeholder="再次輸入新密碼"
          {...register('confirmPassword', {
            required: '請再次輸入密碼',
            validate: (value) => {
              const input = watch('password');
              if (input !== value) {
                return '確認密碼與密碼不一致';
              }
              return true;
            },
          })}
        />
        {errors.confirmPassword && (
          <div className="text-[#F57375]">{errors.confirmPassword.message}</div>
        )}
        <input
          type="submit"
          className="w-full bg-blue-900 text-white rounded-md py-2 mb-4"
          value="更改密碼"
        />
        {errMessage !== '' && (
          <div className="text-[#F57375]">{errMessage}</div>
        )}
        {successMsg !== '' && (
          <div className="text-green-500">{successMsg}</div>
        )}
      </form>
      <p className="flex justify-around w-full">
        <a
          href="/register"
          className="hover:text-blue-900 hover:underline block"
        >
          註冊帳號
        </a>
        <a href="/login" className="hover:text-blue-900 hover:underline block">
          登入
        </a>
      </p>
    </>
  );
};

export default ResetPassword;
