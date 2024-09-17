import { Match } from '@prisma/client';
import { getHumanReadableDate } from './getHumanReadableDate';

export function calculateMatchesPerMatchDay(
  matches: Array<Match>,
): Map<string, number> {
  const matchDays = new Map<string, number>();

  matches.forEach((match) => {
    const matchDay = match.played_at.toString().split(' ')[0];
    const count = matchDays.get(getHumanReadableDate(matchDay)) || 0;
    matchDays.set(getHumanReadableDate(matchDay), count + 1);
  });

  return matchDays;
}
