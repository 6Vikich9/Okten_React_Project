# Movies 

Каталог фільмів на React + TypeScript з даними TMDB API.

**Стек:** React 19, TypeScript, Vite, Tailwind CSS v4, React Router v8 (`createBrowserRouter`), Redux Toolkit, Context API, Vitest + Testing Library, oxlint.

## Запуск

```bash
git clone <URL-репозиторію>
cd <назва-папки>
npm install
npm run dev
```

Інші команди:

- `npm run build` — перевірка типів і збірка;
- `npm run preview` — перегляд зібраної версії;
- `npm run lint` — перевірка коду лінтером;
- `npm test` — запуск тестів.

## API-ключ

Для роботи потрібен токен TMDB:

1. Отримайте токен (**API Read Access Token**) на сторінці https://www.themoviedb.org/settings/api.
2. Створіть у корені проєкту файл `.env`. Скопіюйте .env.example у .env.
3. Запустіть проєкт командою `npm run dev`. Якщо він уже був запущений, перезапустіть його, бо Vite читає `.env` лише під час старту.

## Сторінки та URL

| URL | Що там |
|---|---|
| `/` | Головна (MoviesPage): список фільмів, жанри (бокова панель), сортування, пагінація |
| `/?page=3` | Номер сторінки (допустимо 1–500, некоректні значення виправляються) |
| `/?genre=28` | Фільми обраного жанру (id жанру з TMDB) |
| `/?sort=vote_average.desc` | Сортування: популярні, рейтинг, новіші, старіші, назва |
| `/?q=batman` | Пошук за назвою (рядок пошуку в Header, працює з будь-якої сторінки) |
| `/movie/:id` | Сторінка фільму (MoviePage) з розширеним описом, відкривається кліком на картку |
| `*` | 404 |

Параметри комбінуються (`/?genre=35&sort=vote_average.desc&page=2`); стан зберігається в URL, тож працюють «назад/вперед» і посилання можна надсилати. Кнопка в Header перемикає світлу/темну тему.

> **Нюанс пошуку:** `/search/movie` у TMDB не підтримує сортування й фільтр за жанром, тому під час пошуку сортування приховане, а клік на жанр скидає пошук.

## Структура

```
src/
  services/api.service.ts   getAll<T>: fetch-обгортка (токен, мова uk-UA, перевірка response.ok), imageUrl
  services/movieService.ts  getMovies / getGenres / getMovie
  models/IMovie.ts          інтерфейси IMovie, IMovieDetails, IGenre, IPaged
  redux/store.ts            configureStore + типізовані useAppDispatch / useAppSelector
  redux/slices/             MovieSlice, GenreSlice, MovieDetailsSlice (thunk + pending/fulfilled/rejected)
  hooks/                    useDebounce, useTheme, useMovieRating
  context/                  ThemeContext + ThemeProvider
  layouts/MainLayout.tsx    Header + контент
  routes/routes.tsx         createBrowserRouter
  pages/                    MoviesPage, MoviePage, NotFoundPage
  components/
    header/                 Header, Logo, SearchInput, ThemeToggleButton, UserInfo
    sidebar/                Sidebar (жанри)
    movies/                 MoviesList, MoviesListCard, PosterPreview, StarsRating,
                            MovieInfo, GenreBadge, Pagination
  test/                     тести (компоненти + інтеграційний тест MoviesPage з Redux)
```

## Що використано

- Функціональні компоненти, хуки (`useState`, `useEffect`, `useMemo`, `useCallback`) і власні хуки для даних
- Context API (тема) + кастомний хук `useTheme`
- React Router: `createBrowserRouter`, layout, параметри шляху, query-параметри, `useNavigate`, 404
- Redux Toolkit: `createSlice`, `createAsyncThunk`, `extraReducers` для pending/fulfilled/rejected, типізовані хуки; скасування застарілих запитів (`request.abort()`), жанри вантажаться один раз
- Окремий шар сервісів (`api.service`, `movieService`)
- TypeScript: інтерфейси моделей і пропсів, узагальнений `IPaged<T>`
- Tailwind CSS: адаптивна верстка, темна тема
- Стани loading / error (з кнопкою повтору) / empty, дебаунс пошуку, тести
