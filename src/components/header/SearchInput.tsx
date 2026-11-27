import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useDebounce } from "../../hooks/useDebounce";

export function SearchInput()
{
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const q = params.get("q") || "";
    const [text, setText] = useState(q);
    const [prevQ, setPrevQ] = useState(q);
    const debounced = useDebounce(text.trim());
    const lastDebounced = useRef(debounced);

    if (q !== prevQ)
    {
        setPrevQ(q);
        setText(q);
    }

    useEffect(() =>
    {
        if (lastDebounced.current === debounced) return;
        lastDebounced.current = debounced;
        if (debounced === q) return;
        navigate(debounced ? `/?q=${encodeURIComponent(debounced)}` : "/", { replace: pathname === "/" });
    }, [debounced, q, navigate, pathname]);

    return (
        <input
            type="search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Пошук фільму за назвою…"
            aria-label="Пошук фільмів"
            className="mx-auto w-full max-w-lg flex-1 rounded-full border border-stone-300 dark:border-neutral-700 bg-stone-200 dark:bg-neutral-800 px-4 py-2 outline-none focus:border-stone-400"
        />
    );
}
