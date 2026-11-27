import { Link } from "react-router";

export function Logo()
{
    return <Link to="/" className="rounded-lg px-2 py-1 text-xl font-bold whitespace-nowrap transition-colors hover:bg-black hover:text-white dark:hover:bg-stone-300 dark:hover:text-black">Movies</Link>;
}