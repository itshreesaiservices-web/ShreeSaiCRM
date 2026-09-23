import { PrismaClient } from '../generated/prisma/client';

const prismaClientSingleton = () => {
  if (!process.env.DATABASE_URL) {
    console.error("🚨 CRITICAL ERROR 🚨: DATABASE_URL is missing! Your .env file is NOT inside the ShreeSaiCRM folder!");
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL || "postgresql://dummy:password@localhost/dummy",
      },
    },
  });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
