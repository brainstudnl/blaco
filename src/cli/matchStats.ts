import { Match } from '@prisma/client';

type MatchStats = {
  matchesPlayed: Map<number, number>;
  matchesLost: Map<number, number>;
  matchDays: Set<string>;
  largestMatchResult: Array<LargestMatchResult> | null;
};

export type LargestMatchResult = {
  challenger: number;
  defender: number;
  date: string;
  challengerGoals: number;
  defenderGoals: number;
};

/**
 * Calculate match statistics from a list of matches.
 */
export function calculateMatchStats(matches: Array<Match>): MatchStats {
  const matchesPlayed: Map<number, number> = new Map();
  const matchesLost: Map<number, number> = new Map();
  const matchDays: Set<string> = new Set();

  let largestResult = 0;
  let largestMatchResult: Array<LargestMatchResult> | null = null;

  matches.forEach((match) => {
    // Add the match day to the set
    const matchDay = match.played_at.toString().split('T')[0];
    matchDays.add(matchDay);

    // Increment the number of matches played for each challenger and defender
    const challengerMatches = matchesPlayed.get(match.challenger_id) || 0;
    matchesPlayed.set(match.challenger_id, challengerMatches + 1);

    const defenderMatches = matchesPlayed.get(match.defender_id) || 0;
    matchesPlayed.set(match.defender_id, defenderMatches + 1);

    // Increment the number of matches lost for the defender and challenger
    if (match.score_challenger > match.score_defender) {
      const defenderLosses = matchesLost.get(match.defender_id) || 0;
      matchesLost.set(match.defender_id, defenderLosses + 1);
    } else if (match.score_defender > match.score_challenger) {
      const challengerLosses = matchesLost.get(match.challenger_id) || 0;
      matchesLost.set(match.challenger_id, challengerLosses + 1);
    }

    // Update the largest result difference and store the match details
    const resultDifference = Math.abs(
      match.score_challenger - match.score_defender,
    );

    // If the score is the same, add the match to the list of largest results
    // If the score is larger, update the largest result and store the match details
    if (resultDifference === largestResult) {
      if (largestMatchResult) {
        largestMatchResult.push({
          challenger: match.challenger_id,
          defender: match.defender_id,
          date: match.played_at.toString(),
          challengerGoals: match.score_challenger,
          defenderGoals: match.score_defender,
        });
      }
    } else if (resultDifference > largestResult) {
      largestResult = resultDifference;
      largestMatchResult = [
        {
          challenger: match.challenger_id,
          defender: match.defender_id,
          date: match.played_at.toString(),
          challengerGoals: match.score_challenger,
          defenderGoals: match.score_defender,
        },
      ];
    }
  });

  return {
    matchesPlayed,
    matchesLost,
    matchDays,
    largestMatchResult,
  };
}
