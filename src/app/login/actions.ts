"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = loginSchema.safeParse({ email, password });

  if (!result.success) {
    return {
      error: "Invalid input provided.",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.isActive) {
      return { error: "Invalid credentials or account disabled." };
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return { error: "Invalid credentials." };
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Create session (HttpOnly cookie)
    await createSession(user.id, user.role);

    // Write to Audit Log
    await prisma.auditLog.create({
      data: {
        action: "LOGIN_SUCCESS",
        resource: "User",
        resourceId: user.id,
        userId: user.id,
      }
    });

  } catch (err) {
    console.error("Login Error:", err);
    return { error: "An unexpected error occurred." };
  }
  
  // Need to know where to redirect based on role, but we can't do it inside try-catch easily due to how NEXT JS throws redirects.
  const user = await prisma.user.findUnique({ where: { email }});
  if (user?.role === "CLIENT") {
    redirect("/portal/dashboard");
  } else {
    redirect("/dashboard");
  }
}
