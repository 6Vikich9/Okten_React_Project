import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { ratingActions } from "../redux/slices/RatingSlice";

export function useMovieRating(movieId: number)
{
    const dispatch = useAppDispatch();
    const myRating = useAppSelector((state) => state.ratingStoreSlice.ratings[movieId]);
    const rate = useCallback(
        (stars: number) => dispatch(ratingActions.setRating({ id: movieId, value: stars === myRating ? null : stars })),
        [dispatch, movieId, myRating]
    );
    return { myRating, rate };
}
