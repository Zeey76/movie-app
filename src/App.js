import React, { useState, useEffect, useCallback } from "react";
import "./index.css";
import Header from "./components/Header";
import Movies from "./components/Movies";
import NavLinks from "./components/NavLinks";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false); // State to store error message
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [categories, setCategories] = useState({
    Action: [],
    Romance: [],
    Comedy: [],
    "Sci-Fi": [],
  });

  const apiKey = "aec21b04";

  const fetchDefaultMovies = async () => {
    const genreList = ["Action", "Romance", "Comedy", "Sci-Fi"];
    const fetchedCategories = {};

    try {
      setLoading(true);
      setError("");
      for (const genre of genreList) {
        const response = await fetch(
          `http://www.omdbapi.com/?s=${genre}&apikey=${apiKey}`
        );
        const data = await response.json();

        if (data.Response === "True") {
          const moviesWithPlot = await Promise.all(
            data.Search.map(async (movie) => {
              const detailsResponse = await fetch(
                `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}&plot=short`
              );
              const details = await detailsResponse.json();
              return {
                ...movie,
                Plot: details.Plot, // Add the Plot to the movie object
              };
            })
          );

          fetchedCategories[genre] = moviesWithPlot;
        } else {
          throw new Error(data.Error || "Failed to fetch movies.");
        }
      }
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  const fetchMovies = useCallback(async (searchQuery) => {
    setIsSearchActive(true);
    const response = await fetch(
      `http://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`
    );
    const data = await response.json();
    if (data.Response === "True") {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  }, []);

  useEffect(() => {
    fetchDefaultMovies();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <BrowserRouter>
      <div className={isDarkMode ? "dark" : ""}>
        <div className="min-h-screen flex flex-col gap-[2rem] bg-light-purple dark:bg-dark-bg text-dark-bg dark:text-white p-[1rem]">
          <Header
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            onSearch={fetchMovies}
            setMovies={setMovies}
            setIsSearchActive={setIsSearchActive}
          />
          <NavLinks />
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <>
                  {loading ? (
                    <h1 className="text-center mt-[2rem] text-2xl">
                      Loading...
                    </h1>
                  ) : error ? (
                    <h1 className="text-center mt-[2rem] text-2xl text-red-500">
                      "Oops! Something went wrong. Try again!"
                    </h1>
                  ) : isSearchActive && movies.length > 0 ? (
                    <div className="mb-8">
                      <Movies movies={movies} />
                    </div>
                  ) : isSearchActive && movies.length === 0 ? (
                    <h1 className="text-center mt-[2rem] text-2xl text-red-500">
                      "No movies found for your search!"
                    </h1>
                  ) : (
                    Object.entries(categories).map(([genre, movies]) => (
                      <div key={genre} className="mb-8">
                        <h2 className="text-2xl font-bold mb-[1rem] text-dark-purple dark:text-light-purple">
                          {genre}
                        </h2>
                        <Movies movies={movies} />
                      </div>
                    ))
                  )}
                </>
              }
            />

            {/* Movies Route */}
            <Route
              path="/movies"
              element={
                <>
                  {loading ? (
                    <h1 className="text-center mt-[2rem] text-3xl">
                      Loading...
                    </h1>
                  ) : error ? (
                    <h1 className=" text-center mt-[2rem] text-2xl text-red-500">
                      "Oops! Something went wrong. Try again!"
                    </h1>
                  ) : isSearchActive &&
                    movies.filter((movie) => movie.Type === "movie").length ===
                      0 ? (
                    <h1 className="text-center mt-[2rem] text-2xl text-red-500">
                      "No movies found for your search!"
                    </h1>
                  ) : isSearchActive &&
                    movies.filter((movie) => movie.Type === "movie").length >
                      0 ? (
                    <div className="mb-8">
                      <Movies
                        movies={movies.filter(
                          (movie) => movie.Type === "movie"
                        )}
                      />
                    </div>
                  ) : (
                    <Movies
                      movies={Object.values(categories)
                        .flat()
                        .filter((movie) => movie.Type === "movie")}
                    />
                  )}
                </>
              }
            />

            {/* Series Route */}
            <Route
              path="/series"
              element={
                <>
                  {loading ? (
                    <h1 className="text-center mt-[2rem] text-3xl">
                      Loading...
                    </h1>
                  ) : error ? (
                    <h1 className=" text-center mt-[2rem] text-2xl text-red-500">
                      "Oops! Something went wrong. Try again!"
                    </h1>
                  ) : isSearchActive &&
                    movies.filter((movie) => movie.Type === "series").length ===
                      0 ? (
                    <h1 className="text-center mt-[2rem] text-2xl text-red-500">
                      "No series found for your search!"
                    </h1>
                  ) : isSearchActive &&
                    movies.filter((movie) => movie.Type === "series").length >
                      0 ? (
                    <div className="mb-8">
                      <Movies
                        movies={movies.filter(
                          (movie) => movie.Type === "series"
                        )}
                      />
                    </div>
                  ) : (
                    <Movies
                      movies={Object.values(categories)
                        .flat()
                        .filter((movie) => movie.Type === "series")}
                    />
                  )}
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
