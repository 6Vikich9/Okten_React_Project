import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IMovie, IMoviesQuery, IPaged } from "../../models/IMovie";
import { getMovies } from "../../services/movieService";
import { MAX_PAGES } from "../../constants";

type MovieSliceType =
    {
        movies: IMovie[];
        totalPages: number;
        totalResults: number;
        isLoading: boolean;
        error: string | null;
    };

const initMovieSliceState: MovieSliceType = { movies: [], totalPages: 0, totalResults: 0, isLoading: false, error: null };

const loadMovies = createAsyncThunk("loadMovies", async (query: IMoviesQuery, thunkAPI) =>
{
    const data = await getMovies(query, thunkAPI.signal);
    return thunkAPI.fulfillWithValue(data);
});

export const movieSlice = createSlice(
    {
        name: "movieSlice",
        initialState: initMovieSliceState,
        reducers: {},
        extraReducers: builder => builder
            .addCase(loadMovies.pending, (state) =>
            {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loadMovies.fulfilled, (state, action: PayloadAction<IPaged<IMovie>>) =>
            {
                state.isLoading = false;
                state.movies = action.payload.results;
                state.totalPages = Math.min(action.payload.total_pages, MAX_PAGES);
                state.totalResults = action.payload.total_results;
            })
            .addCase(loadMovies.rejected, (state, action) =>
            {
                if (action.meta.aborted || action.error.name === "AbortError") return;
                state.isLoading = false;
                state.error = action.error.message ?? "Невідома помилка";
            }),
    });

export const movieActions = { ...movieSlice.actions, loadMovies };
