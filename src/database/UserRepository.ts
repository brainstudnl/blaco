import prisma from "@blaco/database/db";
import { User } from "@prisma/client";

export async function getUsers(): Promise<User[]> {
  return await prisma.user.findMany();
}

export async function getUser(id: number): Promise<User> {
  return await prisma.user.findUniqueOrThrow({ where: { id: id } });
}

export async function updateUserLevel(
  id: number,
  level: number,
): Promise<User> {
  return await prisma.user.update({
    where: { id: id },
    data: { level: level },
  });
}
