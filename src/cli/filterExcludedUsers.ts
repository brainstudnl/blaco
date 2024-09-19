import { Match } from '@prisma/client';

/**
 * Filter out matches where the challenger or defender is in the excluded list.
 */
export function filterExcludedUsers(
  matches: Array<Match>,
  excludedIds: Array<number>,
): Array<Match> {
  return matches.filter(
    (match) =>
      !excludedIds.includes(match.challenger_id) &&
      !excludedIds.includes(match.defender_id),
  );
}
