export interface IMovie {
    id: string;
    title: string;
    year: number;
    duration: number;
    poster: string;
    rate?: number;
    trailer?: string;
    status?: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';
    budget?: number;
    revenue?: number;
    genres?: string;
    actors?: string;
    directors?: string;
    overview?: string;
}
