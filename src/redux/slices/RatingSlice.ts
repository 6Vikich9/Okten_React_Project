import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { MAX_STARS } from "../../utils/rating";

const STORAGE_KEY = "movie-ratings";

type RatingSliceType =
    {
        ratings: Record<number, number>;
    };

export function loadRatings(): Record<number, number>
{
    try
    {
        const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
        const result: Record<number, number> = {};
        if (parsed && typeof parsed === "object")
        {
            Object.entries(parsed).forEach(([id, value]) =>
            {
                if (Number.isInteger(value) && (value as number) >= 1 && (value as number) <= MAX_STARS) result[Number(id)] = value as number;
            });
        }
        return result;
    }
    catch
    {
        return {};
    }
}

export function saveRatings(ratings: Record<number, number>)
{
    try
    {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
    }
    catch
    {
    }
}

const initRatingSliceState: RatingSliceType = { ratings: loadRatings() };

export const ratingSlice = createSlice(
    {
        name: "ratingSlice",
        initialState: initRatingSliceState,
        reducers:
            {
                setRating: (state, action: PayloadAction<{ id: number; value: number | null }>) =>
                {
                    const { id, value } = action.payload;
                    if (value == null) delete state.ratings[id];
                    else state.ratings[id] = Math.min(MAX_STARS, Math.max(1, Math.round(value)));
                },
                clearRatings: (state) =>
                {
                    state.ratings = {};
                },
            },
    });

export const ratingActions = { ...ratingSlice.actions };
