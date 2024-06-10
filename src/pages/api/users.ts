// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getUsers } from "@blaco/database/UserRepository";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      const users = await getUsers();
      res.status(200).json(users);
    default:
      console.log(req);
      res.status(405).json({
        message: `Method ${req.method} on endpoint /users not found.`,
      });
  }
}
