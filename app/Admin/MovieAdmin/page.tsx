'use client'
import {FC, useContext, useEffect, useState} from 'react';
import {UserContext} from "@/context/UserProvider";
import {useRouter} from "next/navigation";
import Loader from "@/components/ui/Loader";
import PageTitle from "@/components/ui/PageTitle";

interface Movie {
    id: number;
    title: string;
    genres: string;
    duration: number;
}

const AdminPage: FC = () => {

    const router = useRouter();
    const {user} = useContext(UserContext);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (!user) {
            router.push('/Login');
        } else {
            fetchMovies();
        }
    }, []);

    async function fetchMovies() {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + '/movies', {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                }
            });
            if (response.ok) {
                const movies = await response.json();
                console.log(movies);
                setMovies(movies);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    async function handleDelete(movieId: number) {
        if (window.confirm("Are you sure you want to delete this movie?")) {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + '/movies/' + movieId, {
                    method: 'DELETE',
                    headers: {
                        accept: 'application/json',
                    },
                });
                if (response.ok) {
                    console.log(response)
                    console.log('Movie deleted successfully');
                    await fetchMovies();
                } else {
                    console.error('Error deleting movie:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log('Deletion canceled');
        }
    }

    function handleEdit(movieId: number) {
        router.push('/Admin/MovieAdmin/EditMovie/' + movieId);
    }

    return (
        <>
            <PageTitle text="Administrar Películas" />
            {movies.length > 0 ? (
                <table className="table-auto w-full">
                    <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Título</th>
                        <th className="px-4 py-2">Género</th>
                        <th className="px-4 py-2">Duración</th>
                        <th className="px-4 py-2">Acción</th>
                    </tr>
                    </thead>
                    <tbody>
                    {movies.map((movie: Movie) => (
                        <tr key={movie.id}>
                            <td className="border px-4 py-2">{movie.id}</td>
                            <td className="border px-4 py-2">{movie.title}</td>
                            <td className="border px-4 py-2">{movie.genres}</td>
                            <td className="border px-4 py-2">{movie.duration}</td>
                            <td className="border px-4 py-2">
                                <div className="flex justify-center">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded mr-2" onClick={() => handleEdit(movie.id)}>
                                        Editar
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded" onClick={() => handleDelete(movie.id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <Loader />
            )}
        </>
    )
}

export default AdminPage;
