import { Match, User } from '@prisma/client';
import { calculateBestAndWorstGoalDifference } from './bestWorstGoalDifference';
import { getHumanReadableDate } from './getHumanReadableDate';
import { calculateMatchStats } from './matchStats';
import { calculateMatchesPerMatchDay } from './matchesPerMatchDay';
import { calculateMostFrequentMatchup } from './mostFrequentMatchup';
import { calculateMostGoalsAgainst } from './mostGoalsAgainst';

/**
 * Get the user name from the user ID.
 */
function getUserName(
  userId: number | null,
  userLookup: Map<number, string>,
): string {
  return userId !== null ? userLookup.get(userId) || 'Unknown' : 'Unknown';
}

/**
 * Get the user ID with the most statistics from a map of user IDs and statistics.
 */
function getEntryWithMostStatistics(
  entries: Map<number, number>,
): [number, number] {
  return [...entries.entries()].reduce((a, b) => (b[1] > a[1] ? b : a), [0, 0]);
}

type LogResultsArgs = {
  matches: Array<Match>;
  users: Array<User>;
  goalsScored: Map<number, number>;
  goalsConceded: Map<number, number>;
};

export function logResults({
  matches,
  users,
  goalsConceded,
  goalsScored,
}: LogResultsArgs) {
  const userLookup = new Map<number, string>();
  users.forEach((user) => userLookup.set(user.id, user.name));

  console.log(`Number of matches played: ${matches.length}`);

  const {
    matchDays,
    matchesPlayed,
    matchesLost,
    largestMatchResult,
    largestResult,
  } = calculateMatchStats(matches);
  console.log(`Number of match days: ${matchDays.size}`);

  const { worstUserId, worstGoalDifference, bestUserId, bestGoalDifference } =
    calculateBestAndWorstGoalDifference(goalsScored, goalsConceded);
  console.log(
    `Worst goal difference: ${getUserName(worstUserId, userLookup)} with goal difference ${worstGoalDifference}`,
  );

  const [mostMatchesPlayedId, mostMatchesPlayedCount] =
    getEntryWithMostStatistics(matchesPlayed);
  const [mostMatchesLostId, mostMatchesLostCount] =
    getEntryWithMostStatistics(matchesLost);

  console.log(
    `User with most matches played: ${userLookup.get(mostMatchesPlayedId)} with ${mostMatchesPlayedCount} matches`,
  );
  console.log(
    `User with most matches lost: ${userLookup.get(mostMatchesLostId)} with ${mostMatchesLostCount} losses`,
  );

  console.log(`Number of active players: ${matchesPlayed.size}`);

  const mostFrequentMatchup = calculateMostFrequentMatchup(matches);
  if (mostFrequentMatchup.matchup) {
    const [user1, user2] = mostFrequentMatchup.matchup;
    console.log(
      `Archrivals: ${userLookup.get(user1)} vs ${userLookup.get(user2)} with ${mostFrequentMatchup.count} matches`,
    );
  } else {
    console.log(`No frequent matchups found.`);
  }

  // const largestMatchResult = calculateMostGoalsAgainst(goalsConceded);

  if (largestMatchResult) {
    console.log(
      `Largest result difference: ${largestResult} goals on the following match days:`,
    );

    largestMatchResult.forEach((match) => {
      console.log(
        `\t${getHumanReadableDate(match.date)}: ${userLookup.get(match.challenger)} ${match.challengerGoals} - ${match.defenderGoals} ${userLookup.get(match.defender)}`,
      );
    });
  }

  const king = getUserName(
    users.find((user) => user.level === 1)?.id || null,
    userLookup,
  );

  console.log(`King of BLACO: ${king}`);

  console.log(
    `Best goal difference: ${getUserName(bestUserId, userLookup)} with goal difference ${bestGoalDifference}`,
  );

  const { mostGoalsAgainst, mostGoalsAgainstUser } =
    calculateMostGoalsAgainst(goalsConceded);

  console.log(
    `User with most goals conceded: ${getUserName(mostGoalsAgainstUser, userLookup)} with ${mostGoalsAgainst} goals against`,
  );

  console.log(`Matches per match day:`);
  calculateMatchesPerMatchDay(matches).forEach((count, date) => {
    console.log(`\t${date}: ${count}`);
  });
}
