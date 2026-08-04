"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTasks() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { dueDate: "asc" },
      include: {
        assignedTo: {
          select: { name: true }
        }
      }
    });
    return tasks;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return [];
  }
}

export async function toggleTaskStatus(id: string, currentStatus: string) {
  try {
    const newStatus = currentStatus === "COMPLETED" ? "PENDING" : "COMPLETED";
    const task = await prisma.task.update({
      where: { id },
      data: { status: newStatus },
    });
    revalidatePath("/tasks");
    return task;
  } catch (error) {
    console.error("Failed to toggle task status:", error);
    throw new Error("Failed to toggle task status");
  }
}
