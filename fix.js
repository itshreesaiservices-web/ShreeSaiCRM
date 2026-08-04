const { PrismaClient } = require('./src/generated/prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function fixPasswords() {
  const usersToFix = await prisma.user.findMany({
    where: {
      role: 'CLIENT'
    }
  });

  for (const user of usersToFix) {
    if (!user.passwordHash.startsWith('$2b$')) {
      // It's the backwards password
      const realPassword = user.passwordHash.split("").reverse().join("");
      const hashed = await bcrypt.hash(realPassword, 10);
      
      await prisma.user.update({
        where: { id: user.id },
        data: { passwordHash: hashed }
      });
      console.log(`Fixed password for ${user.email}`);
    }
  }
}

fixPasswords().catch(console.error).finally(() => prisma.$disconnect());
