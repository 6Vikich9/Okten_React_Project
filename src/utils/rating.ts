export const MAX_STARS = 5;

export function mergeRating(average: number, votes: number, myStars?: number)
{
    if (!myStars) return { average, votes };
    const total = votes + 1;
    return { average: (average * votes + myStars * 2) / total, votes: total };
}
