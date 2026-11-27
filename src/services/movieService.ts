import { getAll } from "./api.service";
import type { IGenre, IMovie, IMovieDetails, IMoviesQuery, IPaged } from "../models/IMovie";

export function getMovies({ page, genre, sort, query }: IMoviesQuery, signal?: AbortSignal)
{
    if (query) return getAll<IPaged<IMovie>>("/search/movie", { query, page, include_adult: false }, signal);
    const today = new Date().toISOString().slice(0, 10);
    return getAll<IPaged<IMovie>>("/discover/movie", {
        page,
        with_genres: genre,
        sort_by: sort,
        "vote_count.gte": sort.startsWith("vote_average") ? 200 : undefined,
        "primary_release_date.lte": sort.startsWith("primary_release_date") ? today : undefined,
    }, signal);
}

export async function getGenres(signal?: AbortSignal)
{
    return (await getAll<{ genres: IGenre[] }>("/genre/movie/list", {}, signal)).genres;
}

export async function getMovie(id: string, signal?: AbortSignal)
{
    const movie = await getAll<IMovieDetails>(`/movie/${id}`, {}, signal);
    if (!movie.overview)
    {
        movie.overview = (await getAll<IMovieDetails>(`/movie/${id}`, { language: "en-US" }, signal)).overview;
    }
    return movie;
}
