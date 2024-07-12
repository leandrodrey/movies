import { IMovie } from '@/interfaces/IMovie';

export async function getMovies(genre?: string, sortOrder: 'asc' | 'desc' = 'asc'): Promise<IMovie[]> {
    const url = new URL(process.env.BASE_API_URL + '/movies');
    const params = new URLSearchParams();

    if (genre) {
        params.append('genre', genre);
    }

    if (sortOrder) {
        params.append('sortOrder', sortOrder);
    }

    url.search = params.toString();

    const res = await fetch(url, {
        next: { revalidate: 0 } // Disable caching for this request
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export const getMovieById = async (id: string): Promise<IMovie> => {
    const res = await fetch(process.env.BASE_API_URL + '/movies/' + id, {
        next: { revalidate: 0 } // Disable caching for this request
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
