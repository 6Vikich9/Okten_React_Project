import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IMovieDetails } from "../../models/IMovie";
import { getMovie } from "../../services/movieService";

type MovieDetailsSliceType =
    {
        movie: IMovieDetails | null;
        isLoading: boolean;
        error: string | null;
    };

const initMovieDetailsSliceState: MovieDetailsSliceType = { movie: null, isLoading: false, error: null };

const loadMovie = createAsyncThunk("loadMovie", async (id: string, thunkAPI) =>
{
    const movie = await getMovie(id, thunkAPI.signal);
    return thunkAPI.fulfillWithValue(movie);
});

export const movieDetailsSlice = createSlice(
    {
        name: "movieDetailsSlice",
        initialState: initMovieDetailsSliceState,
        reducers: {},
        extraReducers: builder => builder
            .addCase(loadMovie.pending, (state) =>
            {
                state.movie = null;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loadMovie.fulfilled, (state, action: PayloadAction<IMovieDetails>) =>
            {
                state.isLoading = false;
                state.movie = action.payload;
            })
            .addCase(loadMovie.rejected, (state, action) =>
            {
                if (action.meta.aborted || action.error.name === "AbortError") return;
                state.isLoading = false;
                state.error = action.error.message ?? "Невідома помилка";
            }),
    });

export const movieDetailsActions = { ...movieDetailsSlice.actions, loadMovie };
