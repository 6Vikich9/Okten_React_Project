import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { afterEach, expect, test, vi } from "vitest";
import { MoviesPage } from "../pages/MoviesPage";
import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "../redux/slices/MovieSlice";
import { genreSlice } from "../redux/slices/GenreSlice";
import { movieDetailsSlice } from "../redux/slices/MovieDetailsSlice";
import { ratingSlice } from "../redux/slices/RatingSlice";

const makeStore = () => configureStore(
    {
        reducer: { movieStoreSlice: movieSlice.reducer, genreStoreSlice: genreSlice.reducer, movieDetailsStoreSlice: movieDetailsSlice.reducer, ratingStoreSlice: ratingSlice.reducer },
    });

const renderPage = (url = "/") => render(
    <Provider store={makeStore()}><MemoryRouter initialEntries={[url]}><MoviesPage /></MemoryRouter></Provider>
);

afterEach(() => vi.unstubAllGlobals());

test("завантажує фільми й жанри через redux і показує їх", async () =>
{
    vi.stubGlobal("fetch", vi.fn(async (url: URL) => (
        {
            ok: true,
            json: async () => url.pathname.includes("genre")
                ? { genres: [{ id: 28, name: "Бойовик" }] }
                : { page: 1, total_pages: 3, total_results: 60, results: [
                        { id: 1, title: "Тестовий фільм", overview: "Опис", poster_path: null, release_date: "2020-05-01", vote_average: 8, vote_count: 10, genre_ids: [28] },
                    ]
                },
        })));
    renderPage();
    expect(screen.getByText("Завантаження…")).toBeTruthy();
    expect(await screen.findByText("Тестовий фільм")).toBeTruthy();
    expect(screen.getAllByText("Бойовик").length).toBeGreaterThan(0);
    expect(screen.getByText("Знайдено: 60")).toBeTruthy();
});

test("показує помилку API з кнопкою повтору", async () =>
{
    vi.stubGlobal("fetch", vi.fn(async () => (
        {
            ok: false, status: 401, statusText: "Unauthorized",
            json: async () => ({ status_message: "Invalid API key" }),
        })));
    renderPage();
    await waitFor(() => expect(screen.getByText(/TMDB 401: Invalid API key/)).toBeTruthy());
    expect(screen.getAllByText("Спробувати ще").length).toBeGreaterThan(0);
});

test("некоректні параметри в URL виправляються до допустимих значень", async () =>
{
    const fetchMock = vi.fn(async () => (
        {
            ok: true,
            json: async () => ({ genres: [], page: 1, total_pages: 1, total_results: 0, results: [] }),
        }));
    vi.stubGlobal("fetch", fetchMock);
    renderPage("/?page=9999&sort=abc&genre=xyz");
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    const urls = (fetchMock.mock.calls as unknown as [URL][]).map(([u]) => u).filter((u) => u.pathname.includes("discover"));
    expect(urls.length).toBeGreaterThan(0);
    expect(urls[0].searchParams.get("page")).toBe("500");
    expect(urls[0].searchParams.get("sort_by")).toBe("popularity.desc");
    expect(urls[0].searchParams.has("with_genres")).toBe(false);
});

test("клік по зірці на картці додає оцінку до рейтингу, повторний клік її знімає", async () =>
{
    vi.stubGlobal("fetch", vi.fn(async (url: URL) => (
        {
            ok: true,
            json: async () => url.pathname.includes("genre")
                ? { genres: [] }
                : { page: 1, total_pages: 1, total_results: 1, results: [
                        { id: 7, title: "Оцінюваний фільм", overview: "Опис", poster_path: null, release_date: "2021-01-01", vote_average: 8, vote_count: 100, genre_ids: [] },
                    ]
                },
        })));
    renderPage();
    await screen.findByText("Оцінюваний фільм");
    expect(screen.getByText("(100)")).toBeTruthy();

    fireEvent.click(screen.getByLabelText("Оцінити на 5 з 5"));
    expect(screen.getByText("(101)")).toBeTruthy();
    expect(screen.getByText("8.0")).toBeTruthy();
    expect(screen.getByText("· ваша: 5★")).toBeTruthy();

    fireEvent.click(screen.getByLabelText("Оцінити на 5 з 5"));
    expect(screen.getByText("(100)")).toBeTruthy();
    expect(screen.queryByText("· ваша: 5★")).toBeNull();
});

test("помилка завантаження жанрів показується в бічній панелі з кнопкою повтору", async () =>
{
    vi.stubGlobal("fetch", vi.fn(async (url: URL) => (
        url.pathname.includes("genre")
            ? { ok: false, status: 500, statusText: "Server Error", json: async () => ({ status_message: "boom" }) }
            : { ok: true, json: async () => ({ page: 1, total_pages: 1, total_results: 0, results: [] }) }
    )));
    renderPage();
    expect(await screen.findByText(/Не вдалося завантажити жанри/)).toBeTruthy();
});
