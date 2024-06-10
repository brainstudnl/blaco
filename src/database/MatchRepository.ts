import prisma from "@blaco/database/db";
import { Match } from "@prisma/client";

export async function getMatches() {
  return await prisma.match.findMany({
    // relationLoadStrategy: "join",
    select: {
      id: true,
      score_defender: true,
      score_challenger: true,
      defender: true,
      challenger: true,
    },
  });
}

export async function createMatch(
  challenger_id: number,
  defender_id: number,
  score_challenger: number,
  score_defender: number,
) {
  return await prisma.match.create({
    data: {
      challenger_id,
      defender_id,
      score_challenger,
      score_defender,
    },
  });
}
