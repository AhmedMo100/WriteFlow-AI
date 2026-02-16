import { prisma } from "@/lib/prisma";
import LatestPostsClient from "./latestPosts.client";

export default async function LatestPosts() {
    const latestPosts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        take: 3,
    });

    return <LatestPostsClient posts={latestPosts} />;
}
