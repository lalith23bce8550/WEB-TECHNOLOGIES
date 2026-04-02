import React, { useState } from 'react';

/**
 * Input Component - Handles user input logic
 * Responsible for capturing user input and passing to parent
 */
const InputComponent = ({ onAddItem }) => {
  // State to manage input field value
  const [inputValue, setInputValue] = useState('');

  /**
   * Handle input change - controlled component
   */
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  /**
   * Handle adding item - calls parent function and resets input
   */
  const handleSubmit = () => {
    onAddItem(inputValue);
    setInputValue(''); // Reset input field
  };

  /**
   * Handle Enter key press for quick submission
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="input-section">
      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter product name..."
          className="item-input"
        />
        <button onClick={handleSubmit} className="add-btn">
          Add Item
        </button>
      </div>
    </div>
  );
};

export default InputComponent;
