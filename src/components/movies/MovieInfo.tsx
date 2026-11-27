import { Link } from "react-router";
import { GenreBadge } from "./GenreBadge";
import type { IGenre } from "../../models/IMovie";

interface IProps
{
    id?: number;
    title: string;
    year?: string;
    overview?: string;
    genres?: IGenre[];
    onGenreClick?: (id: number) => void;
    clamp?: boolean;
}

export function MovieInfo({ id, title, year, overview, genres = [], onGenreClick, clamp = true }: IProps)
{
    return (
        <div>
            <h3 className="mb-2 font-bold">
                {id ? <Link to={`/movie/${id}`} className="hover:text-stone-500">{title}</Link> : title}
                {year && <span className="font-normal text-stone-500 dark:text-neutral-400"> ({year})</span>}
            </h3>
            <div className="mb-2 flex flex-wrap gap-1.5">
                {genres.map((g) => <GenreBadge key={g.id} name={g.name} onClick={() => onGenreClick?.(g.id)} />)}
            </div>
            <p className={`text-sm leading-relaxed text-stone-500 dark:text-neutral-400 ${clamp ? "line-clamp-3" : ""}`}>
                {overview || "Опису поки немає."}
            </p>
        </div>
    );
}
