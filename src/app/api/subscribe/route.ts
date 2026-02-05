import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const subscribeSchema = z.object({
    email: z.string().email(),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email } = subscribeSchema.parse(body);

        const existing = await prisma.subscriber.findUnique({
            where: { email },
        });

        if (existing) {
            return NextResponse.json(
                { message: "You are already subscribed!" },
                { status: 200 }
            );
        }

        await prisma.subscriber.create({
            data: { email },
        });

        return NextResponse.json(
            { message: "Successfully subscribed!" },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid email address" },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}
