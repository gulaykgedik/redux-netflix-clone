import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseImgUrl } from "../../utils/constants";
import Loader from "../../components/loader/index";
import Error from "../../components/error/index";
import { GoBookmarkSlash } from "react-icons/go";
import { toggleMovieList } from "../../redux/actions/listActions";

const WatchList = () => {
  const dispatch = useDispatch();
  const { isLoading, error, list } = useSelector((store) => store);

  const handleClick = (movie) => {
    dispatch(toggleMovieList(movie, false));
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold">İzleme Listesi</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 gap-y-10 my-10">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error info={error} />
        ) : list.length > 0 ? (
          list.map((movie) => (
            <div className="relative">
              <button
                className="absolute top-3 end-3 bg-blue-500 p-3 hover:bg-blue-600 transition z-10 rounded"
                onClick={() => handleClick(movie)}
              >
                <GoBookmarkSlash />
              </button>
              <Link to={`/movie/${movie.id}`}>
                <img src={baseImgUrl + movie.poster_path} className="rounded" />
              </Link>

              <h1 className="text-xl text-center font-semibold mt-3">
                {movie.title}
              </h1>
            </div>
          ))
        ) : (
          <div className="flex justify-center text-zinc-700 my-10 text-center text-xl bg-zinc-300 p-8">
            <h1>Henüz listeye hiç film eklenmedi</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchList;
