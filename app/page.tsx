import {IMovie} from '@/interfaces/IMovie';
import {getMovies} from "@/services/Movies";
import MovieCard from "@/components/MovieCard";
import CategoriesButtons from "@/components/CategoriesButtons";

export default async function Home() {

    const movies: IMovie[] = await getMovies()

    return (
        <div>
            <main>
                <section className="hero py-16 px-8 bg-cover bg-center" style={{backgroundImage: "url('cine.jpg')"}}>
                    <h2 className="text-5xl font-bold mb-4">Películas y series ilimitadas y mucho más.</h2>
                    <p className="text-xl mb-8">Disfruta donde quieras. Cancela cuando quieras.</p>
                    <button className="bg-red-600 text-white px-6 py-3 rounded text-xl">Comenzar</button>
                </section>

                <section className="categories py-16 px-8">
                    <h3 className="text-2xl font-bold mb-4">Explora por categorías</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <CategoriesButtons />
                    </div>
                </section>

                <section className="featured py-16 px-8">
                    <h3 className="text-2xl font-bold mb-4">Destacados</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} {...movie} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
