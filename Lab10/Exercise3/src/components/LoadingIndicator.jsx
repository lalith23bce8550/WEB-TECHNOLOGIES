import React from 'react';

/**
 * LoadingIndicator Component - Displays loading state
 * Shows while data is being fetched from API
 * Demonstrates conditional rendering of loading state
 */
const LoadingIndicator = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Fetching movies from API...</p>
    </div>
  );
};

export default LoadingIndicator;
