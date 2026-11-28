import { GenreBadge } from "../movies/GenreBadge";
import type { IGenre } from "../../models/IMovie";

interface IProps
{
    genres: IGenre[];
    activeGenre: string;
    onSelect: (genreId: string) => void;
    error?: string | null;
    onRetry?: () => void;
}

export function Sidebar({ genres, activeGenre, onSelect }: IProps)
{
    return (
        <aside className="w-full shrink-0 md:w-56">
            <h2 className="mb-3 text-sm font-semibold text-stone-500 dark:text-neutral-400 uppercase">Жанри</h2>
            <div className="flex flex-wrap gap-2">
                <GenreBadge name="Усі" active={!activeGenre} onClick={() => onSelect("")} />
                {genres.map((g) => (
                    <GenreBadge key={g.id} name={g.name} active={String(g.id) === activeGenre} onClick={() => onSelect(String(g.id))} />
                ))}
            </div>
        </aside>
    );
}
