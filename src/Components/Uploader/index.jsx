import React from 'react';
import { upload } from '../../apis/apis';

const Upload = ({ isDisabled, handleUploadFinnish, setIsDisabled, text }) => {
  const handleFileUpload = async (e) => {
    setIsDisabled(true);
    const file = e.target.files || [];
    const formData = new FormData();
    formData.append('file', file[0]);
    const result = await upload(formData);
    const { status = false, message = '上傳發生異常' } = result;
    handleUploadFinnish(status, message);
  };

  return (
    <div>
      <label
        htmlFor="upload"
        className={`inline-block w-[128px] py-1 rounded-sm text-center cursor-pointer mb-4 mt-5 ${
          isDisabled
            ? 'pointer-events-none cursor-not-allowed bg-gray-500'
            : 'bg-black text-white'
        }`}
      >
        {text}
        <input
          type="file"
          className="hidden"
          id="upload"
          name="upload"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
};

export default Upload;
