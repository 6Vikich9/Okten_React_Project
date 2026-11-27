import { Link } from "react-router";

export function NotFoundPage()
{
    return <p className="py-12 text-center text-stone-500 dark:text-neutral-400">404 — сторінку не знайдено. <Link to="/" className="underline">На головну</Link></p>;
}
