import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Search() {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputValue);
  };
  return (
    <form
      className="flex h-[46px] w-full max-w-[365px] absolute right-0"
      onSubmit={handleSubmit}
    >
      <input
        className="border-black border-2 py-3 pl-4 w-full"
        type="text"
        placeholder="搜尋貼文"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        className="border-black border-y-2 border-r-2 bg-[#03438D]  text-white py-3 px-4"
        type="submit"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="mb-1" />
      </button>
    </form>
  );
}

export default Search;
