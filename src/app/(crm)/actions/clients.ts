"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function getClients() {
  try {
    const clients = await prisma.clientProfile.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: "desc" },
      include: {
        portfolios: {
          select: {
            id: true,
            transactions: {
              select: { units: true, nav: true }
            }
          }
        },
        user: {
          select: { isActive: true }
        }
      }
    });
    
    // Process clients to add a computed portfolio value and format for UI
    return clients.map(client => {
      let totalPortfolioValue = 0;
      if (client.portfolios && client.portfolios.length > 0) {
        client.portfolios.forEach(p => {
           p.transactions.forEach(t => {
             totalPortfolioValue += (t.units * t.nav);
           });
        });
      }
      
      return {
        ...client,
        computedPortfolioValue: totalPortfolioValue,
        status: client.user?.isActive ? "ACTIVE" : "INACTIVE"
      };
    });
  } catch (error) {
    console.error("Failed to fetch clients:", error);
    return [];
  }
}

export async function addClient(data: any) {
  try {
    // Check if email already exists
    const existing = await prisma.clientProfile.findUnique({
      where: { email: data.email }
    });
    
    if (existing) {
      return { success: false, error: "A client with this email already exists." };
    }

    // Hash a default password for the user
    const passwordHash = await bcrypt.hash("Welcome@123", 10);
    
    // Create the User and link to the new ClientProfile
    const client = await prisma.user.create({
      data: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        passwordHash,
        role: "CLIENT",
        phone: data.phone,
        clientProfile: {
          create: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            pan: data.pan || null,
            aadhaar: data.aadhaar || null,
            riskProfile: data.riskProfile || "MODERATE",
          }
        }
      }
    });

    revalidatePath("/clients");
    return { success: true, clientId: client.id };
  } catch (error: any) {
    console.error("Failed to add client:", error);
    return { success: false, error: error.message || "Failed to add client" };
  }
}

export async function updateClient(id: string, data: any) {
  try {
    const client = await prisma.clientProfile.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        pan: data.pan || null,
        aadhaar: data.aadhaar || null,
        riskProfile: data.riskProfile,
      }
    });
    
    // Also update the User name if possible
    if (client.userId) {
      await prisma.user.update({
        where: { id: client.userId },
        data: { name: `${data.firstName} ${data.lastName}`, phone: data.phone }
      });
    }

    revalidatePath("/clients");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update client:", error);
    return { success: false, error: error.message || "Failed to update client" };
  }
}

export async function deactivateClient(id: string) {
  try {
    const client = await prisma.clientProfile.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() }
    });
    
    if (client.userId) {
      await prisma.user.update({
        where: { id: client.userId },
        data: { isActive: false }
      });
    }

    revalidatePath("/clients");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to deactivate client:", error);
    return { success: false, error: error.message || "Failed to deactivate client" };
  }
}
