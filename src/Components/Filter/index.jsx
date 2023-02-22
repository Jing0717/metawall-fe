import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { PostApis } from '../../apis/apis';

const FILTER_OPTIONS = [
  {
    id: 1,
    type: '',
    title: '最新的貼文',
    value: 'asc',
  },
  {
    id: 2,
    type: '',
    title: '最舊的貼文',
    value: 'desc',
  },
  {
    id: 3,
    type: 'comments',
    title: '最熱門的貼文',
    value: 'desc',
  },
  {
    id: 4,
    type: 'comments',
    title: '最冷門的貼文',
    value: 'asc',
  },
  {
    id: 5,
    type: 'likes',
    title: '最多讚數的貼文',
    value: 'desc',
  },
  {
    id: 6,
    type: 'likes',
    title: '最少讚數的貼文',
    value: 'asc',
  },
];

function Filter({ setListsData, setIsLoading }) {
  const [inputValue, setInputValue] = useState('');
  const [option, setOption] = useState('');
  const handleOnButtonClick = async (event) => {
    setIsLoading(true);
    const queryObject = {};
    if (option !== '') {
      const [type, timeSort] = option.split('-');
      queryObject.type = type;
      queryObject.timeSort = timeSort;
    }
    queryObject.q = inputValue;
    const result = await PostApis.getAll(queryObject);
    if (result.status) {
      setListsData(result.data);
      setIsLoading(false);
    }
  };

  const handleOptionOnChange = async (e) => {
    setOption(e.target.value);
    setIsLoading(true);
    const queryObject = {};
    const [type, timeSort] = e.target.value.split('-');
    queryObject.type = type;
    queryObject.timeSort = timeSort;
    if (inputValue !== '') {
      queryObject.q = inputValue;
    }
    const result = await PostApis.getAll(queryObject);
    if (result.status) {
      setListsData(result.data);
      setIsLoading(false);
    }
  };
  return (
    <>
      <select
        onChange={handleOptionOnChange}
        className="appearance-none h-[46px] border-black border-2 px-3 bg-white pr-6 min-w-[156px]"
      >
        {FILTER_OPTIONS.map((item) => (
          <option key={item.id} value={`${item.type}-${item.value}`}>
            {item.title}
          </option>
        ))}
      </select>
      <div className="w-3/5 md:w-6/12 relative">
        <form className="flex h-[46px] w-full absolute right-0">
          <input
            className="border-black border-2 py-3 pl-4 w-full"
            type="text"
            placeholder="搜尋貼文"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button
            className="border-black border-y-2 border-r-2 bg-[#03438D]  text-white py-3 px-4"
            type="button"
            onClick={handleOnButtonClick}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="mb-1" />
          </button>
        </form>
      </div>
    </>
  );
}

export default Filter;
