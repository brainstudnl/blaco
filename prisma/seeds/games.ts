import { Game } from '@prisma/client';
import { PrismaClient } from '@prisma/client/extension';

export function seedGames(prisma: PrismaClient): Record<string, Promise<Game>> {
  return {
    foosball: prisma.game.create({
      data: {
        name: 'Foosball',
        min_team_size: 1,
        max_team_size: 2,
        seasons: {
          create: {
            name: `Foosball Season 1`,
            start_date: new Date().toISOString(),
            end_date: new Date(
              new Date().setMonth(new Date().getMonth() + 3),
            ).toISOString(),
            active: true,
          },
        },
      },
    }),
    fifa: prisma.game.create({
      data: {
        name: 'FIFA',
        min_team_size: 1,
        max_team_size: 2,
        seasons: {
          create: {
            name: `FIFA Season 1`,
            start_date: new Date().toISOString(),
            active: true,
          },
        },
      },
    }),
  };
}
