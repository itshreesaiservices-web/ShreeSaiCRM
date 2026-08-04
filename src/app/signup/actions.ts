"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

import { createSession } from "@/lib/auth";

import bcrypt from "bcryptjs";

export async function signupClient(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return { error: "All fields are required" };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User with this email already exists" };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Create User and ClientProfile atomically
    const user = await prisma.user.create({
      data: {
        email,
        name: `${firstName} ${lastName}`,
        passwordHash,
        role: "CLIENT",
        clientProfile: {
          create: {
            firstName,
            lastName,
            email,
          },
        },
      },
    });

    // Set secure JWT session
    await createSession(user.id, user.role);

    return { success: true };
  } catch (error) {
    console.error("Signup error:", error);
    return { error: "An unexpected error occurred during signup." };
  }
}
