import React from 'react';

/**
 * MovieCard Component - Displays individual movie information
 * Receives movie data as props from parent
 * Uses OMDB image API for poster images
 */
const MovieCard = ({ movie }) => {
  // API key for OMDB image API
  const IMG_API_KEY = 'a6fead40'; // Replace with your OMDB API key
  
  /**
   * Construct poster URL using OMDB image API
   * Format: http://img.omdbapi.com/?apikey=[key]&i=[imdbID]
   * This ensures reliable image loading from OMDB
   */
  const getPosterUrl = () => {
    // Always use OMDB image API with imdbID for consistent image loading
    if (movie.imdbID) {
      return `http://img.omdbapi.com/?apikey=${IMG_API_KEY}&i=${movie.imdbID}`;
    }
    // Fallback to poster URL if available and not 'N/A'
    if (movie.Poster && movie.Poster !== 'N/A' && movie.Poster.startsWith('http')) {
      return movie.Poster;
    }
    return null;
  };

  const posterUrl = getPosterUrl();
  const hasPoster = movie.Poster && movie.Poster !== 'N/A' && posterUrl;

  return (
    <div className="movie-card">
      {/* Movie Poster */}
      <div className="movie-poster">
        {hasPoster ? (
          <img src={posterUrl} alt={movie.Title} onError={(e) => {
            // Fallback if OMDB image API fails
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = '<div class="no-poster"><span>No Poster</span></div>';
          }} />
        ) : (
          <div className="no-poster">
            <span>No Poster</span>
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <div className="movie-details">
          <span className="movie-year">Year: {movie.Year}</span>
          <span className="movie-type">Type: {movie.Type}</span>
        </div>
        <p className="movie-id">ID: {movie.imdbID}</p>
      </div>
    </div>
  );
};

export default MovieCard;
