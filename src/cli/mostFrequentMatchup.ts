import { Match } from '@prisma/client';

export type MostFrequentMatchup = {
  matchup: [number, number] | null;
  count: number;
};

export function calculateMostFrequentMatchup(
  matches: Array<Match>,
): MostFrequentMatchup {
  const matchupCounts = new Map<string, number>();

  matches.forEach(({ challenger_id, defender_id }) => {
    const key = [challenger_id, defender_id].sort((a, b) => a - b).join('-');
    const count = (matchupCounts.get(key) || 0) + 1;
    matchupCounts.set(key, count);
  });

  let mostFrequentMatchup: [number, number] | null = null;
  let highestCount = 0;

  matchupCounts.forEach((count, key) => {
    if (count > highestCount) {
      highestCount = count;
      const [user1, user2] = key.split('-').map(Number) as [number, number];
      mostFrequentMatchup = [user1, user2];
    }
  });

  return { matchup: mostFrequentMatchup, count: highestCount };
}
