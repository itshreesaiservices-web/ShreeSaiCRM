import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const secretKey = process.env.JWT_SECRET || "default_secret_key_change_in_production_123456";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(key);
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getSession(req?: NextRequest) {
  const token = req 
    ? req.cookies.get("session")?.value 
    : (await cookies()).get("session")?.value;
    
  if (!token) return null;
  
  return await decrypt(token);
}

export async function createSession(userId: string, role: string) {
  const expires = new Date(Date.now() + 8 * 60 * 60 * 1000); // 8 hours
  const session = await encrypt({ userId, role, expires });

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function clearSession() {
  (await cookies()).delete("session");
}
