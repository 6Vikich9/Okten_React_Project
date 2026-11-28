import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IGenre } from "../../models/IMovie";
import { getGenres } from "../../services/movieService";

type GenreSliceType =
    {
        genres: IGenre[];
        isLoading: boolean;
        error: string | null;
    };

const initGenreSliceState: GenreSliceType = { genres: [], isLoading: false, error: null };

const loadGenres = createAsyncThunk("loadGenres", async (_, thunkAPI) =>
{
    const genres = await getGenres(thunkAPI.signal);
    return thunkAPI.fulfillWithValue(genres);
});

export const genreSlice = createSlice(
    {
        name: "genreSlice",
        initialState: initGenreSliceState,
        reducers: {},
        extraReducers: builder => builder
            .addCase(loadGenres.pending, (state) =>
            {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loadGenres.fulfilled, (state, action: PayloadAction<IGenre[]>) =>
            {
                state.isLoading = false;
                state.genres = action.payload;
            })
            .addCase(loadGenres.rejected, (state, action) =>
            {
                if (action.meta.aborted || action.error.name === "AbortError") return;
                state.isLoading = false;
                state.error = action.error.message ?? "Невідома помилка";
            }),
    });

export const genreActions = { ...genreSlice.actions, loadGenres };