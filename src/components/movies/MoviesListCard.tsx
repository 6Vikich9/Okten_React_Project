import { useNavigate } from "react-router";
import { PosterPreview } from "./PosterPreview";
import { MovieRating } from "./MovieRating";
import { MovieInfo } from "./MovieInfo";
import type { IGenre, IMovie } from "../../models/IMovie";

interface IProps
{
    movie: IMovie;
    genresById: Record<number, IGenre>;
}

export function MoviesListCard({ movie, genresById }: IProps)
{
    const navigate = useNavigate();
    const genres = movie.genre_ids.map((id) => genresById[id]).filter(Boolean).slice(0, 3);
    return (
        <article
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="flex cursor-pointer flex-col overflow-hidden rounded-xl border border-stone-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 transition hover:-translate-y-1"
        >
            <PosterPreview path={movie.poster_path} alt={movie.title} />
            <div className="flex flex-1 flex-col justify-between gap-2 p-3">
                <MovieInfo
                    id={movie.id}
                    title={movie.title}
                    year={movie.release_date?.slice(0, 4)}
                    overview={movie.overview}
                    genres={genres}
                    onGenreClick={(id) => navigate(`/?genre=${id}`)}
                />
                <MovieRating movieId={movie.id} average={movie.vote_average} votes={movie.vote_count} />
            </div>
        </article>
    );
}
