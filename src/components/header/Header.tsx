import { Logo } from "./Logo";
import { SearchInput } from "./SearchInput";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { UserInfo } from "./UserInfo";

export function Header()
{
    return (
        <header className="sticky top-0 z-10 flex flex-wrap items-center gap-4 border-b border-stone-300 dark:border-neutral-700 bg-amber-50 dark:bg-neutral-900 px-6 py-3">
            <Logo />
            <SearchInput />
            <ThemeToggleButton />
            <UserInfo />
        </header>
    );
}