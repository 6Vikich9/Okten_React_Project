import { useTheme } from "../../hooks/useTheme";

export function ThemeToggleButton()
{
    const { mode, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            aria-label="Змінити тему"
            className="cursor-pointer rounded-lg bg-stone-200 px-3 py-2 text-sm font-semibold text-black"
        >
            {mode === "light" ? "Dark" : "Light"}
        </button>
    );
}
