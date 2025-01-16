import "./index.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDefaultMovies = async () => {
    const apiKey = "aec21b04";
    const categories = ["Action", "Comedy", "Drama", "Sci-Fi", "Thriller"]; // Categories to fetch
    const fetchedMovies = [];

    try {
      setLoading(true);
      for (const category of categories) {
        const response = await fetch(
          `http://www.omdbapi.com/?s=${category}&apikey=${apiKey}`
        );
        const data = await response.json();
        if (data.Response === "True") {
          fetchedMovies.push(...data.Search);
        }
      }
      setMovies(fetchedMovies); // Combine all fetched movies
    } catch (error) {
      console.error("Error fetching default movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = async (query) => {
    const apiKey = "aec21b04";
    const url = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        console.warn(data.Error);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDefaultMovies(); // Fetch multiple categories on load
  }, []);

  return (
    <>
      <Header />
      <h1 className="hidden ">yuhj</h1>
    </>
  );
}

export default App;
