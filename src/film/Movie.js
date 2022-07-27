import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./movie.css";
import MovieList from "../components/MovieList";
import MovieListHeading from "../components/MovieListHeading";
import SearchBox from "../components/SearchBox";
import AddFavourites from "../components/AddFavourites";
import RemoveFavourites from "../components/RemoveFavourites";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=27d73826`;
    const url1 = `http://www.omdbapi.com/?s=avengers&apikey=27d73826`;

    const response = await fetch(url);
    const responseJson = await response.json();

    const response1 = await fetch(url1);
    const responseJson1 = await response1.json();

    responseJson.Search
      ? setMovies(responseJson.Search)
      : setMovies(responseJson1.Search);
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    setFavourites(movieFavourites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const AddFavouritesMovie = (movie) => {
    !favourites.some((item) => item.imdbID === movie.imdbID) &&
      setFavourites([...favourites, movie]);
    saveToLocalStorage([...favourites, movie]);
  };

  const removeFavouritesMovie = (movie) => {
    const newFavouritesList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouritesList);
    saveToLocalStorage(newFavouritesList);
  };
  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4 ">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="my-row">
        <MovieList
          movies={movies}
          handleFavoritesClick={AddFavouritesMovie}
          favouritesComponent={AddFavourites}
        />
      </div>

      <div className="row d-flex align-items-center mt-4 mb-4 ">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="my-row">
        <MovieList
          movies={favourites}
          handleFavoritesClick={removeFavouritesMovie}
          favouritesComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
};

export default Movie;
