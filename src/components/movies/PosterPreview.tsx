import { imageUrl } from "../../services/api.service";

interface IProps
{
    path: string | null;
    alt: string;
    size?: string;
}

export function PosterPreview({ path, alt, size = "w500" }: IProps)
{
    const src = imageUrl(path, size);
    return src ? (
        <img className="aspect-[2/3] w-full bg-stone-200 dark:bg-neutral-800 object-cover" src={src} alt={alt} loading="lazy" />
    ) : (
        <div className="grid aspect-[2/3] w-full place-items-center bg-stone-200 dark:bg-neutral-800 text-sm text-stone-500 dark:text-neutral-400">Немає постера</div>
    );
}
