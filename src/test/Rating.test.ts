import { beforeEach, expect, test } from "vitest";
import { ratingActions, ratingSlice, loadRatings, saveRatings } from "../redux/slices/RatingSlice";
import { mergeRating } from "../utils/rating";

beforeEach(() => localStorage.clear());

test("mergeRating: без оцінки нічого не змінює, з оцінкою рахує зважене середнє", () =>
{
    expect(mergeRating(7, 100)).toEqual({ average: 7, votes: 100 });
    const merged = mergeRating(7, 100, 5);
    expect(merged.votes).toBe(101);
    expect(merged.average).toBeCloseTo((7 * 100 + 10) / 101);
    expect(mergeRating(0, 0, 3)).toEqual({ average: 6, votes: 1 });
});

test("setRating додає, замінює й прибирає оцінку", () =>
{
    let state = ratingSlice.reducer(undefined, ratingActions.setRating({ id: 1, value: 4 }));
    expect(state.ratings[1]).toBe(4);
    state = ratingSlice.reducer(state, ratingActions.setRating({ id: 1, value: 2 }));
    expect(state.ratings[1]).toBe(2);
    state = ratingSlice.reducer(state, ratingActions.setRating({ id: 1, value: null }));
    expect(state.ratings[1]).toBeUndefined();
});

test("setRating тримає оцінку в межах 1..5", () =>
{
    let state = ratingSlice.reducer(undefined, ratingActions.setRating({ id: 1, value: 99 }));
    expect(state.ratings[1]).toBe(5);
    state = ratingSlice.reducer(state, ratingActions.setRating({ id: 2, value: -3 }));
    expect(state.ratings[2]).toBe(1);
});

test("оцінки зберігаються в localStorage, а сміття в ньому ігнорується", () =>
{
    saveRatings({ 10: 3, 20: 5 });
    expect(loadRatings()).toEqual({ 10: 3, 20: 5 });
    localStorage.setItem("movie-ratings", JSON.stringify({ 1: 3, 2: 99, 3: "abc", 4: 2.5 }));
    expect(loadRatings()).toEqual({ 1: 3 });
    localStorage.setItem("movie-ratings", "{не json");
    expect(loadRatings()).toEqual({});
});
