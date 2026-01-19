import React from 'react';

const MovieCard = ({ movie, imgUrl }) => {
  return (
    <div className="movie-card">
      <img
        src={movie.poster_path ? imgUrl + movie.poster_path : 'https://via.placeholder.com/500x750?text=No+Image'}
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
    </div>
  );
};

export default MovieCard;
