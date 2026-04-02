import React from 'react';

/**
 * ErrorMessage Component - Displays error state
 * Shows when API call fails or returns error
 * Demonstrates error handling and conditional rendering
 */
const ErrorMessage = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <p className="error-text">{message}</p>
    </div>
  );
};

export default ErrorMessage;
