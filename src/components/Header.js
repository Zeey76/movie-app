import { Film, Sun, Moon, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Header({
  toggleTheme,
  isDarkMode,
  onSearch,
  setMovies,
  setIsSearchActive,
}) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Focus input on search icon click
  function handleSearch() {
    inputRef.current.focus();
  }

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Wait for 500ms after the user stops typing
    return () => clearTimeout(timer); // Clear the timeout on query change
  }, [query]);

  // Trigger the onSearch callback when the debounced query changes
  useEffect(() => {
    if (debouncedQuery !== "") {
      onSearch(debouncedQuery);
    } else if (debouncedQuery.trim() === "") {
      setIsSearchActive(false);
      setMovies([]);
    }
  }, [debouncedQuery, onSearch, setMovies, setIsSearchActive]);

  return (
    <div className="flex w-full items-center gap-[2rem] flex-wrap mt-[0.7rem]">
      <Film className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem] text-purple-600 dark:text-purple-500" />
      <h1 className="text-5xl ml-[-1rem] font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 dark:bg-gradient-to-r dark:from-purple-300 dark:via-pink-300 dark:to-red-300">
        CineVibe
      </h1>
      <div className="flex gap-[10px] shadow-sm items-center flex-grow p-[10px] rounded-[0.8rem] transition-colors duration-200 bg-[#d2cbea] text-[#756994] dark:bg-[#382e4e] dark:text-[#f0eaea]">
        <Search
          onClick={handleSearch}
          className="w-4 h-4 dark:text-white text-[#756994]"
        />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          placeholder="Search movies..."
          className="flex-grow bg-[#d2cbea] transition-colors duration-200 text-dark-purple dark:bg-[#382e4e] dark:text-[#f0eaea] outline-none"
        />
      </div>
      <button
        className="absolute ml-[2rem] top-[0.5rem] right-[1rem] bg-gray-200 dark:bg-gray-800 rounded-full shadow-lg transition"
        onClick={toggleTheme}
      >
        {isDarkMode ? (
          <Sun className="text-white w-5 h-5" />
        ) : (
          <Moon className="text-gray-800 w-5 h-5" />
        )}
      </button>
    </div>
  );
}
