import { User } from '@prisma/client';

export function getDefenders(
  challengerId: number | null,
  users: User[],
): User[] {
  const challenger = users.find((user) => user.id === challengerId);
  if (!challenger) return [];

  const allowedDefenderLevel = challenger.level - 1;
  const defenders = users.filter((user) => user.level === allowedDefenderLevel);

  if (defenders.length === 0 && users.every((user) => user.level === 10)) {
    return users;
  }

  return defenders;
}
