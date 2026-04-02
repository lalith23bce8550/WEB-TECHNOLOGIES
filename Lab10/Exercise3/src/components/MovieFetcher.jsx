import React, { useState, useEffect } from 'react';
import '../styles/MovieFetcher.css';
import SearchBox from './SearchBox';
import MovieList from './MovieList';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';

const MovieFetcher = () => {
  const API_KEY = 'a6fead40';
  const API_BASE_URL = 'https://www.omdbapi.com/';
  const IMG_API_URL = 'http://img.omdbapi.com/?apikey=a6fead40&i=';



  const [movies, setMovies] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMovies = async (query) => {
    setIsLoading(true);
    setError(null);
    setMovies([]);

    try {
      // Validate search query
      if (!query.trim()) {
        setError('Please enter a movie name to search');
        setIsLoading(false);
        return;
      }

      // Fetch from OMDB API
      const url = `${API_BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`;
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. Please get a valid OMDB API key from http://www.omdbapi.com/apikey.aspx');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.Response === 'False') {
        setError(data.Error || 'No movies found');
        setMovies([]);
      } else {
        setMovies(data.Search || []);
        setError(null);
      }
    } catch (err) {
      setError(`Error fetching data: ${err.message}`);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(searchQuery);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchMovies(query);
  };

  return (
    <div className="fetcher-container">
      <SearchBox onSearch={handleSearch} initialQuery={searchQuery} />

      {isLoading && <LoadingIndicator />}

      {error && !isLoading && <ErrorMessage message={error} />}

      {!isLoading && !error && movies.length > 0 && (
        <MovieList movies={movies} />
      )}

      {!isLoading && !error && movies.length === 0 && (
        <div className="empty-state">
          <p>Start searching for movies to see results</p>
        </div>
      )}
    </div>
  );
};

export default MovieFetcher;
