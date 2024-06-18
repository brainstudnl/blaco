import prisma from '@blaco/database/db';

export async function getMatches() {
  return await prisma.match.findMany({
    select: {
      id: true,
      score_defender: true,
      score_challenger: true,
      defender: true,
      challenger: true,
      played_at: true,
    },
  });
}

export async function insertMatch(
  challenger_id: number,
  defender_id: number,
  score_challenger: number,
  score_defender: number,
  played_at: Date,
) {
  return await prisma.match.create({
    data: {
      challenger_id,
      defender_id,
      score_challenger,
      score_defender,
      played_at,
    },
  });
}
