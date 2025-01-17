import React, { useState, useEffect } from "react";
import "./App.css"; // Import your custom styles (if any)
import Header from "./components/Header";
import TrendingMovies from "./components/TrendingMovies";

function App() {
  //`http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // Manage theme state
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
        }
      }
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // const fetchMovies = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(
  //       `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
  //     );
  //     const data = await response.json();

  //     if (data.Response === "True") {
  //       setMovies(data.Search);
  //     } else {
  //       setMovies([]);
  //       console.warn(data.Error);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchDefaultMovies();
  }, []);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode); // Toggle theme
  };
  console.log(categories);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen flex flex-col gap-[2rem] bg-light-purple  dark:bg-dark-bg text-dark-bg dark:text-white p-[1rem]">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        <div>
          {Object.entries(categories).map(([genre, movies]) => (
            <div key={genre} className="mb-8">
              <h2 className="text-2xl font-bold mb-[1rem] text-dark-purple dark:text-light-purple">
                {genre}
              </h2>
              <div className="genres grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 gap-[1rem]">
                {movies.map((movie) => (
                  <TrendingMovies
                    title={movie.Title}
                    imagePath={movie.Poster}
                    type={movie.Type}
                    category={genre}
                    plot={movie.Plot}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
