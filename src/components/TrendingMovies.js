import { Play } from "lucide-react";
function TrendingMovies({ imagePath, title, category, type, plot }) {
  return (
    <div className="relative h-64 w-full min-w-[150px] overflow-hidden rounded-[12px] bg-gray-300 dark:bg-gray-700 shadow-md">
      <img
        src={imagePath}
        alt={title}
        className="w-full h-full object-cover min-w-[150px]"
      />
      <div>
        <div className="text-overlay flex items-center justify-between">
          
          <div className="flex justify-between items-center">
          
            <div>
            <p className="text-white">{type}</p>
              <p className="text-white text-lg font-bold">{title}</p>
              <p className=" movie-plot text-sm text-gray-300">{plot}</p>
            </div>
          </div>
          <button className="play-button bg-dark-purple flex   w-[3rem] h-[3rem] items-center justify-center  border-none cursor-pointer">
            <Play />
          </button>
        </div>
      </div>
    </div>
  );
}
export default TrendingMovies;
