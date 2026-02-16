import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import SeoForm from "@/app/sections/blogs/SeoForm";

export default async function SeoPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      tags: true,
      seoKeywords: true,
      seoTitle: true,
      seoDescription: true,
    },
  });

  if (!post) {
    notFound();
  }

  // حول الـ null لـ undefined
  const formattedPost = {
    ...post,
    seoTitle: post.seoTitle ?? undefined,
    seoDescription: post.seoDescription ?? undefined,
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">SEO Optimization</h1>
      <SeoForm post={formattedPost} />
    </div>
  );
}
