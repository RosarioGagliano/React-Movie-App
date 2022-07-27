import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SingleMovie = () => {
  const [singleMovie, setSingleMovie] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const url = `http://www.omdbapi.com/?i=${id}&apikey=27d73826`;

  useEffect(() => {
    axios.get(url).then((res) => {
      setSingleMovie(res.data);
    });
  }, []);
  const back = () => navigate(-1);
  return (
    <>
      <div className="container container-fluid ">
        <div className="d-flex justify-content-center align-items-center">
          <img
            className="card"
            src={singleMovie?.Poster}
            alt={singleMovie?.Title}
          />
        </div>

        <h2 className="text-center m-5"> {singleMovie?.Title}</h2>
        <div className="d-flex m-3 justify-content-around">
          <span>Released: {singleMovie?.Released}</span>
          <span>Year:{singleMovie?.Year}</span>
          <span>Runtime:{singleMovie?.Runtime}</span>
        </div>
        <p className="mt-5">{singleMovie?.Plot}</p>
        <button className="bg-white" onClick={() => back()}>
          Indietro
        </button>
      </div>
    </>
  );
};

export default SingleMovie;
