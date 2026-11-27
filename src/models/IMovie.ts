export interface IGenre
{
    id: number;
    name: string;
}

export interface IMovie
{
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date?: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
}

export interface IMovieDetails extends Omit<IMovie, "genre_ids">
{
    genres: IGenre[];
    tagline?: string;
    runtime: number | null;
    original_title?: string;
    homepage?: string;
    production_countries?: { name: string }[];
}

export interface IPaged<T>
{
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export interface IMoviesQuery
{
    page: number;
    genre: string;
    sort: string;
    query: string;
}
