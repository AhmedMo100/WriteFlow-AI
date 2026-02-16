import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/utils/auth";

export async function POST(request: NextRequest) {
  const user = await requireAdmin();

  try {
    const body = await request.json();

    const {
      title,
      slug,
      content,
      published,
      featured,
      coverImage,
      tags,
      seoTitle,
      seoDescription,
      seoKeywords,
      isAIEnhanced,
    } = body;

    // ✅ Validation
    if (!title?.trim() || !slug?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: "Title, Slug and Content are required" },
        { status: 400 }
      );
    }

    // ✅ Check slug uniqueness manually (before Prisma throws)
    const existingPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        // Required
        title: title.trim(),
        slug: slug.trim(),
        content,

        // Booleans
        published: Boolean(published),
        featured: Boolean(featured),
        isAIEnhanced: Boolean(isAIEnhanced),

        // Optional
        coverImage: coverImage?.trim() || null,
        seoTitle: seoTitle?.trim() || null,
        seoDescription: seoDescription?.trim() || null,

        // Arrays (VERY IMPORTANT)
        tags: Array.isArray(tags) ? tags : [],
        seoKeywords: Array.isArray(seoKeywords) ? seoKeywords : [],

        // Relation
        authorId: user.id,
      },

      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        comments: true,
        likes: true,
        views: true,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("POST ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
