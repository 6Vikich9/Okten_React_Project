import { MoviesListCard } from "./MoviesListCard";
import type { IGenre, IMovie } from "../../models/IMovie";

interface IProps
{
    movies: IMovie[];
    genresById: Record<number, IGenre>;
}

export function MoviesList({ movies, genresById }: IProps)
{
    if (!movies.length) return <p className="py-12 text-center text-stone-500 dark:text-neutral-400">Нічого не знайдено 🤷</p>;
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-5">
            {movies.map((m) => <MoviesListCard key={m.id} movie={m} genresById={genresById} />)}
        </div>
    );
}
