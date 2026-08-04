"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTaxReturns() {
  try {
    const returns = await prisma.taxReturn.findMany({
      include: {
        client: {
          select: { firstName: true, lastName: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    return returns;
  } catch (error) {
    console.error("Failed to fetch tax returns:", error);
    return [];
  }
}

export async function updateTaxReturnStatus(id: string, status: string) {
  try {
    const taxReturn = await prisma.taxReturn.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/tax");
    return taxReturn;
  } catch (error) {
    console.error("Failed to update tax return status:", error);
    throw new Error("Failed to update tax return status");
  }
}
