import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const feedbackSchema = z.object({
    type: z.enum(["BUG", "FEATURE", "FEEDBACK"]),
    content: z.string().min(10).max(1000),
});

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const body = await req.json();
        const { type, content } = feedbackSchema.parse(body);

        await prisma.feedback.create({
            data: {
                type,
                content,
                userId: session?.user?.id || null, // Allow anonymous feedback if not logged in
            },
        });

        return NextResponse.json(
            { message: "Thank you for your feedback!" },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Feedback must be between 10 and 1000 characters" },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}
