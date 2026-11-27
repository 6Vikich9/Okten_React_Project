import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ratingActions } from "../../redux/slices/RatingSlice";

const USER = { name: "Ім'я Прізвище", email: "imya.prizvushche@example.com" };

export function UserInfo()
{
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const ratedCount = useAppSelector((state) => Object.keys(state.ratingStoreSlice.ratings).length);

    useEffect(() =>
    {
        if (!open) return;
        const onClick = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        document.addEventListener("mousedown", onClick);
        document.addEventListener("keydown", onKey);
        return () =>
        {
            document.removeEventListener("mousedown", onClick);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={open}
                className="flex cursor-pointer items-center gap-2 rounded-full py-1 pr-3 pl-1 hover:bg-stone-300 dark:hover:bg-neutral-800"
            >
                <span className="grid size-8 place-items-center rounded-full bg-stone-200  text-sm font-bold text-black">
                    {USER.name[0]}
                </span>
                <span className="hidden text-sm font-medium sm:inline">{USER.name}</span>
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl border border-stone-300 bg-white p-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
                    <p className="font-semibold">{USER.name}</p>
                    <p className="mb-3 text-sm text-stone-500 dark:text-neutral-400">{USER.email}</p>
                    <p className="mb-3 text-sm">Оцінено фільмів: {ratedCount}</p>
                    <button
                        type="button"
                        disabled={!ratedCount}
                        onClick={() => dispatch(ratingActions.clearRatings())}
                        className="w-full cursor-pointer rounded-lg border border-stone-300 px-3 py-1.5 text-sm hover:bg-stone-200 disabled:cursor-default disabled:opacity-40 dark:border-neutral-700 dark:hover:bg-neutral-800"
                    >
                        Скинути мої оцінки
                    </button>
                </div>
            )}
        </div>
    );
}
