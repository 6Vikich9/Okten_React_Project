import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IGenre } from "../../models/IMovie";
import { getGenres } from "../../services/movieService";

type GenreSliceType =
    {
        genres: IGenre[];
    };

const initGenreSliceState: GenreSliceType = { genres: [] };

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
        extraReducers: builder => builder.addCase(loadGenres.fulfilled, (state, action: PayloadAction<IGenre[]>) =>
        {
            state.genres = action.payload;
        }),
    });

export const genreActions = { ...genreSlice.actions, loadGenres };
