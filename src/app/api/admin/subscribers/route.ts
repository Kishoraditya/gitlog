import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        // Security check
        if (session?.user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const subscribers = await prisma.subscriber.findMany({
            orderBy: { createdAt: "desc" },
            select: { id: true, email: true, createdAt: true }
        });

        return NextResponse.json({ subscribers });
    } catch (error) {
        console.error("Admin subscribers fetch error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
