import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { search, tags, sort, featured, published, isAIEnhanced, page, limit } =
      Object.fromEntries(new URL(req.url).searchParams.entries());

    const pageNum = Number(page) || 1;
    const pageSize = Number(limit) || 6; // 6 بوستات لكل صفحة

    const where: any = {};

    // Boolean filters
    if (featured === "true") where.featured = true;
    if (published === "true") where.published = true;
    if (isAIEnhanced === "true") where.isAIEnhanced = true;

    // Tags filter
    if (tags) {
      const tagsArray = (tags as string).split(",");
      where.tags = { hasSome: tagsArray };
    }

    // Search filter
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ];
    }

    // Sort mapping
    const orderBy: any = {};
    switch (sort) {
      case "Newest":
        orderBy.createdAt = "desc";
        break;
      case "Oldest":
        orderBy.createdAt = "asc";
        break;
      case "Most Liked":
        orderBy.likes = { _count: "desc" };
        break;
      case "Featured":
        orderBy.featured = "desc";
        break;
      default:
        orderBy.createdAt = "desc";
    }

    // Fetch total count for pagination
    const total = await prisma.post.count({ where });

    const posts = await prisma.post.findMany({
      where,
      include: {
        author: { select: { name: true, image: true } },
        _count: { select: { comments: true, likes: true } },
      },
      orderBy,
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    });

    return NextResponse.json({
      posts,
      totalPages: Math.ceil(total / pageSize),
      currentPage: pageNum,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
