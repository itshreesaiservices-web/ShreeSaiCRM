import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  // (seed logic omitted for brevity, keeping only admin user)
  const passwordHash = await bcrypt.hash('password123', 10);
  
  await prisma.user.upsert({
    where: { email: 'admin@shreesaiservices.com' },
    update: { name: 'Sharad Hume' },
    create: {
      email: 'admin@shreesaiservices.com',
      name: 'Sharad Hume',
      passwordHash,
      role: 'ADMIN',
      isActive: true,
    },
  });

  const dummyLeads = [
    { name: "Ramesh Kumar", email: "ramesh@example.com", phone: "+91 9876543210", value: "₹5,00,000", priority: "HIGH", status: "NEW" },
    { name: "Sunita Sharma", email: "sunita@example.com", phone: "+91 8765432109", value: "₹2,50,000", priority: "MEDIUM", status: "CONTACTED" },
    { name: "Vikram Singh", email: "vikram@example.com", phone: "+91 7654321098", value: "₹10,00,000", priority: "URGENT", status: "PROPOSAL_SENT" },
    { name: "Priya Desai", email: "priya@example.com", phone: "+91 6543210987", value: "₹1,00,000", priority: "LOW", status: "NEW" },
  ];

  for (const lead of dummyLeads) {
    const existing = await prisma.lead.findFirst({ where: { email: lead.email } });
    if (!existing) {
      await prisma.lead.create({ data: lead });
    }
  }

  const dummyTasks = [
    { title: "Call Ramesh for portfolio rebalancing", priority: "HIGH", status: "PENDING", assignedToId: (await prisma.user.findFirst({where: {email: 'admin@shreesaiservices.com'}}))!.id },
    { title: "Prepare tax filing documents for Q2", priority: "URGENT", status: "PENDING", assignedToId: (await prisma.user.findFirst({where: {email: 'admin@shreesaiservices.com'}}))!.id },
    { title: "Send weekly market update newsletter", priority: "LOW", status: "COMPLETED", assignedToId: (await prisma.user.findFirst({where: {email: 'admin@shreesaiservices.com'}}))!.id },
  ];

  for (const task of dummyTasks) {
    const existing = await prisma.task.findFirst({ where: { title: task.title } });
    if (!existing) {
      await prisma.task.create({ data: task });
    }
  }

  const dummyClient = await prisma.clientProfile.upsert({
    where: { email: 'client@example.com' },
    update: {},
    create: {
      firstName: 'Rahul',
      lastName: 'Sharma',
      email: 'client@example.com',
      phone: '+91 9876543210',
      pan: 'ABCDE1234F',
    }
  });

  const dummyTaxReturns = [
    { assessmentYear: "2026-27", itrType: "ITR-2", status: "UPLOADS", clientId: dummyClient.id, refundStatus: "₹12,500" },
    { assessmentYear: "2026-27", itrType: "ITR-3", status: "VERIFICATION", clientId: dummyClient.id, refundStatus: "₹0" },
    { assessmentYear: "2026-27", itrType: "ITR-1", status: "FILING", clientId: dummyClient.id, refundStatus: "₹4,200" },
  ];

  for (const ret of dummyTaxReturns) {
    const existing = await prisma.taxReturn.findFirst({ where: { clientId: ret.clientId, itrType: ret.itrType } });
    if (!existing) {
      await prisma.taxReturn.create({ data: ret });
    }
  }

  console.log('Database seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
