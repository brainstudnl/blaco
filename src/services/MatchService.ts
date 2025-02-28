import { insertMatch } from '@blaco/database/MatchRepository';
import { getUser, updateUser } from '@blaco/database/UserRepository';
import { Match, User } from '@prisma/client';

export async function createMatch(
  challenger_id: number,
  defender_id: number,
  score_challenger: number,
  score_defender: number,
  played_at: Date,
): Promise<Match> {
  const challenger = await getUser(challenger_id);
  const defender = await getUser(defender_id);

  if (!isValidMatch(challenger, defender)) {
    throw new Error('Match is invalid.');
  }

  const match = await insertMatch(
    challenger_id,
    defender_id,
    score_challenger,
    score_defender,
    played_at,
  );

  if (score_challenger === 10) {
    await handleChallengerWin(challenger_id, defender_id);
  }

  return match;
}

async function handleChallengerWin(challenger_id: number, defender_id: number) {
  const challenger = await getUser(challenger_id);
  const defender = await getUser(defender_id);

  updateUser(challenger.id, { level: defender.level });
  updateUser(defender.id, { level: challenger.level });
}

function isValidMatch(challenger: User, defender: User): boolean {
  return challenger.level - defender.level === 1;
}
