import {FC} from "react";
import {getMovies} from "@/services/Movies";
import MovieCard from "@/components/MovieCard";
import {IMovie} from "@/interfaces/IMovie";
import Link from "next/link";
import GenericButton from "@/components/ui/GenericButton";

interface MovieCategoryProps {
    params: {
        genre: string;
    };
}

const MovieCategoryPage: FC<MovieCategoryProps> = async ({params}) => {

    const genre = params.genre;
    const movies: IMovie[] = await getMovies(genre);

    if (!movies) {
        return <div>No hay películas en esta categoría</div>;
    }

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movies.map((movie: IMovie) => (
                    <MovieCard key={movie.id} {...movie} />
                ))}
            </div>
            <Link href="/"><GenericButton text="Volver" /></Link>
        </>
    );

};

export default MovieCategoryPage;
