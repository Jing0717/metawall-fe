import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../Components/Layout/MainLayout';
import Uploader from '../../Components/Uploader';
import { PostApis } from '../../apis/apis';

const CreatePost = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadImg, setUploadImg] = useState('');
  const [errorMassage, setErrorMassage] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    const { content, image = '' } = data;
    const result = await PostApis.create({ content, image });
    if (result.status) {
      setErrorMassage('');
      navigate('/');
    } else {
      setErrorMassage(result.message);
    }
  };

  const handleUploadFinnish = (status, message) => {
    if (status) {
      setUploadMessage('');
      setUploadImg(message);
      setValue('image', message);
    } else {
      setUploadMessage(message);
    }
    setIsDisabled(false);
  };

  return (
    <MainLayout>
      <div className="flex flex-col w-full">
        <div className="relative pl-1">
          <p className="border-2 border-black text-center bg-white z-10 py-[18px] w-full absolute text-xl font-mono font-bold">
            張貼動態
          </p>
          <div className="w-full border-2 border-black bg-white absolute h-[64px] right-[1px] top-[10px]" />
        </div>
        <div className="mt-[109px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-black border-2 p-8 rounded-lg flex flex-col bg-white shadow-xl"
          >
            <label htmlFor="content">
              貼文內容
              <br />
              <textarea
                {...register('content', {
                  required: '貼文內容尚未填寫',
                })}
                placeholder="輸入您的貼文內容"
                name="content"
                id="content"
                className="border-2 border-black w-full h-[170px] mt-1"
              />
            </label>
            <Uploader
              isDisabled={isDisabled}
              handleUploadFinnish={handleUploadFinnish}
              setIsDisabled={setIsDisabled}
              text="上傳圖片"
            />
            {uploadMessage !== '' && (
              <div className="text-center text-[#F57375]">{uploadMessage}</div>
            )}
            {uploadImg !== '' && (
              <img
                src={uploadImg}
                alt=""
                className="border-2 border-black rounded-lg "
              />
            )}
            {errors.content && (
              <div className="text-center mt-8 text-[#F57375]">
                {errors.content.message}
              </div>
            )}
            {errorMassage !== '' && (
              <div className="text-center mt-8 text-[#F57375]">
                {errorMassage}
              </div>
            )}
            <button
              type="submit"
              className="disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-500
                    bg-[#A8B0B9] rounded-lg w-full py-4 border-2 border-black shadow-md mt-8"
            >
              送出貼文
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreatePost;
