const { PrismaClient } = require('./src/generated/prisma/client');
const prisma = new PrismaClient();

async function check() {
  const users = await prisma.user.findMany();
  console.log("Users:", users.map(u => ({ email: u.email, role: u.role, hash: u.passwordHash })));
}

check().catch(console.error).finally(() => prisma.$disconnect());
