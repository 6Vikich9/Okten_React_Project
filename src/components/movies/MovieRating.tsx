import { StarsRating } from "./StarsRating";
import { useMovieRating } from "../../hooks/useMovieRating";
import { mergeRating } from "../../utils/rating";

interface IProps
{
    movieId: number;
    average: number;
    votes: number;
}

export function MovieRating({ movieId, average, votes }: IProps)
{
    const { myRating, rate } = useMovieRating(movieId);
    const merged = mergeRating(average, votes, myRating);
    return <StarsRating value={merged.average} votes={merged.votes} myRating={myRating} onRate={rate} />;
}
