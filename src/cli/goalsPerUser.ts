import { Match } from '@prisma/client';

/**
 * Helper function to update goals scored and conceded for a user.
 * Combines goals scored and conceded update into a single operation.
 */
function updateGoalsMap(
  userId: number,
  scored: number,
  conceded: number,
  goalsMap: Map<number, { scored: number; conceded: number }>,
) {
  const userStats = goalsMap.get(userId) || { scored: 0, conceded: 0 };
  userStats.scored += scored;
  userStats.conceded += conceded;
  goalsMap.set(userId, userStats);
}

/**
 * Calculate goals scored and conceded per user from a list of matches.
 */
export function calculateGoalsPerUser(matches: Array<Match>) {
  const goalsMap = new Map<number, { scored: number; conceded: number }>();

  matches.forEach(
    ({ challenger_id, defender_id, score_challenger, score_defender }) => {
      updateGoalsMap(challenger_id, score_challenger, score_defender, goalsMap);
      updateGoalsMap(defender_id, score_defender, score_challenger, goalsMap);
    },
  );

  const goalsScored = new Map<number, number>();
  const goalsConceded = new Map<number, number>();

  goalsMap.forEach((stats, userId) => {
    goalsScored.set(userId, stats.scored);
    goalsConceded.set(userId, stats.conceded);
  });

  return { goalsScored, goalsConceded };
}
