import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const totalUsers = await prisma.user.count();
        const totalPosts = await prisma.post.count();
        const totalMessages = await prisma.contactMessage.count();
        const totalViews = await prisma.view.count();
        const totalLikes = await prisma.like.count();

        // Trend آخر 7 أيام لكل إحصائية
        const today = new Date();
        const last7Days = Array.from({ length: 7 }).map((_, i) => {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            return d.toISOString().split("T")[0]; // YYYY-MM-DD
        }).reverse();

        const trend = await Promise.all(
            last7Days.map(async (day) => {
                const start = new Date(day + "T00:00:00.000Z");
                const end = new Date(day + "T23:59:59.999Z");
                const users = await prisma.user.count({ where: { createdAt: { gte: start, lte: end } } });
                const posts = await prisma.post.count({ where: { createdAt: { gte: start, lte: end } } });
                const messages = await prisma.contactMessage.count({ where: { createdAt: { gte: start, lte: end } } });
                return { day, users, posts, messages };
            })
        );

        return NextResponse.json({
            totalUsers,
            totalPosts,
            totalMessages,
            totalViews,
            totalLikes,
            trend,
        });
    } catch (err) {
        console.error("Analytics API error:", err);
        return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
    }
}
