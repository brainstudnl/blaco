import { PrismaClient } from '@prisma/client';
import { seedGames } from './games';

async function main() {
  const prisma = new PrismaClient();

  try {
    console.log('🧼 Cleaning up...');

    await prisma.$transaction([
      prisma.season.deleteMany(),
      prisma.game.deleteMany(),
    ]);

    console.log('🌱 Seeding games...');
    await Promise.all(Object.values(seedGames(prisma)));

    console.log('✅ Seeding complete!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(() => process.exit(1));
