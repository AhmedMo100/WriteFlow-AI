import { prisma } from "@/lib/prisma";
import LatestPostsClient from "./latestPosts.client";

export default async function LatestPosts() {
  const latestPosts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  // تحويل null إلى undefined
  const safePosts = latestPosts.map((post) => ({
    ...post,
    coverImage: post.coverImage ?? undefined,
    seoTitle: post.seoTitle ?? undefined,
    seoDescription: post.seoDescription ?? undefined,
  }));

  return <LatestPostsClient posts={safePosts} />;
}
