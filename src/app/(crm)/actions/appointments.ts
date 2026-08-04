"use server";

import { prisma } from "@/lib/prisma";

export async function getAppointments(date: Date) {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await prisma.appointment.findMany({
      where: {
        startTime: {
          gte: startOfDay,
          lte: endOfDay,
        }
      },
      include: {
        client: true,
      },
      orderBy: { startTime: "asc" }
    });
    return appointments;
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    return [];
  }
}
