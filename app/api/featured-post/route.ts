import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const featuredPosts = await prisma.post.findMany({
            where: {
                featured: true,
            },
        });

        if (featuredPosts.length === 0) {
            return NextResponse.json(null);
        }

        const randomPost =
            featuredPosts[Math.floor(Math.random() * featuredPosts.length)];

        return NextResponse.json(randomPost);
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
