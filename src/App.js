import React, { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import './App.css';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';


function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const url = query
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        // Ensure movies is always an array to prevent undefined errors
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        console.error('Error fetching movies:', err);
        // Fallback in case of error
        setMovies([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies(); // Call the async function inside useEffect
  }, [query, page]); // Refetch whenever query or page changes

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    setPage(1); // Reset to first page when a new search is performed
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="app">
      <h1>Movie Browser</h1>
      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} imgUrl={IMG_URL} />
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
