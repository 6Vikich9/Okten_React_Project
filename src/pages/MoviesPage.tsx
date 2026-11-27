import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { Sidebar } from "../components/sidebar/Sidebar";
import { MoviesList } from "../components/movies/MoviesList";
import { Pagination } from "../components/movies/Pagination";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { movieActions } from "../redux/slices/MovieSlice";
import { genreActions } from "../redux/slices/GenreSlice";
import { DEFAULT_SORT, MAX_PAGES, SORT_OPTIONS } from "../constants";
import type { IGenre } from "../models/IMovie";

export function MoviesPage()
{
    const [params, setParams] = useSearchParams();
    const page = Math.min(Math.max(Math.trunc(Number(params.get("page"))) || 1, 1), MAX_PAGES);
    const genreParam = params.get("genre") || "";
    const genre = /^\d+$/.test(genreParam) ? genreParam : "";
    const sortParam = params.get("sort") || "";
    const sort = SORT_OPTIONS.some((o) => o.value === sortParam) ? sortParam : DEFAULT_SORT;
    const query = params.get("q") || "";

    const dispatch = useAppDispatch();
    const genres = useAppSelector((state) => state.genreStoreSlice.genres);
    const { movies, totalPages, totalResults, isLoading, error } = useAppSelector((state) => state.movieStoreSlice);
    const genresById = useMemo(
        () => Object.fromEntries(genres.map((g) => [g.id, g])) as Record<number, IGenre>,
        [genres]
    );

    useEffect(() => { if (!genres.length) dispatch(genreActions.loadGenres()); }, [dispatch, genres.length]);

    useEffect(() =>
    {
        const request = dispatch(movieActions.loadMovies({ page, genre, sort, query }));
        return () => request.abort();
    }, [dispatch, page, genre, sort, query]);
    const reload = () => dispatch(movieActions.loadMovies({ page, genre, sort, query }));

    const update = (changes: Record<string, string>) =>
    {
        const next = new URLSearchParams(params);
        Object.entries(changes).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
        setParams(next);
    };
    const changePage = (p: number) =>
    {
        update({ page: p > 1 ? String(p) : "" });
        window.scrollTo({ top: 0 });
    };

    return (
        <main className="mx-auto flex max-w-[1400px] flex-col gap-6 p-6 md:flex-row">
            <Sidebar genres={genres} activeGenre={genre} onSelect={(id) => update({ genre: id, page: "", q: "" })} />

            <section className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                    <h1 className="text-2xl font-bold">
                        {query ? `Результати: «${query}»` : genresById[Number(genre)]?.name || "Усі фільми"}
                    </h1>
                    {!query && (
                        <label className="text-sm">
                            Сортування:{" "}
                            <select
                                value={sort}
                                onChange={(e) => update({ sort: e.target.value, page: "" })}
                                className="rounded-lg border border-stone-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-2 py-1.5"
                            >
                                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                        </label>
                    )}
                </div>
                {query && <p className="mb-2 text-sm text-stone-500 dark:text-neutral-400">Пошук TMDB не підтримує сортування й жанри — вони доступні без пошукового запиту.</p>}

                {isLoading && <p className="py-12 text-center text-stone-500 dark:text-neutral-400">Завантаження…</p>}
                {error && (
                    <p className="py-12 text-center text-red-500">
                        Помилка: {error}{" "}
                        <button onClick={reload} className="cursor-pointer rounded-lg bg-amber-400 px-3 py-1 text-black">Спробувати ще</button>
                    </p>
                )}
                {!isLoading && !error && (
                    <>
                        <p className="mb-4 text-sm text-stone-500 dark:text-neutral-400">Знайдено: {totalResults}</p>
                        <MoviesList movies={movies} genresById={genresById} />
                        <Pagination page={page} totalPages={totalPages} onChange={changePage} />
                    </>
                )}
            </section>
        </main>
    );
}
