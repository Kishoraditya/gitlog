import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        // Fetch actual payments from Razorpay
        // We'll use the environment variables for keys
        const RAZORPAY_KEY = process.env.RAZORPAY_KEY_ID;
        const RAZORPAY_SECRET = process.env.RAZORPAY_KEY_SECRET;

        if (!RAZORPAY_KEY || !RAZORPAY_SECRET) {
            // Fallback to a base amount if keys aren't set yet
            return NextResponse.json({
                total: 0,
                goal: 150,
                currency: "USD"
            });
        }

        // Fetch payments from Razorpay API
        // Pagination might be needed for thousands of tips, but for $150 goal we are safe
        const auth = Buffer.from(`${RAZORPAY_KEY}:${RAZORPAY_SECRET}`).toString('base64');
        const res = await fetch("https://api.razorpay.com/v1/payments?count=100", {
            headers: {
                Authorization: `Basic ${auth}`
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch Razorpay data");
        }

        const data = await res.json();

        // Sum up captured payments
        // Razorpay amounts are in paise/cents
        const totalPaise = data.items
            .filter((p: any) => p.status === "captured")
            .reduce((sum: number, p: any) => sum + p.amount, 0);

        const totalAmount = totalPaise / 100;

        return NextResponse.json({
            total: totalAmount,
            goal: 150,
            currency: data.items[0]?.currency || "USD"
        });
    } catch (error) {
        console.error("Razorpay error:", error);
        return NextResponse.json({
            total: 0,
            goal: 150,
            currency: "USD"
        }, { status: 200 }); // Return fallback instead of 500 to keep UI stable
    }
}
