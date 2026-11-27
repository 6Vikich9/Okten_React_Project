import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { movieDetailsActions } from "../redux/slices/MovieDetailsSlice";
import { PosterPreview } from "../components/movies/PosterPreview";
import { MovieRating } from "../components/movies/MovieRating";
import { MovieInfo } from "../components/movies/MovieInfo";

export function MoviePage()
{
    const { id = "" } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { movie: m, isLoading, error } = useAppSelector((state) => state.movieDetailsStoreSlice);

    useEffect(() =>
    {
        const request = dispatch(movieDetailsActions.loadMovie(id));
        return () => request.abort();
    }, [dispatch, id]);

    if (error) return <p className="py-12 text-center text-red-500">Помилка: {error}. <Link to="/" className="underline">На головну</Link></p>;
    if (isLoading || !m || String(m.id) !== id) return <p className="py-12 text-center text-stone-500 dark:text-neutral-400">Завантаження…</p>;

    return (
        <main className="mx-auto max-w-5xl p-6">
            <button onClick={() => navigate(-1)} className="cursor-pointer rounded-lg hover:bg-black hover:text-white dark:hover:bg-stone-300 dark:hover:text-black px-4 py-1.5 hover:text-black">← Назад</button>
            <div className="mt-5 grid gap-8 md:grid-cols-[300px_1fr]">
                <PosterPreview path={m.poster_path} alt={m.title} />
                <div className="flex flex-col gap-3">
                    <MovieInfo
                        title={m.title}
                        year={m.release_date?.slice(0, 4)}
                        overview={m.overview}
                        genres={m.genres}
                        onGenreClick={(gid) => navigate(`/?genre=${gid}`)}
                        clamp={false}
                    />
                    {m.tagline && <p className="text-stone-500 dark:text-neutral-400 italic">«{m.tagline}»</p>}
                    <MovieRating movieId={m.id} average={m.vote_average} votes={m.vote_count} />
                    <ul className="space-y-1 text-sm text-stone-500 dark:text-neutral-400">
                        {m.release_date && <li>Дата виходу: {m.release_date}</li>}
                        {!!m.runtime && <li>Тривалість: {m.runtime} хв</li>}
                        {m.original_title && <li>Оригінальна назва: {m.original_title}</li>}
                        {!!m.production_countries?.length && <li>Країни: {m.production_countries.map((c) => c.name).join(", ")}</li>}
                        {m.homepage && <li><a href={m.homepage} target="_blank" rel="noreferrer" className="underline">Офіційний сайт</a></li>}
                    </ul>
                </div>
            </div>
        </main>
    );
}
