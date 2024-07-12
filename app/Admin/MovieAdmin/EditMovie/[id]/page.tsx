'use client';
import React, {FC, useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Loader from "@/components/ui/Loader";
import {UserContext} from "@/context/UserProvider";
import PageTitle from "@/components/ui/PageTitle";

interface MovieData {
    id?: number;
    title: string;
    overview: string;
    year: number;
    budget: number;
    revenue: number;
    duration: number;
    rate: number;
    status: string;
    poster: string;
    trailer?: string;
    genres: string[];
    directors: string[];
    actors: string[];
}

interface PageProps {
    params: {
        id: string;
    };
}

const EditMoviePage: FC<PageProps> = ({params}) => {

    const router = useRouter();
    const {user} = useContext(UserContext);
    const [movieData, setMovieData] = useState<MovieData>({
        title: '',
        overview: '',
        year: 0,
        budget: 0,
        revenue: 0,
        duration: 0,
        rate: 0,
        status: '',
        poster: '',
        genres: [],
        directors: [],
        actors: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const movieId = params.id;

    useEffect(() => {
        (async () => {
            if (movieId && user) {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/movies/${movieId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch movie data');
                    }
                    const movieData = await response.json();
                    console.log('Movie data:', movieData);
                    setMovieData(movieData);
                } catch (error) {
                    console.error('Error fetching movie:', error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                router.push('/Login');
            }
        })();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const updatedMovieData = {
            ...movieData,
            title: formData.get('title') as string,
            overview: formData.get('overview') as string,
            year: parseInt(formData.get('year') as string, 10) || 0,
            budget: parseInt(formData.get('budget') as string, 10) || 0,
            revenue: parseInt(formData.get('revenue') as string, 10) || 0,
            duration: parseInt(formData.get('duration') as string, 10) || 0,
            rate: parseInt(formData.get('rate') as string, 10) || 0,
            status: formData.get('status') as string,
            poster: formData.get('poster') as string,
            trailer: formData.get('trailer') as string,
            genres: (formData.get('genres') as string).split(',').map(genre => genre.trim()),
            directors: (formData.get('directors') as string).split(',').map(director => director.trim()),
            actors: (formData.get('actors') as string).split(',').map(actor => actor.trim()),
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/movies/${movieId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedMovieData),
            });

            if (response.ok) {
                const updatedMovie = await response.json();
                alert('Película actualizada exitosamente');
                router.push('/Admin/MovieAdmin');
            } else {
                alert("Error al cargar la película. Inténtalo nuevamente.");
                console.error("Error:", await response.json());
            }
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
            alert("Ocurrió un error inesperado. Inténtalo nuevamente más tarde.");
        }
    };

    if (isLoading) {
        return <Loader/>; // Render a loading indicator
    }

    return (
        <>
            <PageTitle text="Editar Película"/>
            <form onSubmit={handleSubmit} className="max-w-xxl mx-auto p-6 bg-white rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Título:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={movieData.title}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="overview" className="block text-gray-700 text-sm font-bold mb-2">Sinopsis:</label>
                    <textarea
                        id="overview"
                        name="overview"
                        rows={5}
                        defaultValue={movieData.overview}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="year" className="block text-gray-700 text-sm font-bold mb-2">Año de Estreno:</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        defaultValue={movieData.year}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="budget" className="block text-gray-700 text-sm font-bold mb-2">Costo en $:</label>
                    <input
                        type="number"
                        id="budget"
                        name="budget"
                        defaultValue={movieData.budget}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="revenue" className="block text-gray-700 text-sm font-bold mb-2">Recaudación (en $):</label>
                    <input
                        type="number"
                        id="revenue"
                        name="revenue"
                        defaultValue={movieData.revenue}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="duration" className="block text-gray-700 text-sm font-bold mb-2">Duración (minutos):</label>
                    <input
                        type="number"
                        id="duration"
                        name="duration"
                        min="1"
                        defaultValue={movieData.duration}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="rate" className="block text-gray-700 text-sm font-bold mb-2">Clasificación:</label>
                    <select
                        id="rate"
                        name="rate"
                        defaultValue={movieData.rate}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Selecciona una clasificación</option>
                        <option value="1.0">1</option>
                        <option value="2.0">2</option>
                        <option value="3.0">3</option>
                        <option value="4.0">4</option>
                        <option value="5.0">5</option>
                        <option value="6.0">6</option>
                        <option value="7.0">7</option>
                        <option value="8.0">8</option>
                        <option value="9.0">9</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Estado:</label>
                    <select
                        id="status"
                        name="status"
                        defaultValue={movieData.status}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Selecciona un estado</option>
                        <option value="Rumored">Rumored</option>
                        <option value="Planned">Planned</option>
                        <option value="In Production">In Production</option>
                        <option value="Post Production">Post Production</option>
                        <option value="Released">Released</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="poster" className="block text-gray-700 text-sm font-bold mb-2">URL del Póster:</label>
                    <input
                        type="url"
                        id="poster"
                        name="poster"
                        defaultValue={movieData.poster}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="trailer" className="block text-gray-700 text-sm font-bold mb-2">URL del Trailer:</label>
                    <input
                        type="url"
                        id="trailer"
                        name="trailer"
                        defaultValue={movieData.trailer || ''}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="genres" className="block text-gray-700 text-sm font-bold mb-2">Género(s):</label>
                    <input
                        type="text"
                        id="genres"
                        name="genres"
                        defaultValue={movieData.genres}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="directors" className="block text-gray-700 text-sm font-bold mb-2">Director(es):</label>
                    <input
                        type="text"
                        id="directors"
                        name="directors"
                        defaultValue={movieData.directors}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="actors" className="block text-gray-700 text-sm font-bold mb-2">Actor(es):</label>
                    <input
                        type="text"
                        id="actors"
                        name="actors"
                        defaultValue={movieData.actors}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </>
    );
};

export default EditMoviePage;
