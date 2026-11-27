import type { ReactNode } from "react";
import { Header } from "../components/header/Header";

export function MainLayout({ children }: { children: ReactNode })
{
    return (
        <div className="min-h-screen bg-amber-50 dark:bg-black font-sans text-stone-800 dark:text-neutral-100 transition-colors">
            <Header />
            {children}
        </div>
    );
}