import React from 'react';
import MovieCard from './MovieCard';

/**
 * MovieList Component - Displays fetched movies
 * Demonstrates:
 * - Dynamic list rendering using map() function
 * - Proper key usage for list items
 * - Passing props to child components
 */
const MovieList = ({ movies }) => {
  return (
    <div className="movies-container">
      <h2 className="movies-header">Search Results ({movies.length} movies found)</h2>
      
      {/* Dynamic rendering using map() function */}
      {/* Each movie has unique key={movie.imdbID} for React reconciliation */}
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
