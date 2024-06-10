import { createMatch, getMatches } from "@blaco/database/MatchRepository";
import { getUser, updateUserLevel } from "@blaco/database/UserRepository";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      const matches = await getMatches();
      res.status(200).json(matches);
      return;
    case "POST":
      const { challenger_id, defender_id, score_challenger, score_defender } =
        req.body;
      const match = await createMatch(
        challenger_id,
        defender_id,
        score_challenger,
        score_defender,
      );
      if (score_challenger === 10) {
        await handleChallengerWin(challenger_id, defender_id);
      }
      res.status(201).json(match);
      return;
    default:
      res.status(405).json({
        message: `Method ${req.method} on endpoint /users not found.`,
      });
      return;
  }
}

async function handleChallengerWin(challenger_id: number, defender_id: number) {
  const challenger = await getUser(challenger_id);
  const defender = await getUser(defender_id);

  updateUserLevel(challenger.id, defender.level);
  updateUserLevel(defender.id, challenger.level);
}
