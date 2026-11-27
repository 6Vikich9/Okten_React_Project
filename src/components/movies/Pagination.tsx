interface IProps
{
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
}

const btn = "min-w-9 cursor-pointer rounded-lg border border-stone-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-2.5 py-1.5 disabled:cursor-default disabled:opacity-40";

export function Pagination({ page, totalPages, onChange }: IProps)
{
    if (totalPages <= 1) return null;
    const start = Math.max(1, Math.min(page - 2, totalPages - 4));
    const end = Math.min(totalPages, start + 4);
    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    return (
        <nav className="mt-8 flex flex-wrap items-center justify-center gap-1.5" aria-label="Сторінки">
            <button className={btn} disabled={page <= 1} onClick={() => onChange(page - 1)}>←</button>
            {start > 1 && <><button className={btn} onClick={() => onChange(1)}>1</button><span>…</span></>}
            {pages.map((p) => (
                <button
                    key={p}
                    aria-current={p === page ? "page" : undefined}
                    className={`${btn} ${p === page ? "!border-stone-200 !bg-stone-200 text-black" : ""}`}
                    onClick={() => onChange(p)}
                >
                    {p}
                </button>
            ))}
            {end < totalPages && <><span>…</span><button className={btn} onClick={() => onChange(totalPages)}>{totalPages}</button></>}
            <button className={btn} disabled={page >= totalPages} onClick={() => onChange(page + 1)}>→</button>
        </nav>
    );
}
