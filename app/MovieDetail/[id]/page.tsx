import {FC} from 'react';
import Image from "next/image";
import {IMovie} from "@/interfaces/IMovie";
import {getMovieById} from "@/services/Movies";

interface MovieDetailProps {
    params: {
        id: string;
    };
}

const MovieDetailPage: FC<MovieDetailProps> = async ({params}) => {

    const {id} = params;
    const movie: IMovie = await getMovieById(id);

    return (
        <div className="bg-black text-white p-8">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                    <Image src={movie.poster} alt={movie.title} className="w-full rounded-lg shadow-lg"/>
                </div>
                <div className="md:w-2/3 md:pl-8 mt-4 md:mt-0">
                    <h1 className="text-4xl font-bold">{movie.title} ({movie.year})</h1>
                    <div className="flex items-center mt-2">
                        <span className="text-yellow-500">
                            {Array.from({length: Math.round(movie.rate || 0)}, (_, i) => (
                                <i className="fas fa-star" key={i}></i>
                            ))}
                        </span>
                        <span className="ml-2 text-gray-400">{movie.rate}</span>
                    </div>
                    <p className="mt-4 text-gray-400">{movie.genres}</p>
                    <p className="mt-2 text-gray-300">
                        {movie.duration} min | {movie.status}
                    </p>
                    <h3 className="text-2xl font-semibold mt-6">Resumen</h3>
                    <p className="mt-2 text-gray-300">{movie.overview}</p>

                    <div className="mt-6">
                        {movie.trailer && (
                            <a href={movie.trailer} target="_blank" rel="noopener noreferrer"
                                className="bg-gradient-to-r from-red-500 to-red-700
                                text-white font-bold py-2 px-4 rounded
                                hover:from-red-600 hover:to-red-800
                                active:bg-red-900
                                focus:outline-none focus:ring focus:ring-red-300
                                transition duration-300 ease-in-out">
                                Ver Trailer
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-between">
                {movie.actors && (
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold">Actores</h3>
                        <p className="mt-2 text-gray-300">{movie.actors}</p>
                    </div>
                )}

                {movie.directors && (
                    <div className="mt-4">
                        <h3 className="text-2xl font-semibold">Directores</h3>
                        <p className="mt-2 text-gray-300">{movie.directors}</p>
                    </div>
                )}

                {movie.budget && (
                    <div className="mt-4">
                        <h3 className="text-2xl font-semibold">Presupuesto</h3>
                        <p className="mt-2 text-gray-300">${movie.budget.toLocaleString()}</p>
                    </div>
                )}

                {movie.revenue && (
                    <div className="mt-4">
                        <h3 className="text-2xl font-semibold">Recaudación</h3>
                        <p className="mt-2 text-gray-300">${movie.revenue.toLocaleString()}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieDetailPage;
