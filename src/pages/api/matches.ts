import { NextApiRequest, NextApiResponse } from 'next';
import { getMatches } from '@blaco/database/MatchRepository';
import { createMatch } from '@blaco/services/MatchService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      const matches = await getMatches();
      return res.status(200).json(matches);
    case 'POST':
      const {
        challenger_id,
        defender_id,
        score_challenger,
        score_defender,
        played_at,
      } = JSON.parse(req.body);
      try {
        const match = await createMatch(
          challenger_id,
          defender_id,
          score_challenger,
          score_defender,
          new Date(played_at),
        );
        return res.status(201).json(match);
      } catch (error) {
        let message =
          error instanceof Error ? error.message : 'Unknown error occurred';
        return res.status(400).json({ message: message });
      }
    default:
      return res.status(405).json({
        message: `Method ${req.method} on endpoint /users not found.`,
      });
  }
}
