import {FC} from 'react';
import Link from 'next/link';
import Image from "next/image";
import {IMovie} from '@/interfaces/IMovie';

const Movie: FC<IMovie> = (movie) => {
    return (
        <Link href={`/MovieDetail/${movie.id}`}>
            <div className="movie bg-white-800 rounded p-4 transform hover:scale-105 transition duration-300 ease-in-out text-center justify-items-center flex flex-col">
                <Image  src={movie.poster}
                    width={300}
                    height={450}
                    alt={movie.title}
                    className="text-center mb-2 rounded-md shadow-md transform hover:shadow-lg hover:scale-110 transition duration-300"
                />
                <h4 className="text-center font-bold text-xs">{movie.title}</h4>
            </div>
        </Link>
    );
};

export default Movie;
