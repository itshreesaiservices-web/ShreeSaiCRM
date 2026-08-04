'use server';

import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';
import * as jose from 'jose';
import Razorpay from 'razorpay';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key'
);

async function getAuthenticatedUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return payload.id as string;
  } catch (err) {
    return null;
  }
}

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function createPaymentOrder(amount: number, taxReturnId?: string) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return { success: false, error: 'Unauthorized' };
    }

    const client = await prisma.clientProfile.findUnique({
      where: { userId }
    });

    if (!client) {
      return { success: false, error: 'Client profile not found' };
    }

    // Razorpay amount is in paise (1 INR = 100 paise)
    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: `receipt_${Date.now()}_${client.id.slice(-5)}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return { success: false, error: 'Failed to create order' };
    }

    // Save the payment record in the database
    const payment = await prisma.payment.create({
      data: {
        amount,
        currency: "INR",
        status: "CREATED",
        razorpayOrderId: order.id,
        clientId: client.id,
        ...(taxReturnId && { taxReturnId })
      }
    });

    return { 
      success: true, 
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      paymentId: payment.id,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID // Send public key to client
    };
  } catch (error: any) {
    console.error('Payment creation error:', error);
    return { success: false, error: error?.message || 'Payment initiation failed' };
  }
}
