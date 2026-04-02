import React, { useState } from 'react';

const SearchBox = ({ onSearch, initialQuery }) => {
  const [inputValue, setInputValue] = useState(initialQuery);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <div className="search-box">
      <div className="search-group">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Dune"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-btn">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
