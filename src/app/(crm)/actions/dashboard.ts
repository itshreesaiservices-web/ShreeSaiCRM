"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const activeClients = await prisma.clientProfile.count({
    where: { isDeleted: false }
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todaysMeetings = await prisma.appointment.count({
    where: {
      startTime: {
        gte: today,
        lt: tomorrow
      }
    }
  });

  const pendingTasksCount = await prisma.task.count({
    where: {
      status: "PENDING"
    }
  });

  // Lead Conversion Stats
  const leads = await prisma.lead.groupBy({
    by: ['status'],
    _count: {
      status: true
    }
  });

  const leadData = [
    { name: "Converted", value: leads.find(l => l.status === "CONVERTED")?._count.status || 0 },
    { name: "Lost", value: leads.find(l => l.status === "LOST")?._count.status || 0 },
    { name: "In Progress", value: leads.filter(l => !["CONVERTED", "LOST"].includes(l.status)).reduce((acc, curr) => acc + curr._count.status, 0) },
  ];

  // Appointments today for list
  const upcomingMeetings = await prisma.appointment.findMany({
    where: {
      startTime: {
        gte: new Date(),
        lt: tomorrow
      }
    },
    include: {
      client: true
    },
    orderBy: {
      startTime: "asc"
    },
    take: 3
  });

  // Revenue Data (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);
  
  const transactions = await prisma.transaction.findMany({
    where: { purchaseDate: { gte: sixMonthsAgo } }
  });

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const revenueMap = new Map();
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    revenueMap.set(d.getMonth(), { name: monthNames[d.getMonth()], total: 0 });
  }

  transactions.forEach(t => {
    const month = t.purchaseDate.getMonth();
    if (revenueMap.has(month)) {
      revenueMap.get(month).total += t.investedAmount;
    }
  });

  const revenueData = Array.from(revenueMap.values());
  const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.total, 0);

  // Recent Follow-ups (Activities)
  const recentActivities = await prisma.clientActivity.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { client: true }
  });
  
  const recentFollowups = recentActivities.map(a => ({
    name: `${a.client.firstName} ${a.client.lastName}`,
    action: a.description,
    time: a.createdAt.toISOString()
  }));

  return {
    activeClients,
    todaysMeetings,
    pendingTasksCount,
    leadData,
    upcomingMeetings,
    revenueData,
    totalRevenue,
    recentFollowups
  };
}
