interface IProps
{
    name: string;
    active?: boolean;
    onClick?: () => void;
}

export function GenreBadge({ name, active = false, onClick }: IProps)
{
    return (
        <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onClick?.(); }}
            className={`cursor-pointer rounded-full border px-3 py-1 text-xs transition-colors hover:border-black hover:bg-black hover:text-white dark:hover:border-amber-50 dark:hover:bg-amber-50 dark:hover:text-black ${
                active
                    ? "border-black bg-black text-white dark:border-amber-50 dark:bg-amber-50 dark:text-black"
                    : "border-stone-300 dark:border-neutral-700"
            }`}
        >
            {name}
        </button>
    );
}
