import React from "react";
import { useNavigate } from "react-router-dom";

const MovieList = (props) => {
  const navigate = useNavigate();
  const FavouritesComponent = props.favouritesComponent;
  return (
    <>
      {props.movies.map((movie, index) => (
        <div
          key={movie.imdbID}
          className=" d-flex image-container justify-content-start m-3"
        >
          <img
            onClick={() => navigate(`/movie/${movie.imdbID} `)}
            src={movie.Poster}
            alt={movie.Title}
          ></img>
          <div
            onClick={() => props.handleFavoritesClick(movie)}
            className="overlay d-flex align-items-center justify-content-center"
          >
            <FavouritesComponent />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
