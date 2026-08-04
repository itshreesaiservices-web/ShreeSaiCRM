const { PrismaClient } = require('./src/generated/prisma/client');
const prisma = new PrismaClient();

async function cleanup() {
  await prisma.user.deleteMany({
    where: {
      email: 'name@example.com'
    }
  });
  console.log("Deleted name@example.com");
}

cleanup().catch(console.error).finally(() => prisma.$disconnect());
