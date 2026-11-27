import { useState } from "react";
import { MAX_STARS } from "../../utils/rating";

interface IProps
{
    value?: number;
    votes?: number;
    myRating?: number;
    onRate?: (stars: number) => void;
}

const STARS = Array.from({ length: MAX_STARS }, (_, i) => i + 1);

export function StarsRating({ value = 0, votes, myRating, onRate }: IProps)
{
    const [hover, setHover] = useState(0);
    const average = Math.max(0, Math.min(100, (value / 10) * 100));
    const chosen = hover || myRating || 0;
    const percent = chosen ? (chosen / MAX_STARS) * 100 : average;

    return (
        <div className="flex flex-wrap items-center gap-x-1.5 text-sm" aria-label={`Рейтинг ${value.toFixed(1)} з 10`}>
            <span className="relative tracking-wider text-stone-300 dark:text-neutral-600" aria-hidden={onRate ? undefined : "true"} onMouseLeave={() => setHover(0)}>
                <span className="stars-fill pointer-events-none absolute top-0 left-0 overflow-hidden whitespace-nowrap text-amber-500" style={{ width: `${percent}%` }}>★★★★★</span>
                ★★★★★
                {onRate && (
                    <span className="absolute inset-0 flex">
                        {STARS.map((n) => (
                            <button
                                key={n}
                                type="button"
                                aria-label={`Оцінити на ${n} з ${MAX_STARS}`}
                                aria-pressed={myRating === n}
                                title={myRating === n ? "Натисніть ще раз, щоб зняти оцінку" : `Оцінити на ${n} з ${MAX_STARS}`}
                                className="h-full flex-1 cursor-pointer"
                                onMouseEnter={() => setHover(n)}
                                onFocus={() => setHover(n)}
                                onBlur={() => setHover(0)}
                                onClick={(e) => { e.stopPropagation(); onRate(n); }}
                            />
                        ))}
                    </span>
                )}
            </span>
            <span>{value.toFixed(1)}</span>
            {votes != null && <span className="text-stone-500 dark:text-neutral-400">({votes})</span>}
            {!!myRating && <span className="text-amber-500">· ваша: {myRating}★</span>}
        </div>
    );
}
