import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/utils/auth";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    await requireAdmin();

    const post = await prisma.post.findUnique({
        where: { id: params.id },
    });

    if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const user = await requireAdmin();

    try {
        const body = await request.json();

        const existingPost = await prisma.post.findUnique({
            where: { id: params.id },
        });

        if (!existingPost) {
            return NextResponse.json(
                { error: "Post not found" },
                { status: 404 }
            );
        }

        // منع slug يتكرر مع بوست تاني
        if (body.slug && body.slug !== existingPost.slug) {
            const slugExists = await prisma.post.findUnique({
                where: { slug: body.slug },
            });

            if (slugExists) {
                return NextResponse.json(
                    { error: "Slug already exists" },
                    { status: 400 }
                );
            }
        }

        const updatedPost = await prisma.post.update({
            where: { id: params.id },
            data: {
                title: body.title?.trim(),
                slug: body.slug?.trim(),
                content: body.content,
                coverImage: body.coverImage || null,
                seoTitle: body.seoTitle || null,
                seoDescription: body.seoDescription || null,
                tags: Array.isArray(body.tags) ? body.tags : [],
                seoKeywords: Array.isArray(body.seoKeywords)
                    ? body.seoKeywords
                    : [],
                published: Boolean(body.published),
                featured: Boolean(body.featured),
                isAIEnhanced: Boolean(body.isAIEnhanced),
            },
        });

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.error("UPDATE ERROR:", error);

        return NextResponse.json(
            { error: "Failed to update post" },
            { status: 500 }
        );
    }
}
