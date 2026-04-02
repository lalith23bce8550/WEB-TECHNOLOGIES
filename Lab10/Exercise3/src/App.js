import React from 'react';
import MovieFetcher from './components/MovieFetcher';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="app-container">
        <h1>Movie Database Explorer</h1>
        <p className="app-subtitle">Search and discover movies from OMDB API</p>
        <MovieFetcher />
      </div>
    </div>
  );
}

export default App;
