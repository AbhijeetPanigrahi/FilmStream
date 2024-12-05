import React, { useEffect, useState } from "react";
import "./app.css";
import SearchIcon from "./search.png";
import MovieCard from "./MovieCard";

// Access the API key and URL
const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = `http://www.omdbapi.com?apikey=${API_KEY}`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Initial effect to log API_URL for debugging
  useEffect(() => {
    console.log(API_URL); // Check if the URL is correct
  }, []);

  // Function to search movies
  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      setMovies(data.Search);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Initial search on component mount
  useEffect(() => {
    searchMovies("Inception");
  }, []);

  return (
    <div className="app">
      <h1>FilmStream</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      <div className="container">
        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.imdbID} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h3>No Movies Found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
