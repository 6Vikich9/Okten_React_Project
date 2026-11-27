const baseUrl = "https://api.themoviedb.org/3";
const imageBaseUrl = "https://image.tmdb.org/t/p";
const token = import.meta.env.VITE_TMDB_TOKEN;

type Params = Record<string, string | number | boolean | undefined>;

export const getAll = async <T>(endpoint: string, params: Params = {}, signal?: AbortSignal): Promise<T> =>
{
    const url = new URL(baseUrl + endpoint);
    Object.entries({ language: "uk-UA", ...params }).forEach(([key, value]) =>
    {
        if (value !== "" && value != null) url.searchParams.set(key, String(value));
    });

    const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}`, accept: "application/json" },
        signal,
    });
    if (!response.ok)
    {
        const body = (await response.json().catch(() => ({}))) as { status_message?: string };
        throw new Error(`TMDB ${response.status}: ${body.status_message || response.statusText}`);
    }
    return response.json() as Promise<T>;
};

export const imageUrl = (path: string | null | undefined, size = "w500") =>
    path ? `${imageBaseUrl}/${size}${path}` : null;
