import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginLayout } from '../Components';
import { UserApis } from '../apis/apis';

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const onSubmit = async (data) => {
    setSuccessMsg('');
    setIsError(false);
    setErrorMessage('');
    const { email } = data;
    const result = await UserApis.forgetPassword({ email });
    if (result.status) {
      setSuccessMsg(result.message);
    } else {
      setIsError(true);
      setErrorMessage(result.message);
    }
  };

  return (
    <LoginLayout>
      <h2 className="text-2xl font-bold mb-9">重設密碼</h2>
      <form
        className="flex flex-col items-center w-full mb-4 gap-6"
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
          placeholder="請輸入Email"
          className="border-2 p-2 border-black w-11/12"
        />
        {isError && <span className="text-[#F57375] mb-4">{errorMessage}</span>}
        {errors.email && (
          <span className="text-[#F57375]">{errors.email.message}</span>
        )}
        {successMsg !== '' && (
          <div className="text-green-700">{successMsg}</div>
        )}
        <input
          type="submit"
          className="w-full bg-blue-900 text-white rounded-md py-4"
          value="送出"
        />
      </form>
      <a href="/login" className="hover:text-blue-900 hover:underline block">
        回登入頁面
      </a>
    </LoginLayout>
  );
};

export default ForgetPassword;
