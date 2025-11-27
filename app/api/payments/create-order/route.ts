export const runtime = "nodejs";

import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getServerSession } from "next-auth"; // OR your auth method
import { authOptions } from "@/lib/auth";

// 1. Define prices SECURELY on the server
const PRICES = {
  BEGINNER: 4999,
  INTERMEDIATE: 9999,
  ADVANCED: 14999
};

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    // 2. Auth Check: Ensure user is logged in
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { stage } = await req.json();

    // 3. Validation: Verify stage exists and get price from SERVER constants
    if (!stage || !PRICES[stage as keyof typeof PRICES]) {
      return NextResponse.json({ error: 'Invalid course stage' }, { status: 400 });
    }

    const amount = PRICES[stage as keyof typeof PRICES];

    const options = {
      amount: amount, // Uses server-side price
      currency: "USD",
      receipt: `receipt_${session.user.email}_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}