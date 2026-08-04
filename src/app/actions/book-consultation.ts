"use server";

import { prisma } from "@/lib/prisma";

export async function submitConsultation(data: {
  name: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  message?: string;
}) {
  try {
    const serviceMap: Record<string, string> = {
      mutual_funds: "Mutual Funds",
      income_tax: "Income Tax",
      financial_planning: "Financial Planning",
      insurance: "Insurance",
      other: "General Inquiry"
    };
    const serviceName = serviceMap[data.service] || data.service;
    
    const noteContent = `Preferred Date: ${data.date}\nMessage: ${data.message || 'No additional message.'}`;
    
    await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        source: `Web: ${serviceName}`,
        status: "NEW",
        priority: "HIGH",
        notes: {
          create: {
            content: noteContent
          }
        }
      }
    });
    
    return { success: true };
  } catch (error) {
    console.error("Error submitting consultation:", error);
    return { success: false, error: "Failed to submit request." };
  }
}
