"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getLeads() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    return leads;
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return [];
  }
}

export async function updateLeadStatus(id: string, status: string) {
  try {
    const lead = await prisma.lead.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/leads");
    return lead;
  } catch (error) {
    console.error("Failed to update lead status:", error);
    throw new Error("Failed to update lead status");
  }
}
