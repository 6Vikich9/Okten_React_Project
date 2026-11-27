export const SORT_OPTIONS = [
    { value: "popularity.desc", label: "Популярні" },
    { value: "vote_average.desc", label: "Найвищий рейтинг" },
    { value: "primary_release_date.desc", label: "Новіші" },
    { value: "primary_release_date.asc", label: "Старіші" },
    { value: "title.asc", label: "Назва А–Я" },
];
export const DEFAULT_SORT = SORT_OPTIONS[0].value;
export const MAX_PAGES = 500;
