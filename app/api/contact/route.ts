// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/utils/auth";

export async function GET() {
    try {
        const messages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                author: {
                    select: { id: true, name: true, email: true, image: true }
                },
            },
        });
        return NextResponse.json(messages);
    } catch (error) {
        console.error("Failed to fetch contact messages:", error);
        return NextResponse.json(
            { error: "Failed to fetch messages" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const user = await requireAuth(); // لازم يكون مسجل دخول

        const body = await req.json();
        const { message, subject, phoneNumber } = body; // ضيفنا phoneNumber

        // Validation
        if (!message?.trim()) {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        const newMessage = await prisma.contactMessage.create({
            data: {
                message: message.trim(),
                subject: subject?.trim() || null,
                phoneNumber: phoneNumber?.trim() || null,
                authorId: user.id,
            },
            include: {
                author: { select: { id: true, name: true, email: true } },
            },
        });

        return NextResponse.json(newMessage, { status: 201 });
    } catch (error: any) {
        console.error("Failed to create contact message:", error);

        if (error.message === "Authentication required") {
            return NextResponse.json(
                { error: "You must be logged in to send a message." },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { error: "Failed to send message" },
            { status: 500 }
        );
    }
}
