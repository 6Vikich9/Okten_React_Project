import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { movieSlice } from "./slices/MovieSlice";
import { genreSlice } from "./slices/GenreSlice";
import { movieDetailsSlice } from "./slices/MovieDetailsSlice";
import { ratingSlice, saveRatings } from "./slices/RatingSlice";

export const store = configureStore(
    {
        reducer:
            {
                movieStoreSlice: movieSlice.reducer,
                genreStoreSlice: genreSlice.reducer,
                movieDetailsStoreSlice: movieDetailsSlice.reducer,
                ratingStoreSlice: ratingSlice.reducer,
            }
    });

let savedRatings = store.getState().ratingStoreSlice.ratings;
store.subscribe(() =>
{
    const current = store.getState().ratingStoreSlice.ratings;
    if (current === savedRatings) return;
    savedRatings = current;
    saveRatings(current);
});

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();
