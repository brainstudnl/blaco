import { Match, User } from '@prisma/client';
import Table from 'cli-table3';
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

  const statistics = new Table({ head: ['Description', 'User'] });

  statistics.push(['Number of matches played', matches.length]);

  const { matchDays, matchesPlayed, matchesLost, largestMatchResult } =
    calculateMatchStats(matches);

  statistics.push([`Number of match days`, matchDays.size]);

  const { worstUserId, worstGoalDifference, bestUserId, bestGoalDifference } =
    calculateBestAndWorstGoalDifference(goalsScored, goalsConceded);

  statistics.push([
    `Worst goal difference`,
    `${getUserName(worstUserId, userLookup)} with goal difference ${worstGoalDifference}`,
  ]);

  const [mostMatchesPlayedId, mostMatchesPlayedCount] =
    getEntryWithMostStatistics(matchesPlayed);
  const [mostMatchesLostId, mostMatchesLostCount] =
    getEntryWithMostStatistics(matchesLost);

  statistics.push([
    `User with most matches played`,
    `${userLookup.get(mostMatchesPlayedId)} with ${mostMatchesPlayedCount} matches`,
  ]);

  statistics.push([
    `User with most matches lost`,
    `${userLookup.get(mostMatchesLostId)} with ${mostMatchesLostCount} losses`,
  ]);

  statistics.push([`Number of active players`, matchesPlayed.size]);

  const mostFrequentMatchup = calculateMostFrequentMatchup(matches);
  if (mostFrequentMatchup.matchup) {
    const [user1, user2] = mostFrequentMatchup.matchup;
    statistics.push([
      `Archrivals`,
      `${userLookup.get(user1)} vs ${userLookup.get(user2)} with ${mostFrequentMatchup.count} matches`,
    ]);
  }

  const king = getUserName(
    users.find((user) => user.level === 1)?.id || null,
    userLookup,
  );

  statistics.push([`King of BLACO`, king]);

  statistics.push([
    `Best goal difference`,
    `${getUserName(bestUserId, userLookup)} with goal difference ${bestGoalDifference}`,
  ]);

  const { mostGoalsAgainst, mostGoalsAgainstUser } =
    calculateMostGoalsAgainst(goalsConceded);

  statistics.push([
    `User with most goals conceded`,
    `${getUserName(mostGoalsAgainstUser, userLookup)} with ${mostGoalsAgainst} goals against`,
  ]);

  console.log(statistics.toString());

  if (largestMatchResult) {
    const matchesTable = new Table({
      head: ['Date', 'Largest result difference'],
    });

    largestMatchResult.forEach((match) => {
      matchesTable.push([
        `${getHumanReadableDate(match.date)}`,
        `${userLookup.get(match.challenger)} ${match.challengerGoals} - ${match.defenderGoals} ${userLookup.get(match.defender)}`,
      ]);
    });

    console.log(matchesTable.toString());
  }

  // Display the number of matches played per match day
  const matchesPerMatchDayTable = new Table({
    head: ['Date', 'Number of matches'],
  });

  calculateMatchesPerMatchDay(matches).forEach((count, date) => {
    matchesPerMatchDayTable.push([getHumanReadableDate(date), count]);
  });

  console.log(matchesPerMatchDayTable.toString());
}
