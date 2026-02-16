import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // ===================== Stats =====================
        const totalPosts = await prisma.post.count();
        const draftPosts = await prisma.post.count({ where: { published: false } });
        const publishedPosts = await prisma.post.count({ where: { published: true } });
        const totalUsers = await prisma.user.count();
        const totalMessages = await prisma.contactMessage.count();

        // ===================== Recent Posts =====================
        const recentPosts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
            take: 5,
            select: { id: true, title: true, published: true, createdAt: true },
        });

        // ===================== Recent Messages =====================
        const recentMessages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: "desc" },
            take: 5,
            include: {
                author: {
                    select: { name: true, email: true },
                },
            },
        });

        // ===================== Format Messages =====================
        const formattedMessages = recentMessages.map((msg) => ({
            id: msg.id,
            name: msg.author.name,
            email: msg.author.email,
            message: msg.message,
            subject: msg.subject,
            phoneNumber: msg.phoneNumber,
            read: msg.read,
            createdAt: msg.createdAt,
        }));

        // ===================== Response =====================
        return NextResponse.json({
            stats: { totalPosts, draftPosts, publishedPosts, totalUsers, totalMessages },
            recentPosts: recentPosts.map((p) => ({
                id: p.id,
                title: p.title,
                status: p.published ? "Published" : "Draft",
                createdAt: p.createdAt,
            })),
            recentMessages: formattedMessages,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch dashboard overview" },
            { status: 500 }
        );
    }
}
