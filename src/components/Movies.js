import { Play, Bookmark } from "lucide-react";
function Movies({ movies }) {
  return (
    <div className="genres grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 gap-[1rem]">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          className="relative  h-[22rem] w-full min-w-[150px] overflow-hidden rounded-xl"
        >
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via black/40 to-transparent rounded-xl" />
          <div className="absolute inset-0 p-4 flex flex-col justify-end">
            <div className="mb-2">
              <span className="px-2 py-1 text-xs bg-white/20 rounded-full text-white">
                {movie.Type}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">{movie.Title}</h3>
            <p className=" movie-plot text-sm text-gray-300 mb-4">
              {movie.Plot}
            </p>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 flex items-center justify-center bg-white/65 rounded-full">
                <Play className="w-5 h-5 text-black fill-black" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Bookmark className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Movies;
