/**
 * Calculate the user with the best and worst goal difference.
 */
export function calculateBestAndWorstGoalDifference(
  goalsScored: Map<number, number>,
  goalsConceded: Map<number, number>,
) {
  let bestUserId: number | null = null;
  let worstUserId: number | null = null;
  let bestGoalDifference = 0;
  let worstGoalDifference = 0;

  goalsScored.forEach((scored, userId) => {
    const conceded = goalsConceded.get(userId) || 0;
    const goalDifference = scored - conceded;

    // If the goal difference is better than the current best, update the best.
    if (goalDifference > bestGoalDifference) {
      bestGoalDifference = goalDifference;
      bestUserId = userId;
    }

    // If the goal difference is worse than the current worst, update the worst.
    if (goalDifference < worstGoalDifference) {
      worstGoalDifference = goalDifference;
      worstUserId = userId;
    }
  });

  return {
    bestUserId,
    worstUserId,
    bestGoalDifference,
    worstGoalDifference,
  };
}
